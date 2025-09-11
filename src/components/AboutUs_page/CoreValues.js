// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: React component for the "Our Core Values" section of the About Us page.
//              Displays a list of core values with icons, titles, and descriptions,
//              highlighting the organization’s guiding principles.

import React from 'react';
import '../AboutUs_page/CoreValues.css'; // Import corresponding CSS

// Array of core values with icon, title, and description
const coreValues = [
  {
    icon: '❤️',
    title: 'Compassion',
    description: 'We lead with heart, offering care and dignity to everyone we serve.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'We believe in collective strength and grow through partnerships.',
  },
  {
    icon: '🌱',
    title: 'Growth',
    description: 'We nurture human potential and sustainable development.',
  },
];

const CoreValues = () => {
  return (
    // Main container for the core values section
    <section className="core-values">

      {/* Section heading */}
      <h2>Our Core Values</h2>
      {/* Divider line under heading */}
      <hr className="divider" />

      {/* Grid container for core value items */}
      <div className="core-values-grid" data-aos="fade-up">
        {coreValues.map((value, index) => (
          // Individual core value item
          <div key={index}>
            {/* Icon and title */}
            <h3>{value.icon} {value.title}</h3>
            {/* Description of the core value */}
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
