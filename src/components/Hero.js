import React from 'react';
import './Hero.css';

const Hero = () => (
  <section className="hero">
    <div className="hero-overlay">
      <h1>Empowering Communities with Compassion and Purpose</h1>
      <p>Creating safe spaces, supporting growth, and celebrating resilience.</p>
      <div className="hero-buttons">
        <button className="primary">Donate Now</button>
        <button className="secondary">Get Involved</button>
      </div>
    </div>
  </section>
);

export default Hero;
