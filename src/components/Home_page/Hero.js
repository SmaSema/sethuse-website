import React from 'react';
import { Link } from 'react-router-dom';
import '../Home_page/Hero.css';

const Hero = () => (
  <section className="hero">
    <div className="hero-overlay">
      <h1>Empowering Communities with Compassion and Purpose</h1>
      <p>Creating safe spaces, supporting growth, and celebrating resilience.</p>
      <div className="hero-buttons">
        <Link to="/donate" className="primary">Donate Now</Link>
        <Link to="/contact" className="secondary">Get Involved</Link>
      </div>
    </div>
  </section>
);

export default Hero;
