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
  return (
    <Map
      google={google}
      style={style}
      containerStyle={containerStyle}
      center={locations[0]}
      initialCenter={locations[0]}
      zoom={locations.length === 1 ? 18 : 13}
      disableDefaultUI={true}
      onReady={(mapProps, map) => mapLoaded(mapProps, map)}
    >
      <Marker
        icon={<IoIosAirplane />}
        title={"Test"}
        name={"SOMA"}
        position={{ lat: 37.778519, lng: -122.40564 }}
      />

      <Marker
        title={"Test"}
        name={"SOMA"}
        position={{ lat: 67.778519, lng: -12.40564 }}
      />
      <Polyline
        path={[
          { lat: 37.778519, lng: -122.40564 },
          { lat: 67.778519, lng: -12.40564 },
        ]}
        geodesic={true}
        strokeColor="grey"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA77pNGXUvPDMhZdfgY2_TuPHYJeEyIXdA",
})(CustomMap);
