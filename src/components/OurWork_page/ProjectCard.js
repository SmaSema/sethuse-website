// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Project Card component for displaying projects

import React from "react";
import '../OurWork_page/ProjectCard.css';

// Placeholder image
const placeholderImage = 'https://via.placeholder.com/800x400/6a1b9a/ffffff?text=Project+Image';

export default function ProjectCard({ title, date, objectives, image, description }) {
  // Ensure we never pass empty string to src
  const validImage = image && image !== '' ? image : placeholderImage;
  
  // Ensure objectives is always an array
  const validObjectives = objectives && Array.isArray(objectives) ? objectives : [];

  return (
    <div className="project-card" data-aos="fade-right">
      {/* Project image - never empty src */}
      <img 
        src={validImage} 
        alt={title || "Project Image"} 
        className="project-image"
        onError={(e) => {
          console.warn('❌ Image failed to load:', validImage);
          e.target.src = placeholderImage;
          e.target.alt = "Fallback project image";
        }}
        onLoad={() => console.log('✅ Image loaded successfully:', validImage)}
      />

      <div className="project-info">
        <h3>{title || "Untitled Project"}</h3>
        <p><strong>Date:</strong> {date || "Date not specified"}</p>
        <p>{description || "No description available."}</p>
        
        {validObjectives.length > 0 && (
          <div className="objectives-tags">
            {validObjectives.map((obj, i) => (
              <span key={i} className="tag">{obj}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}