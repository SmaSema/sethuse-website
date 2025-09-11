// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: This React component displays the main programs offered by Sethuse Community Haven,
//              including Environmental Improvement, Food Security, and Empowerment Programs. 
//              It renders each program with an image, title, and description in a grid layout.

import React from 'react';
import '../Home_page/ProgramsSection.css';
import envImg from '/Users/smang/sethuse-website/src/assets/Env Improvement.jpg';
import foodSecurity from '../../assets/food_security.jpg';
import empowerImg from '/Users/smang/sethuse-website/src/assets/GBV awareness.jpg';

// Array of program objects, each containing title, image, and description
const programs = [
  {
    title: 'Environmental Improvement',
    image: envImg,
    description: 'Promoting clean-ups, recycling, and environmental awareness in local communities.'
  },
  {
    title: 'Food Security',
    image: foodSecurity,
    description: 'Supporting communities by promoting sustainable agriculture, improving access to nutritious food, and ensuring food security for all.',
  },
  {
    title: 'Empowerment Programs',
    image: empowerImg,
    description: 'Supporting communities through awareness campaigns and support structures.'
  },
];

// Functional component to render the Programs Section
const ProgramsSection = () => (
  <section className="programs-section">
    {/* Section Title */}
    <h2 className="programs-title" data-aos="fade-right">Our Work</h2>
    <hr className="divider-work" data-aos="fade-right" />

    {/* Programs Grid - maps through the programs array */}
    <div className="programs-grid">
      {programs.map((program, index) => (
        <div className="program-card" key={index} data-aos="fade-right">
          {/* Program Image */}
          <img src={program.image} alt={program.title} className="program-img" />

          {/* Program Title */}
          <h3 className="program-label">{program.title}</h3>

          {/* Program Description */}
          <p className="program-description">{program.description}</p>
        </div>
      ))}
    </div>

    {/* View More Button - links to the About page */}
    <div className="view-more-container" data-aos="fade-down">
      <a href="/about" className="view-more-button">View More</a>
    </div>
  </section>
);

// Exporting the component so it can be reused in other parts of the app
export default ProgramsSection;
