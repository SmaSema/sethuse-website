import React from 'react';
import '../OurWork_page/ProgramsWork.css'
const programs = [
  {
    title: "Early Childhood Education",
    image: "/images/education.jpg",
    description: "Nurturing young minds through play and structured learning."
  },
  {
    title: "Community Nutrition",
    image: "/images/nutrition.jpg",
    description: "Providing daily meals to promote health and dignity."
  },
  {
    title: "Youth Empowerment",
    image: "/images/youth.jpg",
    description: "Mentoring young people to build confidence and opportunity."
  }
];

const ProgramsWork = () => (
  <section className="programs">
        {programs.map((item, index) => (
          <div key={index} className="program-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </section>
);

export default ProgramsWork;
