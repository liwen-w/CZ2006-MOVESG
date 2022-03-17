
import React, { Component } from 'react';
import Map from '../Map/Map';
import "./homePage.css";

function Home() {
  return (
    <div className="Home">
      <div className="map">
        <Map />
      </div>
    </div>
  );
  
}

export default Home;