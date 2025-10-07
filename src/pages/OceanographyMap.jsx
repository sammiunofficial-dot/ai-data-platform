import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Rectangle,
  LayersControl,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer } = LayersControl;

// Map SST → color
const getColor = (sst) => {
  const min = 25; // adjust based on your data
  const max = 35;
  const ratio = (sst - min) / (max - min);
  const hue = (1 - ratio) * 240;
  return `hsl(${hue}, 100%, 50%)`;
};

const SSTMap = () => {
  const [data, setData] = useState([]);

  // Bounding box for map lock
  const latMin = -14;
  const latMax = 30;
  const lonMin = 50;
  const lonMax = 100;

  useEffect(() => {
    fetch("/sst_india.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load SST data:", err));
  }, []);

  if (!data.length) return <div>Loading SST data...</div>;

  // Compute lat/lon step for squares
  const lats = Array.from(new Set(data.map((d) => d.lat))).sort((a, b) => a - b);
  const lons = Array.from(new Set(data.map((d) => d.lon))).sort((a, b) => a - b);

  const latStep = lats.length > 1 ? lats[1] - lats[0] : 0.25;
  const lonStep = lons.length > 1 ? lons[1] - lons[0] : 0.25;

  // Map center
  const centerLat = (latMin + latMax) / 2;
  const centerLon = (lonMin + lonMax) / 2;

  return (
    <MapContainer
      center={[centerLat, centerLon]}
      zoom={5}
      minZoom={4}
      maxZoom={8}
      maxBounds={[
        [latMin, lonMin],
        [latMax, lonMax],
      ]}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OSM">
          <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
                      attribution='&copy; <a href="https://www.esri.com/">Esri</a> contributors'
                    />
        </BaseLayer>
        <BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri, Maxar"
          />
        </BaseLayer>
      </LayersControl>

      {/* Render SST as squares */}
      {data.map((point, i) => (
        <Rectangle
          key={i}
          bounds={[
            [point.lat - latStep / 2, point.lon - lonStep / 2],
            [point.lat + latStep / 2, point.lon + lonStep / 2],
          ]}
          pathOptions={{
            color: getColor(point.sst),
            fillColor: getColor(point.sst),
            weight: 0,
            fillOpacity: 0.9,
          }}
        >
          <Tooltip direction="top">
            <div>
              <strong>SST:</strong> {point.sst.toFixed(2)}°C
            </div>
          </Tooltip>
        </Rectangle>
      ))}
    </MapContainer>
  );
};

export default SSTMap;
