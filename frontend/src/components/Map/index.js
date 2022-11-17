import React, { useState, useEffect } from "react";
import {
  Map,
  GoogleApiWrapper,
  Polyline,
  GoogleMap,
  Marker,
} from "google-maps-react";
import { mapStyles } from "./mapStyles";
import { IoIosAirplane } from "react-icons/io";
import Axios from "axios";
import { useSelector } from "react-redux";

import "./Map.scss";

const style = {
  overflowX: "hidden",
  overflowY: "hidden",
};
const containerStyle = {};

const mapLoaded = (mapProps, map) => {
  map.setOptions({
    styles: mapStyles,
  });
};

function CustomMap({ google, locations = [] }) {
  const routes = useSelector((state) => state.routes.filteredRoutes);

  return (
    <Map
      google={google}
      style={style}
      containerStyle={containerStyle}
      initialCenter={locations[0]}
      zoom={3}
      disableDefaultUI={true}
      onReady={(mapProps, map) => mapLoaded(mapProps, map)}
    >
      {routes &&
        routes.map((route) => {
          return (
            <Marker
              icon={{
                url: "http://maps.google.com/mapfiles/ms/micons/plane.png",
              }}
              title={route.origin_city}
              name={route.airline_name}
              position={{ lat: route.origin_lat, lng: route.origin_long }}
            />
          );
        })}

      {routes &&
        routes.map((route) => {
          return (
            <Marker
              icon={{
                url: "http://maps.google.com/mapfiles/ms/micons/plane.png",
              }}
              title={route.dest_city}
              name={route.airline_name}
              position={{ lat: route.dest_lat, lng: route.dest_long }}
            />
          );
        })}

      {routes &&
        routes.map((route) => {
          return (
            <Polyline
              path={[
                {
                  lat: parseFloat(route.origin_lat),
                  lng: parseFloat(route.origin_long),
                },
                {
                  lat: parseFloat(route.dest_lat),
                  lng: parseFloat(route.dest_long),
                },
              ]}
              geodesic={true}
              strokeColor="grey"
              strokeOpacity={0.8}
              strokeWeight={2}
            />
          );
        })}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA77pNGXUvPDMhZdfgY2_TuPHYJeEyIXdA",
})(CustomMap);
