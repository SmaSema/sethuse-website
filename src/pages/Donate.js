import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
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
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const location = useLocation();

  // Debug EmailJS configuration
  const debugEmailJSConfig = () => {
    console.log('🔧 EmailJS Configuration (Donate.js):');
    console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.REACT_APP_EMAILJS_DONATION_TEMPLATE_ID);
    console.log('Public Key:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing');
  };

  // Send confirmation email function - ONLY called after successful payment
  const sendConfirmationEmail = async (donationData, recipientEmail, recipientName = '') => {
    if (!recipientEmail) {
      console.log('❌ No email provided, cannot send confirmation');
      return false;
    }

    setSendingEmail(true);
    debugEmailJSConfig();
    
    try {
      const templateParams = {
        // Template variables - must match EmailJS template exactly
        name: recipientName || 'Valued Supporter',
        email: recipientEmail,
        amount: donationData.amount,
        donation_type: donationData.type === 'monthly' ? 'Monthly Donation' : 'One-time Donation',
        date: new Date().toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        donation_id: `SETH-${Date.now()}`,
        message: donationData.message || 'No additional message provided.',
        
        // Email headers
        to_email: recipientEmail,
        from_name: 'Sethuse Community Haven'
      };

      console.log('📧 Sending payment confirmation to:', recipientEmail);
      console.log('📤 Email template params:', templateParams);
      
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_DONATION_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      
      console.log('✅ Payment confirmation email sent successfully to:', recipientEmail);
      setEmailSent(true);
      return true;
    } catch (error) {
      console.error('❌ Failed to send payment confirmation email:', error);
      setEmailSent(false);
      return false;
    } finally {
      setSendingEmail(false);
    }
  };

  // Handle return from PayFast - FIXED VERSION
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus === 'success') {
      console.log('💰 PayFast Payment Success - Processing return...');
      
      // Try to get donation details from storage first (most reliable)
      const storedDonation = sessionStorage.getItem('pendingDonation') || localStorage.getItem('pendingDonation');
      let donationData = null;
      
      if (storedDonation) {
        try {
          donationData = JSON.parse(storedDonation);
          console.log('📋 Retrieved donation data from storage:', donationData);
        } catch (error) {
          console.error('❌ Error parsing stored donation data:', error);
        }
      }
      
      // Get details from URL parameters as fallback
      const payfastEmail = urlParams.get('email') || (donationData ? donationData.email : '');
      const payfastName = urlParams.get('name') || (donationData ? donationData.donor : 'Donor');
      const payfastAmount = urlParams.get('amount') || (donationData ? donationData.amount : (customAmount ? parseInt(customAmount) : amount));
      const payfastType = urlParams.get('type') || (donationData ? donationData.type : donationType);
      
      console.log('📊 Payment Details:', {
        email: payfastEmail,
        name: payfastName,
        amount: payfastAmount,
        type: payfastType,
        fromStorage: !!donationData
      });
      
      // Prepare final donation data for email
      const finalDonationData = {
        amount: payfastAmount,
        type: payfastType,
        donor: payfastName,
        email: payfastEmail,
        message: donationData ? donationData.message : donorInfo.message,
        timestamp: new Date().toISOString()
      };
      
      // Send confirmation email ONLY after successful payment
      if (payfastEmail) {
        console.log('🔄 Sending payment confirmation email...');
        sendConfirmationEmail(finalDonationData, payfastEmail, payfastName);
      } else {
        console.log('⚠️ No email available for confirmation');
      }
      
      // Clean up storage
      sessionStorage.removeItem('pendingDonation');
      localStorage.removeItem('pendingDonation');
      
      // Update state for UI
      setFinalDonationAmount(payfastAmount);
      setFinalDonationType(payfastType);
      setShowSuccess(true);
      window.scrollTo(0, 0);
      
      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 10000);
      
    } else if (paymentStatus === 'cancelled') {
      console.log('❌ PayFast Payment Cancelled');
      
      // Clean up storage on cancellation
      sessionStorage.removeItem('pendingDonation');
      localStorage.removeItem('pendingDonation');
      
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Store the final donation details
    const finalAmount = customAmount ? parseInt(customAmount) : amount;
    setFinalDonationAmount(finalAmount);
    setFinalDonationType(donationType);
    
    // For direct donations (non-PayFast), send confirmation email immediately
    if (donorInfo.email) {
      await sendConfirmationEmail({
        amount: finalAmount,
        type: donationType,
        message: donorInfo.message
      }, donorInfo.email, donorInfo.name);
    } else {
      console.log('⚠️ No email provided for direct donation');
    }
    
    // Show success message for direct donations (non-PayFast)
    setShowSuccess(true);
    
    // Reset form after 8 seconds for direct donations
    setTimeout(() => {
      setDonationType('once');
      setAmount(500);
      setCustomAmount('');
      setDonorInfo({
        name: '',
        email: '',
        message: ''
      });
      setEmailSent(false);
    }, 8000);
  };

  // If showing success message from direct donation, render the success UI
  if (showSuccess && !location.search.includes('payment=success')) {
    return (
      <main className="donate-page">
        <div className="success-message">
          <h2>Thank You for Your Generous Donation! 🎉</h2>
          <p>Your {finalDonationType === 'monthly' ? 'monthly' : 'one-time'} donation of <strong>R{finalDonationAmount}</strong> will make a significant impact.</p>
          
          {sendingEmail && (
            <div className="email-status">
              <p>📧 Sending confirmation email...</p>
            </div>
          )}
          
          {emailSent && donorInfo.email && (
            <div className="email-success">
              <p>✅ Confirmation email sent to <strong>{donorInfo.email}</strong></p>
            </div>
          )}
          
          {!emailSent && !sendingEmail && donorInfo.email && (
            <div className="email-notice">
              <p>📧 You will receive a confirmation email at <strong>{donorInfo.email}</strong></p>
            </div>
          )}
          
          {!donorInfo.email && (
            <div className="email-warning">
              <p>⚠️ No email provided - confirmation email not sent</p>
            </div>
          )}
          
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
          
          {sendingEmail && (
            <div className="email-status">
              <p>📧 Sending payment confirmation email...</p>
            </div>
          )}
          
          {emailSent && (
            <div className="email-success">
              <p>✅ Payment confirmation email has been sent</p>
            </div>
          )}
          
          {!emailSent && !sendingEmail && (
            <div className="email-notice">
              <p>📧 Check your email for payment confirmation</p>
            </div>
          )}
          
          <button onClick={() => {
            setShowSuccess(false);
            setEmailSent(false);
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