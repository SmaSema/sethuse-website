// Author: Smangalene Charles Sema
// Date: 5 September 2025
// Description: This React component renders the Hero section of the homepage. 
//              It includes a motivational quote, a short description, and 
//              call-to-action buttons that direct users to donate or get involved.

import React from 'react';
import { Link } from 'react-router-dom';
import '../Home_page/Hero.css';

// Functional component for the Hero section
const Hero = () => (
  <section className="hero">
    <div className="hero-overlay">
      {/* Main heading/quote */}
      <h1>We Make a Living by What We Get, But We Make a Life by What We Give</h1>

      {/* Supporting text */}
      <p>Creating safe spaces, supporting growth, and celebrating resilience.</p>

      {/* Call-to-action buttons */}
      <div className="hero-buttons">
        {/* Link to the donation page */}
        <Link to="/donate" className="primary">Donate Now</Link>

        {/* Link to the contact/get involved page */}
        <Link to="/contact" className="secondary">Get Involved</Link>
      </div>
    </div>
  </section>
);

// Exporting the Hero component so it can be reused in other parts of the website
export default Hero;
