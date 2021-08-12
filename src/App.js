import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from '../src/components/header/Header.jsx';
import List from '../src/components/list/List.jsx';
import Map from '../src/components/map/Map.jsx';
import {getPlacesData, getWeatherData} from '../src/api/index';

function App() {

   const[places,setPlaces]=useState([]);
   const[coordinates,setCoordinates]=useState({});
   const[bounds,setBounds]=useState({});
   const[childClicked,setChildClicked]=useState(null);
   const[isLoading,setIsLoading]=useState(false);
   const [type, setType] = useState('restaurants');
   const [rating, setRating] = useState('');
   const [filteredPlaces, setFilteredPlaces] = useState([]);
   const [weatherData, setWeatherData] = useState([]);
  

  
   useEffect(() => {                                                                          //Using the Geolocation API
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);
    
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating])


   useEffect(() =>{
         setIsLoading(true);


         getWeatherData(coordinates.lat, coordinates.lng)
        .then((data) => setWeatherData(data));


        getPlacesData(type, bounds.sw,bounds.ne)
            .then((data) =>{
              setPlaces(data);
              setFilteredPlaces([]);
              setIsLoading(false);

            })
   },[bounds,type]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
          places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
