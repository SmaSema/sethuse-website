// src/pages/Home.js
import React from 'react';
import Hero from '../components/Home_page/Hero';
import AboutPreview from '../components/Home_page/AboutPreview';
import ProgramsSection from '../components/Home_page/ProgramsSection';

const Home = () => (
  <div>
    <Hero />
    <AboutPreview />
    <ProgramsSection />
  </div>
);

export default Home;
