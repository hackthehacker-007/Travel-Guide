import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from '../src/components/header/Header.jsx';
import List from '../src/components/list/List.jsx';
import Map from '../src/components/map/Map.jsx';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List/>
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map/>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
