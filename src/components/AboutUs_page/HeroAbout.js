// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: React component for the Hero section on the About Us page. 
//              Displays a background section with overlay text including 
//              a heading and a short description of the organization's mission.

import React from 'react';
import '../AboutUs_page/HeroAbout.css'; // Import corresponding CSS

const HeroAbout = () => {
  return (
    // Main hero section container
    <section className="hero2">

      {/* Overlay container for text */}
      <div className="overlay">
        {/* Main heading */}
        <h1>Building Hope, One Community at a Time</h1>
        {/* Short descriptive paragraph */}
        <p>We empower and uplift through connection, care, and shared purpose.</p>
      </div>
    </section>
  );
};

export default HeroAbout;
