import React from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
} from 'react-leaflet';

const randomHexColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

const Map = ({ flights }) => (
  <MapContainer
    style={{ height: 500, width: 500 }}
    center={[0, 0]}
    zoom={1}
    maxBounds={[[-90, -180], [90, 180]]}
    scrollWheelZoom={false}
  >
    <TileLayer
      noWrap
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      flights.map((flight) => (
        flight.positions && (
        <Marker key={flight.code} position={flight.positions[flight.positions.length - 1]}>
          <Tooltip offset={[-15, -10]} direction="top" permanent>{flight.code}</Tooltip>
        </Marker>
        )
      ))
    }
    {
      flights.map((flight) => (
        <Polyline
          key={flight.code}
          color={randomHexColor()}
          positions={[flight.origin, flight.destination]}
          dashArray={[10, 5]}
        />
      ))
    }
    {
      flights.map((flight) => flight.positions && (
      <Polyline
        key={flight.code}
        color="#000000"
        positions={[...flight.positions]}
      />
      ))
    }
  </MapContainer>
);

export default Map;
