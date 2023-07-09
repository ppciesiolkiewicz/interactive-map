"use client"
import React, { useState } from 'react';
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


function Map() {
  return (
    <Box>
      Map
    </Box>
  )
}

function MapItemList() {

  return (
    <Box>
      List
    </Box>
  )
}

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <main>
      <Grid container>
        <Grid item xs={12} sm={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <MapItemList />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Map />
        </Grid>

        <Button variant="contained" onClick={handleDialogOpen} sx={{ position: 'fixed', top: 0, left: 0, display: { xs: 'block', sm: 'none' } }}>
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
      </Grid>
    </main>
  )
}
