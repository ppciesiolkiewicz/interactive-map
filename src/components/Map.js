import dynamic from 'next/dynamic';
import React, { useEffect, useCallback, useMemo } from 'react';
import { ZoomControl, MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapEvents = ({ markers, onVisibleMarkersChanged }) => {
  const map = useMap();

  const handleSetVisibleMarkers = useCallback(() => {
    if (!map) {
      return;
    }

    const bounds = map.getBounds();
    const visibleMarkers = markers.filter(marker => bounds.contains(marker.position));
    onVisibleMarkersChanged(visibleMarkers);
  }, [onVisibleMarkersChanged, markers, map]);

  useEffect(() => {
    handleSetVisibleMarkers();
  }, [handleSetVisibleMarkers]);

  useMapEvents({
    moveend: handleSetVisibleMarkers,
  });

  return null;
}

export default function Map({ data, onVisibleMarkersChanged }) {
  const markers = useMemo(
    () =>
      data.map(({ id, lat, long, title, description, alert_type }) => ({
        position: [parseFloat(lat), parseFloat(long)],
        id,
        title,
        description,
        alert_type,
      })),
      [data]
    );

  const center = markers[0].position;

  return (
    <MapContainer center={center} zoom={13} zoomControl={false} style={{ flex: 1, width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      <MapEvents onVisibleMarkersChanged={onVisibleMarkersChanged} markers={markers} />
      {markers.map(({ id, title, position, description, alert_type }) => (
        <Marker key={id} position={position}>
          <Popup>
            <h3>{title}</h3>
            <p><b>Description:</b> {description}</p>
            <p><b>Alert type:</b> {alert_type}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};