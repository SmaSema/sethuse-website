import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [showCancelled, setShowCancelled] = useState(false);
  const [finalDonationAmount, setFinalDonationAmount] = useState(0);
  const [finalDonationType, setFinalDonationType] = useState('once');
  const location = useLocation();

  // Handle return from PayFast
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus === 'success') {
      setShowSuccess(true);
      // Scroll to top to show success message
      window.scrollTo(0, 0);
      
      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
      
    } else if (paymentStatus === 'cancelled') {
      setShowCancelled(true);
      window.scrollTo(0, 0);
      
      // Auto-hide cancelled message after 8 seconds
      setTimeout(() => {
        setShowCancelled(false);
      }, 8000);
    }
  }, [location]);

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
    
    // Store the final donation details
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    setFinalDonationAmount(finalAmount);
    setFinalDonationType(donationType);
    
    // Show success message for direct donations (non-PayFast)
    setShowSuccess(true);
    
    // Reset form after 5 seconds for direct donations
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

  // If showing success message from direct donation, render the success UI
  if (showSuccess && !location.search.includes('payment=success')) {
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
      {/* PayFast Success Message */}
      {showSuccess && location.search.includes('payment=success') && (
        <div className="payment-success-message">
          <h2>Thank You for Your Donation! 🎉</h2>
          <p>Your payment was successfully processed through PayFast. We deeply appreciate your support in helping our community.</p>
          <p>You should receive a payment confirmation email shortly.</p>
          <button onClick={() => {
            setShowSuccess(false);
            // Clear the URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
          }} className="back-button">
            Make Another Donation
          </button>
        </div>
      )}

      {/* PayFast Cancelled Message */}
      {showCancelled && (
        <div className="payment-cancelled-message">
          <h2>Payment Cancelled</h2>
          <p>Your payment was not completed. You can try again whenever you're ready.</p>
          <button onClick={() => {
            setShowCancelled(false);
            // Clear the URL parameters
            window.history.replaceState({}, document.title, window.location.pathname);
          }} className="back-button">
            Try Again
          </button>
        </div>
      )}

      <DonateHero />
      
      <ImpactStories />
      
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