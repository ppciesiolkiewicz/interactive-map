"use client"
import React, { useState } from 'react';
import { Container, Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Map from '@/components/Map';
import MapItemList from '@/components/MapItemList';
import data from '@/data/incidents.json';


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
        <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block', maxHeight: '100vh', overflow: 'scroll' } }}>
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
