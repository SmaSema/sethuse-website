// src/components/MissionSection.js

import React from 'react';
import '../AboutUs_page/MissionAbout.css';

const MissionSection = () => {
  return (
    <section className="mission">
      <div className="mission-text">
        <h2>Our Mission</h2>
        <p>
          At Sethuse Community Haven, we create inclusive, compassionate spaces that
          foster resilience and belonging. Our programs support education, health, and social growth.
        </p>
      </div>
      <div className="mission-image">
        <img src="/src/assets/mission.jpg" alt="Community support activity" />
      </div>
    </section>
  );
};

export default MissionSection;
