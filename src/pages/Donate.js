import React from 'react';
import HeroSection from './HeroSection';
import ImpactStories from './ImpactStories';
import DonationOptions from './DonationOptions';
import PaymentSection from './PaymentSection';
import DonateFooter from './DonateFooter';
import './DonatePage.css';

const DonatePage = () => {
  return (
    <main className="donate-page">
      <HeroSection />
      <ImpactStories />
      <DonationOptions />
      <PaymentSection />
      <DonateFooter />
    </main>
  );
};

export default DonatePage;
