import React, { useState } from 'react';
import DonateHero from '../components/Donate_page/DonateHero';
import ImpactStories from '../components/Donate_page/ImpactStories';
import ChooseYourImpact from '../components/Donate_page/ChooseYourImpact';
import DonationForm from '../components/Donate_page/DonationForm';
import PaymentInfo from '../components/Donate_page/PaymentInfo';
import './Donate.css';

const DonatePage = () => {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [finalDonationAmount, setFinalDonationAmount] = useState(0);
  const [finalDonationType, setFinalDonationType] = useState('once');

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setAmount(parseInt(value) || 0);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store the final donation details before resetting anything
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    setFinalDonationAmount(finalAmount);
    setFinalDonationType(donationType);
    
    setShowSuccess(true);
    
    setTimeout(() => {
      setDonationType('once');
      setAmount(500);
      setCustomAmount('');
      setDonorInfo({
        name: '',
        email: '',
        message: ''
      });
    }, 5000);
  };

  // If showing success message, render the success UI
  if (showSuccess) {
    return (
      <main className="donate-page">
        <div className="success-message">
          <h2>Thank You for Your Generous Donation!</h2>
          <p>Your {finalDonationType === 'monthly' ? 'monthly' : 'one-time'} donation of R{finalDonationAmount} will make a significant impact.</p>
          <p>We've sent a confirmation email to {donorInfo.email} with your donation details.</p>
          <button onClick={() => setShowSuccess(false)} className="back-button">
            Make Another Donation
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="donate-page">
      <DonateHero />
      
      <ImpactStories />
      
      {/* Added ID to the section wrapping ChooseYourImpact for scrolling */}
      <section id="choose-impact-section">
        <ChooseYourImpact 
          donationType={donationType} 
          setDonationType={setDonationType} 
        />
      </section>
      
      <DonationForm
        donationType={donationType}
        amount={amount}
        customAmount={customAmount}
        donorInfo={donorInfo}
        handleAmountSelect={handleAmountSelect}
        handleCustomAmountChange={handleCustomAmountChange}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      
      <PaymentInfo />
    </main>
  );
};

export default DonatePage;