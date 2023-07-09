"use client"
import React, { useState, useMemo } from 'react';
import { Container, Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';
import { ZoomControl, MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '@/data/incidents.json';

const Map = ({ data, onVisibleMarkersChanged }) => {
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

  const MapEvents = () => {
    const map = useMap();

    const handleMapMove = (event) => {
      const { lat, lng } = event.target.getCenter();
      console.log(`New map position: Lat: ${lat}, Lng: ${lng}`);
      if (map) {
        const bounds = map.getBounds();
        const visibleMarkers = markers.filter(marker => bounds.contains(marker.position));
        console.log(visibleMarkers.length, visibleMarkers)
        onVisibleMarkersChanged(visibleMarkers);
      }
    };

    useMapEvents({
      moveend: handleMapMove, // Event triggered when the map finishes moving
    });

    return null;
  }

  
  return (
    <MapContainer center={center} zoom={13} zoomControl={false} style={{ flex: 1, width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      <MapEvents />
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

function MapItemList({ data }) {
  return (
    <List sx={{ maxHeight: '100%', overflow: 'scroll' }}>
      {data.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={item.title} secondary={item.alert_type} />
        </ListItem>
      ))}
    </List>
  );
};

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 0 }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block', maxHeight: '100vh' } }}>
          <MapItemList data={visibleMarkers} />
        </Grid>
        <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Map data={data.incidents} onVisibleMarkersChanged={setVisibleMarkers} />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleDialogOpen}
        sx={{ position: 'fixed', zIndex: 999, top: '10px', left: '10px', display: { xs: 'block', sm: 'none' } }}
      >
        Open Dialog
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <MapItemList />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
