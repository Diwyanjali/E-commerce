/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import bg from '../assests/HeroSection.mp4';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video className="hero-video" autoPlay loop muted>
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>Welcome to WMARKET</h1>

      </div>
    </div>
  );
};

export default HeroSection;
