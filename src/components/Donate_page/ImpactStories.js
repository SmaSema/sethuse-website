import React from 'react';
import './ImpactStories.css';

// Import images
import educationImg from '../../assets/education.jpg';
import healthImg from '../../assets/health.jpg';
import developmentImg from '../../assets/development.jpg';

// Map titles to imported images
const images = {
  Education: educationImg,
  Health: healthImg,
  Development: developmentImg,
};

const ImpactStories = () => (
  <section className="impact-stories">
    <h2>How Your Donation Helps</h2>
    <div className="stories-grid">
      {['Education', 'Health', 'Development'].map((title, index) => (
        <div className="story-card" key={index}>
          <img src={images[title]} alt={`${title} Program`} />
          <h3>{title}</h3>
          <p>
            {title === 'Education'
              ? 'Fund school supplies and mentorship for learners.'
              : title === 'Health'
              ? 'Support mobile clinics and wellness workshops.'
              : 'Enable skills training and sustainable projects.'}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default ImpactStories;
