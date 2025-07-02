import React from 'react';
import './ProgramsSection.css';
import envImg from '../assets/Env Improvement.jpg';
import youthImg from '../assets/Youth Dev.jpg';
import empowerImg from '../assets/GBV awareness.jpg';

const programs = [
  {
    title: 'Environmental Improvement',
    image: envImg,
    description: 'Promoting clean-ups, recycling, and environmental awareness in local communities.'
  },
  {
    title: 'Youth Empowerment',
    image: youthImg,
    description: 'Equipping young people with skills, mentorship, and opportunities for growth.'
  },
  {
    title: 'Empowerment Programs',
    image: empowerImg,
    description: 'Supporting communities through awareness campaigns and support structures.'
  },
];

const ProgramsSection = () => (
  <section className="programs-section">
    <h2 className="programs-title">Our Work</h2>
          <hr className="divider-work" />
    <div className="programs-grid">
      {programs.map((program, index) => (
        <div className="program-card" key={index}>
          <img src={program.image} alt={program.title} className="program-img" />
          <h3 className="program-label">{program.title}</h3>
          <p className="program-description">{program.description}</p>
        </div>
      ))}
    </div>
    <div className="view-more-container">
      <a href="/programs" className="view-more-button">View More</a>
    </div>
  </section>
);

export default ProgramsSection;
