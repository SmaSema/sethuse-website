// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description:
//   The About Us page for Sethuse Community Haven.
//   This page provides visitors with an overview of the organization,
//   its mission, core values, team members, and a call-to-action section
//   to engage visitors further.


import React from 'react';
import HeroAbout from '../components/AboutUs_page/HeroAbout';
import MissionAbout from '../components/AboutUs_page/MissionAbout';
import CoreValues from '../components/AboutUs_page/CoreValues';
import MeetTheTeam from '../components/AboutUs_page/MeetTheTeam';
import CTABanner from '../components/AboutUs_page/CTABanner';

const AboutUs = () => {
  return (
    <>
      {/* Hero banner for About Us page */}
      <HeroAbout />

      {/* Mission and vision section */}
      <MissionAbout />

      {/* Organization's core values */}
      <CoreValues />

      {/* Team member introductions */}
      <MeetTheTeam />

      {/* Call-to-action banner to engage visitors */}
      <CTABanner />
    </>
  );
};

export default AboutUs;
