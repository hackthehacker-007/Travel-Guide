import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';


import useStyles from './styles.js';


export default function Map({ setBounds, setCoordinates, coordinates, places, setChildClicked, weatherData }) {

    const isDesktop = useMediaQuery('(min-width:600px)');
    const classes = useStyles();



    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDrD5XKkYAJVtMZGNxXADrtW0q4uw_6McA' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => { setChildClicked(child) }}
            >

                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}              // string to number
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop
                                ? <LocationOnOutlinedIcon color="primary" fontSize="large" />
                                : (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>

                                        <img
                                            className={classes.pointer}
                                            src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                            alt={place.name} />

                                        <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />

                                    </Paper>
                                )}
                    </div>
                ))}


                {weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    );
};

