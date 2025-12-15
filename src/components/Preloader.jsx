// Preloader.jsx
import React from 'react';
import './Preloader.css'; // Import the dedicated CSS file

// The URL for the green car charging GIF
const CAR_CHARGING_GIF_URL = 'https://zect.in/assets/imgs/about/ev-charging-green.gif';

function Preloader() {
  return (
    <div className="preloader-container">
      <div className="preloader-content">
        {/* The main charging GIF */}
        <img 
          src={CAR_CHARGING_GIF_URL} 
          alt="EV Charging Animation" 
          className="preloader-gif" 
        />
        
        {/* Subtle loading message with the brand green color */}
        <p className="loading-text">
          Loading EV Network...
        </p>
      </div>
    </div>
  );
}

export default Preloader;