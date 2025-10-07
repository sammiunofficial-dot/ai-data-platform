// PfzByStateWithMap.jsx
import React, { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../pages/fisheries.module.css";
import { staticPfzData } from "../components/data/pfzData.jsx"; // ✅ import data from separate file
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  Title as ChartTitle,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

// ChartJS register
ChartJS.register(LinearScale, PointElement, ChartTooltip, ChartLegend, ChartTitle);

// Fix leaflet marker icon
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Auto-fit bounds helper
function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !points || points.length === 0) return;
    const latlngs = points.map((p) => [p.Latitude, p.Longitude]);
    map.fitBounds(L.latLngBounds(latlngs), { padding: [30, 30] });
  }, [map, points]);
  return null;
}

export default function PfzByStateWithMap() {
  const [data, setData] = useState([]);
  const [stateQuery, setStateQuery] = useState("");
  const [query, setQuery] = useState("");

  const fetchByState = (stateName) => {
    const key = stateName.toLowerCase();
    if (staticPfzData[key]) {
      setData(staticPfzData[key]);
    } else {
      setData([]);
      alert("No data available for " + stateName);
    }
  };

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(
      (r) =>
        r.Station.toLowerCase().includes(q) ||
        (r.Depth && r.Depth.toString().includes(q))
    );
  }, [data, query]);

  const states = Object.keys(staticPfzData);

  const lonDepthData = {
    datasets: [
      {
        label: "Stations",
        data: filtered.map((p) => ({
          x: p.Longitude,
          y: parseFloat(p.Depth.split("-")[0]),
        })),
        backgroundColor: "rgba(37,99,235,0.9)",
        pointRadius: 5,
      },
    ],
  };

  const latDepthData = {
    datasets: [
      {
        label: "Stations",
        data: filtered.map((p) => ({
          x: p.Latitude,
          y: parseFloat(p.Depth.split("-")[0]),
        })),
        backgroundColor: "rgba(16,185,129,0.95)",
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Fisheries State — Map</h2>
      <p className={styles.subtitle}>Select a state to view Potential Fishing Zone (PFZ) data.</p>

      <div className={styles.controls}>
        <select
          className={styles.select}
          value={stateQuery}
          onChange={(e) => setStateQuery(e.target.value)}
        >
          <option value="">Select a state</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => fetchByState(stateQuery)}
          disabled={!stateQuery}
        >
          Load Data
        </button>
      </div>

      {/* 🗺️ Map with official India map layer */}
      <div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
        <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a> contributors'
        />

          {filtered.length > 0 && <FitBounds points={filtered} />}
          {filtered.map((p, i) => (
            <Marker key={i} position={[p.Latitude, p.Longitude]}>
              <Popup>
                <strong>{p.Station}</strong>
                <div>Depth: {p.Depth}</div>
                <div>Lat: {p.Latitude}</div>
                <div>Lon: {p.Longitude}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {data.length > 0 && (
        <>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Filter by station or depth..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles.listCard}`}>
              <div className={styles.chartsRow}>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>Depth vs Longitude</div>
                  <Scatter data={lonDepthData} />
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>Depth vs Latitude</div>
                  <Scatter data={latDepthData} />
                </div>
              </div>

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
                    {filtered.map((p, i) => (
                      <tr key={i}>
                        <td>{p.Station}</td>
                        <td>{p.Depth}</td>
                        <td>{p.Latitude}</td>
                        <td>{p.Longitude}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
