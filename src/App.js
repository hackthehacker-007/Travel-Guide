import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from '../src/components/header/Header.jsx';
import List from '../src/components/list/List.jsx';
import Map from '../src/components/map/Map.jsx';
import {getPlacesData} from '../src/api/index';

function App() {

   const[places,setPlaces]=useState([]);
   const[coordinates,setCoordinates]=useState({});
   const[bounds,setBounds]=useState({});

  
   useEffect(() => {                                                                          //Using the Geolocation API
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);



   useEffect(() =>{
        getPlacesData(bounds.sw,bounds.ne)
            .then((data) =>{
              console.log(data);
              setPlaces(data);

            })
   },[coordinates,bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
          places={places}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
