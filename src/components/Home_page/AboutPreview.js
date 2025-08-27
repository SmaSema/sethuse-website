// Author: Smangalene Charles Sema
// Date: 5 September 2025
// Description: This React component provides a short preview of the "About Us" section 
//              for Sethuse Community Haven. It introduces the organization's mission 
//              and links users to the full About page for more details.

import React from 'react';
import '../Home_page/AboutPreview.css';

// Functional component for the About Us preview section
const AboutPreview = () => (
  <section className="about-preview">
    
    {/* About Us content with animation on scroll */}
    <div className="about-preview-content" data-aos="fade-up">
      
      {/* Section title */}
      <h2>About Us</h2>
      <hr className="divider" />

      {/* Short mission statement */}
      <p>
        We are on a mission to create a haven of support 
        and empowerment for those in need. Through collaborative 
        efforts and community engagement, we aim to foster positive 
        change, uplift the marginalized, and build a resilient and 
        inclusive society.
      </p>

      {/* Link to the full About page */}
      <a href="/about">More About Us</a>
    </div>

  </section>
);

// Exporting component for reuse across the site
export default AboutPreview;
