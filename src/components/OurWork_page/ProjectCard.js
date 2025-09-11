// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Displays a project card component for the Our Work page.
//              Each card includes a project image, title, date, description,
//              and objectives displayed as tags. Supports animation on scroll using AOS.

import React from "react";
import '../OurWork_page/ProjectCard.css'; // Import CSS for styling

// Functional component to display individual project information
export default function ProjectCard({ title, date, objectives, image, description }) {
  return (
    <div className="project-card" data-aos="fade-right">
      
      {/* Project image */}
      <img src={image} alt={title} className="project-image" />

      {/* Container for project details */}
      <div className="project-info">
        
        {/* Project title */}
        <h3>{title}</h3>

        {/* Project date */}
        <p><strong>Date:</strong> {date}</p>

        {/* Project description */}
        <p>{description}</p>
        
        {/* Objectives / tags section */}
        <div className="objectives-tags">
          {objectives.map((obj, i) => (
            <span key={i} className="tag">{obj}</span> // Each objective as a tag
          ))}
        </div>
      </div>
    </div>
  );
}
