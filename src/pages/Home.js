//   The main homepage component for the Sethuse Community Haven website.
//   It composes key sections of the homepage in order, including:
//     1. Hero section (banner with mission statement or call-to-action)
//     2. AboutPreview section (brief about the organization)
//     3. ProgramsSection (overview of key programs and initiatives)
//     4. HowToHelp section (guidance for volunteering, donations, or engagement)


import React from 'react';
import Hero from '../components/Home_page/Hero';
import AboutPreview from '../components/Home_page/AboutPreview';
import ProgramsSection from '../components/Home_page/ProgramsSection';
import HowToHelp from '../components/Home_page/HowToHelp';

const Home = () => (
  <div>
    {/* Hero banner with key message and visuals */}
    <Hero />

    {/* Brief introduction about the organization */}
    <AboutPreview />

    {/* Section highlighting main programs and initiatives */}
    <ProgramsSection />

    {/* Section guiding visitors on how they can contribute or help */}
    <HowToHelp />
  </div>
);

export default Home;
