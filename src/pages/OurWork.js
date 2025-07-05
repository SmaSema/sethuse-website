// src/pages/Work.js
import React from 'react';
import HeroWork from '../components/OurWork_page/HeroWork';
import ObjectivesSection from '../components/OurWork_page/ObjectivesSection';
import ProjectCard from '../components/OurWork_page/ProjectCard';

const workData = [
  {
    title: "Illovonek Primary School Give Back Initiative",
    date: "2023",
    objectives: ["Education"],
    image: "/images/illovonek.jpg",
    description: "Provided educational resources and joyful engagement with students.",
  },
  {
    title: "Imbali Soccer Tournament for AmaPanter U11",
    date: "2022 & 2023",
    objectives: ["Sports Development"],
    image: "/images/imbali-soccer.jpg",
    description: "Strengthened youth engagement through sports and leadership.",
  },
  {
    title: "Women of Substance Luncheon Event",
    date: "2023",
    objectives: ["Empowerment Programs", "GBV Awareness"],
    image: "/images/women-substance.jpg",
    description: "Celebrated female leadership while promoting safety and equality.",
  },
  {
    title: "Indaleni Cattle Veterinarian Programme",
    date: "2021",
    objectives: ["Environmental Improvement", "Food Security"],
    image: "/images/indaleni-vet.jpg",
    description: "Advanced sustainability through agricultural care and learning.",
  },
];

const OurWork = () => {
  return (
    <>
      <HeroWork />
      <ObjectivesSection />
      <section className="projects">
        <h2>Highlights of Our Work</h2>
        {workData.map((work, idx) => (
          <ProjectCard key={idx} {...work} />
        ))}
      </section>
    </>
  );
};

export default OurWork;
