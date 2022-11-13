import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import Axios from "axios";

import "./Map.scss";

const style = {
  overflowX: "hidden",
  overflowY: "hidden",
};
const containerStyle = {};

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
    ></Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA77pNGXUvPDMhZdfgY2_TuPHYJeEyIXdA",
})(CustomMap);
