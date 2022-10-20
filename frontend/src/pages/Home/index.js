import React, { useState, useEffect } from "react";
import Axios from "axios";
import InfoPanel from "../../components/InfoPanel";
import Map from "../../components/Map";

import "./Home.scss";

function Home() {
  return (
    <div className="Home">
      <div className="InfoPanel_container">
        <InfoPanel />
      </div>
      <div className="Map_container">
        <Map />
      </div>
    </div>
  );
}

export default Home;
