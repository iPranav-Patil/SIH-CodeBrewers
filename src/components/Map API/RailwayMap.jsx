import React from 'react';
import { MapContainer, TileLayer, Circle, Popup, Polyline, ScaleControl } from 'react-leaflet';

export default function RailwayMap({ stations, trains }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} 
      zoom={5}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map((station) => (
        <Circle
          key={station.properties.code}
          center={[
            station.geometry?.coordinates[1] || 0,
            station.geometry?.coordinates[0] || 0,
          ]}
          radius={50}
          color='red'
        >
          <Popup>{station.properties.name}</Popup>
        </Circle>
      ))}
      {trains.map((train) => (
        <Polyline
          key={train.properties.number}
          positions={train.geometry.coordinates.map((coord) => [
            coord[1],
            coord[0],
          ])}
          color="blue"
        />
      ))}
      <ScaleControl position="bottomleft" />
    </MapContainer>
  );
}