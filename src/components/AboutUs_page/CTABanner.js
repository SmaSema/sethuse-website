// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: React component for the Call-To-Action (CTA) banner section. 
//              Encourages users to get involved by volunteering, 
//              includes heading, description, and a button with click action.

import React from 'react';
import '../AboutUs_page/CTABanner.css'; // Import corresponding CSS
import { Link } from 'react-router-dom'

const CTABanner = () => {
  return (
    // Main CTA wrapper section
    <section className="cta-wrapper">

      {/* Banner container with fade-left animation */}
      <div className="cta-banner" data-aos="fade-left">
        
        {/* Section heading */}
        <h2>Be Part of the Change</h2>
        {/* Divider line */}
        <hr className="divider" />
        {/* Description text */}
        <p>Your support helps us grow stronger communities.</p>
        {/* Button to redirect user to the contact/volunteer page */}
        <Link to="/contact">
          <button>Volunteer</button>
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
