import React from 'react';
import DonateHero from '../components/Donate_page/DonateHero';
import ImpactStories from '../components/Donate_page/ImpactStories';
import DonationOptions from '../components/Donate_page/DonationOptions';
import PaymentSection from '../components/Donate_page/PaymentSection';

const DonatePage = () => {
  return (
    <main className="donate-page">
      <DonateHero />
      <ImpactStories />
      <DonationOptions />
      <PaymentSection />
    </main>
  );
};

export default DonatePage;
