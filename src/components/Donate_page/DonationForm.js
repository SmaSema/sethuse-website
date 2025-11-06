import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import { initiatePayFastPayment, validatePaymentData } from '../../utils/payfastService';
import emailjs from '@emailjs/browser';
import './DonationForm.css';

const DonationForm = ({ 
  donationType, 
  amount, 
  customAmount, 
  donorInfo, 
  handleAmountSelect, 
  handleCustomAmountChange, 
  handleInputChange, 
  handleSubmit 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState([]);

  // Debug environment variables
  const debugEmailJSConfig = () => {
    console.log('🔧 EmailJS Configuration:');
    console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.REACT_APP_EMAILJS_DONATION_TEMPLATE_ID);
    console.log('Public Key:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing');
    
    const allSet = process.env.REACT_APP_EMAILJS_SERVICE_ID && 
                   process.env.REACT_APP_EMAILJS_DONATION_TEMPLATE_ID && 
                   process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    console.log('All EmailJS variables set:', allSet);
  };

  // Function to send donation confirmation email - ONLY called after successful payment
  const sendDonationConfirmationEmail = async (donationData) => {
    try {
      // Debug first
      debugEmailJSConfig();
      
      if (!donationData.email) {
        console.log('❌ No email address provided for confirmation');
        return false;
      }

      console.log('📧 Sending payment confirmation email to:', donationData.email);
      
      // Use EXACT variable names that match your EmailJS template
      const templateParams = {
        // These must match your template variables exactly
        name: donationData.donor || 'Valued Supporter',
        email: donationData.email,
        amount: donationData.amount,
        donation_type: donationData.type === 'monthly' ? 'Monthly Donation' : 'One-time Donation',
        date: new Date().toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        donation_id: `SETH-${Date.now()}`,
        message: donationData.message || 'No additional message provided.',
        
        // Optional: keep these for the email headers
        to_email: donationData.email,
        from_name: 'Sethuse Community Haven'
      };

      console.log('📤 Payment confirmation email params:', templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_DONATION_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log('✅ Payment confirmation email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('❌ Failed to send payment confirmation email:', {
        message: error.text || error.message,
        status: error.status,
        fullError: error
      });
      return false;
    }
  };

  const handlePayFastSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors([]);

    // Debug environment variables on submit
    debugEmailJSConfig();

    // Validate required fields
    if (!donorInfo.name || !donorInfo.email) {
      setErrors(['Please fill in all required fields']);
      setIsProcessing(false);
      return;
    }

    // Get final amount
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    // Validate amount
    if (isNaN(finalAmount) || finalAmount <= 0) {
      setErrors(['Please enter a valid donation amount']);
      setIsProcessing(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorInfo.email)) {
      setErrors(['Please enter a valid email address']);
      setIsProcessing(false);
      return;
    }

    // Prepare payment data
    const paymentData = {
      amount: finalAmount.toFixed(2),
      item_name: `${donationType === 'monthly' ? 'Monthly' : 'Once-Off'} Donation - Sethuse Community Haven`,
      name_first: donorInfo.name.split(' ')[0] || 'Donor',
      name_last: donorInfo.name.split(' ').slice(1).join(' ') || '',
      email_address: donorInfo.email,
      custom_str1: donorInfo.message || `Donation from ${donorInfo.name}`,
      return_url: `${window.location.origin}/#/donate?payment=success&email=${encodeURIComponent(donorInfo.email)}&amount=${finalAmount}&name=${encodeURIComponent(donorInfo.name)}&type=${donationType}`,
      cancel_url: `${window.location.origin}/#/donate?payment=cancelled`,
      notify_url: `${window.location.origin}/api/payfast-notify`
    };

    // Validate data
    const validation = validatePaymentData(paymentData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsProcessing(false);
      return;
    }

    try {
      // Store donation details for email sending AFTER successful payment
      const donationDetails = {
        amount: finalAmount,
        type: donationType,
        donor: donorInfo.name,
        email: donorInfo.email,
        message: donorInfo.message,
        timestamp: new Date().toISOString()
      };
      
      console.log('💾 Storing donation details for post-payment email:', donationDetails);
      
      // Store in session storage - this will be used in Donate.js after PayFast return
      sessionStorage.setItem('pendingDonation', JSON.stringify(donationDetails));
      localStorage.setItem('pendingDonation', JSON.stringify(donationDetails)); // Backup
      
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Initiate PayFast payment - NO email sent here
      console.log('🔄 Initiating PayFast payment (email will be sent after payment)...');
      await initiatePayFastPayment(paymentData, donationType);
      
    } catch (error) {
      console.error('❌ Payment initiation failed:', error);
      setErrors(['Failed to process payment. Please try again.']);
      setIsProcessing(false);
      
      // Clean up storage on error
      sessionStorage.removeItem('pendingDonation');
      localStorage.removeItem('pendingDonation');
    }
  };

  if (isProcessing) {
    return (
      <div className="donation-container">
        <div className="donation-loading">
          <Loading 
            type="pulse" 
            size="large" 
            text="Redirecting to secure payment..." 
          />
          <div className="processing-steps">
            <div className="step active">
              <span className="step-number">1</span>
              <span className="step-text">Validating donation details</span>
            </div>
            <div className="step active">
              <span className="step-number">2</span>
              <span className="step-text">Preparing secure payment</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-text">Redirecting to PayFast</span>
            </div>
          </div>
          
          <div className="email-notice">
            <p>🔒 You will be redirected to PayFast for secure payment</p>
            <p className="donor-email">Confirmation email will be sent after payment</p>
            <small>Please complete the payment process</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="donation-container">
      <div className="donation-selection">
        <h2>Select Amount</h2>
        
        <div className="amount-options">
          {[100, 250, 500, 1000, 2500, 5000].map(amt => (
            <div 
              key={amt}
              className={`amount-option ${amount === amt && !customAmount ? 'selected' : ''}`}
              onClick={() => handleAmountSelect(amt)}
            >
              R{amt}
            </div>
          ))}
        </div>
        
        <div className="custom-amount">
          <div className="currency-symbol">R</div>
          <input 
            type="number" 
            placeholder="Other amount" 
            value={customAmount}
            onChange={handleCustomAmountChange}
            min="1"
            step="1"
            disabled={isProcessing}
          />
        </div>

        <div className="payment-info">
          <p><strong>Payment Method:</strong> PayFast Sandbox</p>
          <p><small>🔒 Secure test environment - no real payments</small></p>
          <p><small>Use test card: 4000000000000002</small></p>
        </div>
      </div>
      
      <div className="donor-form-container">
        <h2>Your Information</h2>
        
        {errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <div key={index} className="error-message">
                {error}
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handlePayFastSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={donorInfo.name}
              onChange={handleInputChange}
              required
              disabled={isProcessing}
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={donorInfo.email}
              onChange={handleInputChange}
              required
              disabled={isProcessing}
            />
            <small className="email-note">
              Confirmation email will be sent after successful payment
            </small>
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="message"
              placeholder="Message (optional)"
              value={donorInfo.message}
              onChange={handleInputChange}
              disabled={isProcessing}
            />
            <small className="message-note">
              Add a dedication or message for your donation
            </small>
          </div>
          
          <button 
            type="submit" 
            className="donate-button2"
            disabled={isProcessing || !donorInfo.name || !donorInfo.email}
          >
            {isProcessing ? (
              <Loading type="dots" size="small" text="" />
            ) : (
              donationType === 'monthly' ? 'Donate Monthly via PayFast' : 'Donate Now via PayFast'
            )}
          </button>
        </form>

        <div className="confirmation-info">
          <div className="info-item">
            <span className="icon">📧</span>
            <span>Confirmation email sent after payment</span>
          </div>
          <div className="info-item">
            <span className="icon">🔒</span>
            <span>Secure payment by PayFast Sandbox</span>
          </div>
        </div>

        <div className="security-badge">
          <p><strong>Test Environment</strong></p>
          <p><small>No real payments processed</small></p>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;