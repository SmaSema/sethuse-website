// src/pages/AboutUs.js
import React from 'react';
import HeroAbout from '../components/AboutUs_page/HeroAbout';
import MissionAbout from '../components/AboutUs_page/MissionAbout'
import CoreValues from '../components/AboutUs_page/CoreValues';
import MeetTheTeam from '../components/AboutUs_page/MeetTheTeam';
import CTABanner from '../components/AboutUs_page/CTABanner';

const AboutUs = () => {
  return (
    <>
      <HeroAbout />
      <MissionAbout />
      <CoreValues />
      <MeetTheTeam />
      <CTABanner />
    </>
  );
};

export default AboutUs;
