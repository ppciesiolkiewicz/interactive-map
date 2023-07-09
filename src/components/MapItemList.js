
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';


export default function MapItemList({ data }) {
  return (
    <List sx={{ height: '100%' }}>
      {data.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={item.title} secondary={item.alert_type} />
        </ListItem>
      ))}
    </List>
  );
};