import React from "react";
import '../OurWork_page/ProjectCard.css'

export default function ProjectCard({ title, date, objectives, image, description }) {
  return (
    <div className="project-card" data-aos="fade-right">
      <img src={image} alt={title} className="project-image" />
      <div className="project-info">
        <h3>{title}</h3>
        <p><strong>Date:</strong> {date}</p>
        <p>{description}</p>
        <div className="objectives-tags">
          {objectives.map((obj, i) => (
            <span key={i} className="tag">{obj}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
