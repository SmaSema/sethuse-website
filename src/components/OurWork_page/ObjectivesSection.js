import React from "react";
import '../OurWork_page/ObjectivesSection.css'

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

export default function ObjectivesSection() {
  return (
    <section className="objectives" data-aos="fade-right">
      <h5>Our Guiding Objectives</h5>
      <hr className="divider" />
      <div className="objectives-grid">
        {objectives.map((obj, index) => (
          <div key={index} className="objective-card">
            <h3>{obj.title}</h3>
            <p>{obj.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
