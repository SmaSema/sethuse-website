import React from 'react';
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
}) => (
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
          type="text" 
          placeholder="Other amount" 
          value={customAmount}
          onChange={handleCustomAmountChange}
        />
      </div>
    </div>
    
    <div className="donor-form-container">
      <h2>Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={donorInfo.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={donorInfo.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="message"
            placeholder="Message (optional)"
            value={donorInfo.message}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit" className="donate-button2">
          {donationType === 'monthly' ? 'Donate Monthly' : 'Donate Now'}
        </button>
      </form>
    </div>
  </div>
);

export default DonationForm;