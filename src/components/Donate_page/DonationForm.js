import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import { initiatePayFastPayment, validatePaymentData } from '../../utils/payfastService';
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

  const handlePayFastSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors([]);

    // Get final amount
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    // Validate amount
    if (isNaN(finalAmount) || finalAmount <= 0) {
      setErrors(['Please enter a valid donation amount']);
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
      custom_str1: donorInfo.message || `Donation from ${donorInfo.name}`
    };

    // Validate data
    const validation = validatePaymentData(paymentData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsProcessing(false);
      return;
    }

    try {
      // Store donation details in sessionStorage before redirect
      const donationDetails = {
        amount: finalAmount,
        type: donationType,
        donor: donorInfo.name,
        email: donorInfo.email,
        message: donorInfo.message,
        timestamp: new Date().toISOString(),
        item_name: paymentData.item_name
      };
      
      console.log('Storing donation details:', donationDetails);
      sessionStorage.setItem('lastDonation', JSON.stringify(donationDetails));
      
      // Also store in localStorage as backup
      localStorage.setItem('lastDonation', JSON.stringify(donationDetails));
      
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Initiate PayFast payment
      await initiatePayFastPayment(paymentData, donationType);
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setErrors(['Failed to process payment. Please try again.']);
      setIsProcessing(false);
      
      // Clean up storage on error
      sessionStorage.removeItem('lastDonation');
      localStorage.removeItem('lastDonation');
    }
  };

  if (isProcessing) {
    return (
      <div className="donation-container">
        <div className="donation-loading">
          <Loading 
            type="pulse" 
            size="large" 
            text="Processing your donation..." 
          />
          <div className="processing-steps">
            <div className="step active">
              <span className="step-number">1</span>
              <span className="step-text">Validating donation details</span>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <span className="step-text">Redirecting to secure payment</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-text">Completing transaction</span>
            </div>
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
          </div>
          
          <button 
            type="submit" 
            className="donate-button2"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loading type="dots" size="small" text="" />
            ) : (
              donationType === 'monthly' ? 'Donate Monthly via PayFast' : 'Donate Now via PayFast'
            )}
          </button>
        </form>

        <div className="security-badge">
          <p>🔒 Secure payment by PayFast Sandbox</p>
          <p><small>This is a test environment</small></p>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;