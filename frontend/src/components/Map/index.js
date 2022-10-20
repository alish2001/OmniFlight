import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import Axios from "axios";

import "./Map.scss";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export default function CustomMap({ google, locations = [] }) {
  return (
    <div className="Map_container">
      {/* <Map
        google={google}
        style={{
          width: "60%",
          height: "100%",
        }}
        center={locations[0]}
        initialCenter={locations[0]}
        zoom={locations.length === 1 ? 18 : 13}
        disableDefaultUI={true}
      ></Map> */}
    </div>
  );
}

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA77pNGXUvPDMhZdfgY2_TuPHYJeEyIXdA",
// })(CustomMap);
