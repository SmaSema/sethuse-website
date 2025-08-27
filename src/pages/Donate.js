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
    // In a real implementation, this would integrate with PaySharp API
    alert(`Thank you for your ${donationType === 'monthly' ? 'monthly' : 'one-time'} donation of R${customAmount || amount}! You will now be redirected to our secure payment processor.`);
    // Redirect to PaySharp payment page would happen here
  };

  return (
    <main className="donate-page">
      <DonateHero />
      
      <ImpactStories />
      
      <ChooseYourImpact 
        donationType={donationType} 
        setDonationType={setDonationType} 
      />
      
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