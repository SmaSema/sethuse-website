// Author: Smangalene Charles Sema
// Date: 5 September 2025
// Description: Displays the objectives section for the Our Work page.
//              Each objective is displayed as a card with a title and description.
//              Supports animation on scroll using AOS library.

import React from "react";
import '../OurWork_page/ObjectivesSection.css'; // Import CSS for styling

// Array of objectives with title and description
const objectives = [
  { title: "Education", description: "Facilitating learning and skill development for brighter futures." },
  { title: "Youth Development", description: "Empowering youth through mentorship and leadership." },
  { title: "Sports Development", description: "Encouraging healthy lifestyles and team spirit through sports." },
  { title: "Elderly Care", description: "Supporting seniors and promoting intergenerational engagement." },
  { title: "Environmental Improvement", description: "Driving sustainability with clean-up campaigns and eco-projects." },
  { title: "Empowerment Programs", description: "Fostering gender equality and inclusive opportunities." },
  { title: "GBV Awareness", description: "Creating safer communities by addressing gender-based violence." },
  { title: "LGBTQIA+ Inclusivity", description: "Celebrating and supporting diverse identities." },
  { title: "Food Security", description: "Ensuring access to nutritious food through gardens and education." },
];

// Functional component to display the objectives section
export default function ObjectivesSection() {
  return (
    <section className="objectives">
      
      {/* Section title */}
      <h5>Our Guiding Objectives</h5>
      
      {/* Divider line under title */}
      <hr className="divider" />

      {/* Grid container for all objective cards */}
      <div className="objectives-grid" data-aos="fade-up">
        
        {/* Map through objectives array and display each as a card */}
        {objectives.map((obj, index) => (
          <div key={index} className="objective-card">
            
            {/* Objective title */}
            <h3>{obj.title}</h3>

            {/* Objective description */}
            <p>{obj.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
