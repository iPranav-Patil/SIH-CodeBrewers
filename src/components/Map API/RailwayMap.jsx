import React from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Polyline,
  ScaleControl,
  Popup,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";

export default function RailwayMap({ stations, trains }) {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
        style={{
          color: "black",
          border: "1px solid gray",
          borderRadius: "10px",
          padding: "6px",
        }}
      >
        BACK
      </button>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations.map((station) =>
          station.geometry && station.geometry.coordinates ? (
            <Circle
              key={station.properties.code}
              center={[
                station.geometry.coordinates[1],
                station.geometry.coordinates[0],
              ]}
              radius={100}
              color="red"
            >
              <Popup>{station.properties.name}</Popup>
            </Circle>
          ) : null
        )}
        {trains.map((train) =>
          train.geometry && train.geometry.coordinates ? (
            <Polyline
              key={train.properties.number}
              positions={train.geometry.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ])}
              color="blue"
            />
          ) : null
        )}
        <ScaleControl position="bottomleft" />
      </MapContainer>
    </>
  );
}
