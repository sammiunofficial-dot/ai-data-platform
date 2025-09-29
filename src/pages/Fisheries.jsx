// PfzByStateWithMap.jsx
import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../pages/fisheries.module.css";

/* Chart.js imports */
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Title as ChartTitle,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
ChartJS.register(LinearScale, PointElement, ChartTooltip, ChartLegend, ChartTitle);

/* Fix default marker icons for common bundlers */
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !points || points.length === 0) return;
    try {
      const latlngs = points
        .map((p) => {
          const lat = Number(p.Latitude ?? p.lat ?? p.Lat);
          const lon = Number(p.Longitude ?? p.lon ?? p.Lon);
          if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
          return [lat, lon];
        })
        .filter(Boolean);
      if (latlngs.length === 0) return;
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [30, 30] });
    } catch (_) {
      // ignore
    }
  }, [map, points]);
  return null;
}
const apiBase = import.meta.env.VITE_API_BASE


export default function PfzByStateWithMap() {
  const [data, setData] = useState([]);
  const [stateQuery, setStateQuery] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchByState(stateName) {
    if (!stateName) {
      setError("Enter a state or station name");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const url = `${apiBase}/api/pfz?state=${encodeURIComponent(stateName)}`;
      const res = await fetch(url);

      const text = await res.text();
      const ct = (res.headers.get("content-type") || "").toLowerCase();

      if (!res.ok) {
        const snippet = text.length > 1200 ? text.slice(0, 1200) + "..." : text;
        throw new Error(`Request failed: ${res.status} ${res.statusText}\nResponse:\n${snippet}`);
      }

      let json;
      if (ct.includes("application/json")) {
        json = JSON.parse(text);
      } else {
        try {
          json = JSON.parse(text);
        } catch (e) {
          const snippet = text.length > 1200 ? text.slice(0, 1200) + "..." : text;
          throw new Error(`Expected JSON but server returned content-type="${ct}" and body:\n${snippet}`);
        }
      }

      setData(Array.isArray(json) ? json : []);
      if (!Array.isArray(json) || json.length === 0) {
        setError("No points found. Try a Station name (e.g. 'Dighi')");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch data");
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function downloadCsv(dataArray, outName = "pfz_clean.csv") {
    if (!dataArray || dataArray.length === 0) return;
    const keys = Object.keys(dataArray[0]);
    const rows = [keys.join(",")];
    for (const row of dataArray) {
      const vals = keys.map((k) => {
        const v = row[k] === null || row[k] === undefined ? "" : String(row[k]);
        return v.includes(",") || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
      });
      rows.push(vals.join(","));
    }
    const csv = rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outName;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toString().toLowerCase();
    return data.filter((r) => {
      const station = (r.Station || r.station || "").toString().toLowerCase();
      const depth = (r.Depth || r.depth || "").toString().toLowerCase();
      return station.includes(q) || depth.includes(q);
    });
  }, [data, query]);

  const states = ["maharashtra", "kerala", "karnataka", "gujrat", "goa"];

  // -------------------------
  // Robust parser for numeric values (latitude, longitude, depth)
  // Accepts formats like "12.34", "78 12.3", "78°12'30\"", "12.34N", "1,234.5"
  // -------------------------
  const parseNumber = (raw) => {
    if (raw === null || raw === undefined) return NaN;
    const s = String(raw).trim();
    if (s === "") return NaN;

    // remove common degree and symbols except digits, dot, comma, minus, plus, space
    // Extract numeric tokens (handles "78 12.3" or "78° 12'")
    const tokens = s.match(/[+-]?\d+(\.\d+)?/g);
    if (!tokens || tokens.length === 0) return NaN;

    // If two tokens, treat as degrees + minutes
    if (tokens.length >= 2) {
      const deg = Number(tokens[0].replace(/,/g, ""));
      const min = Number(tokens[1].replace(/,/g, ""));
      if (Number.isFinite(deg) && Number.isFinite(min)) {
        const sign = deg < 0 ? -1 : 1;
        return sign * (Math.abs(deg) + Math.abs(min) / 60);
      }
    }

    // otherwise parse first token (remove thousands separators)
    const cleaned = tokens[0].replace(/,/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : NaN;
  };

  // prepare lonDepth and latDepth arrays (useMemo)
  const lonDepth = useMemo(() => {
    const arr = filtered
      .map((p) => {
        const lon = parseNumber(p.Longitude ?? p.lon ?? p.Lon ?? p.LONGITUDE ?? p.long);
        const depth = parseNumber(p.Depth ?? p.depth);
        if (!Number.isFinite(lon) || !Number.isFinite(depth)) return null;
        return { x: lon, y: depth, station: p.Station ?? p.station ?? "-", raw: p };
      })
      .filter(Boolean);
    console.debug("lonDepth parsed:", arr.length, "of", filtered.length, arr.slice(0, 6));
    return arr;
  }, [filtered]);

  const latDepth = useMemo(() => {
    const arr = filtered
      .map((p) => {
        const lat = parseNumber(p.Latitude ?? p.lat ?? p.Lat);
        const depth = parseNumber(p.Depth ?? p.depth);
        if (!Number.isFinite(lat) || !Number.isFinite(depth)) return null;
        return { x: lat, y: depth, station: p.Station ?? p.station ?? "-", raw: p };
      })
      .filter(Boolean);
    console.debug("latDepth parsed:", arr.length, "of", filtered.length, arr.slice(0, 6));
    return arr;
  }, [filtered]);

  // Chart.js data & options
  const lonDepthData = {
    datasets: [
      {
        label: "Stations",
        data: lonDepth.map((d) => ({ x: d.x, y: d.y, station: d.station })),
        backgroundColor: "rgba(37,99,235,0.9)",
        pointRadius: 5,
      },
    ],
  };

  const lonDepthOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const r = context.raw || {};
            return `${r.station} — Lon: ${r.x}, Depth: ${r.y}`;
          },
        },
      },
    },
    scales: {
      x: { type: "linear", title: { display: true, text: "Longitude" } },
      y: { title: { display: true, text: "Depth (m)" } },
    },
  };

  const latDepthData = {
    datasets: [
      {
        label: "Stations",
        data: latDepth.map((d) => ({ x: d.x, y: d.y, station: d.station })),
        backgroundColor: "rgba(16,185,129,0.95)",
        pointRadius: 5,
      },
    ],
  };

  const latDepthOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const r = context.raw || {};
            return `${r.station} — Lat: ${r.x}, Depth: ${r.y}`;
          },
        },
      },
    },
    scales: {
      x: { type: "linear", title: { display: true, text: "Latitude" } },
      y: { title: { display: true, text: "Depth (m)" } },
    },
  };

  return (
    <div className={styles.root}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>Fisheries State — Map</h2>
        <p className={styles.subtitle}>Select a state to fetch Potential Fishing Zone (PFZ) data.</p>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.controls}>
        <div className={styles.selectWrapper}>
          <select className={styles.select} value={stateQuery} onChange={(e) => setStateQuery(e.target.value)} aria-label="Select state">
            <option value="">Select a state</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => fetchByState(stateQuery)} disabled={loading || !stateQuery}>
          {loading ? "Fetching..." : "Fetch"}
        </button>

        <div className={styles.rightPush}>
          <button className={`${styles.btn} ${data.length ? styles.btnPrimary : styles.btnDisabled}`} onClick={() => downloadCsv(data)} disabled={!data.length}>
            {data.length ? `Download cleaned CSV (${data.length})` : "No data"}
          </button>
        </div>
      </div>

      {data.length > 0 && (
        <div>
          <input className={styles.searchInput} type="search" placeholder="Filter by station or depth..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}

      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.mapCard}`}>
          <div className={styles.mapContainer}>
            <MapContainer center={[20.0, 78.0]} zoom={5} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filtered.length > 0 && <FitBounds points={filtered} />}
              {filtered.map((p, i) => {
                const lat = Number(p.Latitude ?? p.lat ?? p.Lat);
                const lon = Number(p.Longitude ?? p.lon ?? p.Lon);
                if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
                return (
                  <Marker key={i} position={[lat, lon]}>
                    <Popup>
                      <div style={{ minWidth: 160 }}>
                        <strong>{p.Station ?? p.station ?? "-"}</strong>
                        <div>Depth: {p.Depth ?? p.depth ?? "-"}</div>
                        <div>Lat: {Number.isFinite(lat) ? lat.toFixed(6) : "-"}</div>
                        <div>Lon: {Number.isFinite(lon) ? lon.toFixed(6) : "-"}</div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>

        <div className={`${styles.card} ${styles.listCard}`}>
          {/* Charts */}
          <div className={styles.chartArea}>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>
              Parsed points — Lon+Depth: {lonDepth.length} / {filtered.length} · Lat+Depth: {latDepth.length} / {filtered.length}
            </div>

            <div className={styles.chartsRow}>
              <div className={styles.chartCard} style={{ height: 240 }}>
                <div className={styles.chartTitle}>Depth vs Longitude</div>
                {lonDepth.length === 0 ? (
                  <div className={styles.chartEmpty}>No numeric Longitude+Depth data to plot</div>
                ) : (
                  <div style={{ width: "100%", height: "190px" }}>
                    <Scatter data={lonDepthData} options={lonDepthOptions} />
                  </div>
                )}
              </div>

              <div className={styles.chartCard} style={{ height: 240 }}>
                <div className={styles.chartTitle}>Depth vs Latitude</div>
                {latDepth.length === 0 ? (
                  <div className={styles.chartEmpty}>No numeric Latitude+Depth data to plot</div>
                ) : (
                  <div style={{ width: "100%", height: "190px" }}>
                    <Scatter data={latDepthData} options={latDepthOptions} />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.chartHint}>Tip: hover a point to see station + coordinates. Charts update when you fetch/filter data.</div>
          </div>

          {/* Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Station</th>
                  <th>Depth</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((p, i) => (
                    <tr key={i}>
                      <td>{p.Station ?? p.station ?? "-"}</td>
                      <td>{p.Depth ?? p.depth ?? "-"}</td>
                      <td>{Number.isFinite(Number(p.Latitude ?? p.lat ?? p.Lat)) ? Number(p.Latitude ?? p.lat ?? p.Lat).toFixed(6) : "-"}</td>
                      <td>{Number.isFinite(Number(p.Longitude ?? p.lon ?? p.Lon)) ? Number(p.Longitude ?? p.lon ?? p.Lon).toFixed(6) : "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      {data.length === 0 ? "No data loaded" : "No results for your filter"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
