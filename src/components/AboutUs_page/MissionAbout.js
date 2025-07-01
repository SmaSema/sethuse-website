// src/components/MissionSection.js

import React from 'react';
import '../AboutUs_page/MissionAbout.css';

const MissionSection = () => {
  return (
    <section className="mission">
      <div className="mission-text">
        <h2>Our Mission</h2>
        <p>
            Sethuse Community Haven is on a mission to create a 
            haven of support and empowerment for those in need. 
            Through collaborative efforts and community 
            engagement, we aim to foster positive change, uplift 
            the marginalized, and build a resilient and inclusive 
            society. 
        </p>
      </div>
      <div className="mission-image">
        <img src="/src/assets/mission.jpg" alt="Community support activity" />
      </div>
    </section>
  );
};

export default MissionSection;
