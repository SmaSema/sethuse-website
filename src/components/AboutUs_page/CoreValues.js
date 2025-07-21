import React from 'react';
import '../AboutUs_page/CoreValues.css'; // or CoreValues.css if separated

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
    <section className="core-values" data-aos="fade-left">
      <h2>Our Core Values</h2>
      <hr className="divider" />
      <div className="core-values-grid">
        {coreValues.map((value, index) => (
          <div key={index}>
            <h3>{value.icon} {value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
