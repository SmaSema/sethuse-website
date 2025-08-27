// Author: Smangalene Charles Sema
// Date: 5 September 2025
// Description: React component for the "Our Mission" section of the About Us page. 
//              Displays the mission statement text alongside an illustrative image,
//              with fade-in animations using AOS library.

import React from 'react';
import '../AboutUs_page/MissionAbout.css'; // Import corresponding CSS
import hikeImage from '/Users/smang/sethuse-website/src/assets/Hike.jpg'; // Image illustrating community support

const MissionSection = () => {
  return (
    // Main mission section container
    <section className="mission">

      {/* Mission statement text container */}
      <div className="mission-text" data-aos="fade-right">
        {/* Section heading */}
        <h2>Our Mission</h2>
        {/* Divider line under heading */}
        <hr className="divider" />
        {/* Mission description paragraph */}
        <p>
          Sethuse Community Haven is on a mission to create a 
          haven of support and empowerment for those in need. 
          Through collaborative efforts and community 
          engagement, we aim to foster positive change, uplift 
          the marginalized, and build a resilient and inclusive 
          society. 
        </p>
      </div>

      {/* Image container */}
      <div className="mission-image" data-aos="fade-left">
        {/* Mission image illustrating community support */}
        <img src={hikeImage} alt="Community support activity" />
      </div>
    </section>
  );
};

export default MissionSection;
