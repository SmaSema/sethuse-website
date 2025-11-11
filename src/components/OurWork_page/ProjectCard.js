import React, { useState } from "react";
import '../OurWork_page/ProjectCard.css';

const placeholderImage = 'https://via.placeholder.com/800x400/6a1b9a/ffffff?text=Project+Image';

export default function ProjectCard({ title, date, objectives, image, description }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const validImage = image && image !== '' ? image : placeholderImage;
  const validObjectives = objectives && Array.isArray(objectives) ? objectives : [];

  // Close lightbox when clicking outside image or on close button
  const handleLightboxClose = (e) => {
    if (e.target.classList.contains('lightbox') || e.target.classList.contains('close-btn')) {
      setIsOpen(false);
    }
  };

  // Close lightbox with Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div className="project-card" data-aos="fade-up">
        <div className="image-container">
          <img 
            src={validImage} 
            alt={title || "Project Image"} 
            className="project-image"
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onError={(e) => { e.target.src = placeholderImage; e.target.alt = "Fallback project image"; }}
          />
          {/* Tooltip */}
          {showTooltip && (
            <div className="image-tooltip">
              Click to enlarge image
              <div className="tooltip-arrow"></div>
            </div>
          )}
        </div>

        <div className="project-info">
          <h3>{title || "Untitled Project"}</h3>
          <p><strong>Date:</strong> {date || "Date not specified"}</p>
          <p className="project-description">{description || "No description available."}</p>
          
          {validObjectives.length > 0 && (
            <div className="objectives-tags">
              {validObjectives.map((obj, i) => (
                <span key={i} className="tag">{obj}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox overlay - Simplified with only image and title */}
      {isOpen && (
        <div className="lightbox" onClick={handleLightboxClose}>
          <button className="close-btn" aria-label="Close image">
            &times;
          </button>
          <div className="lightbox-content">
            <img src={validImage} alt={title || "Project Image"} />
            <div className="image-title">
              {title || "Project Image"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}