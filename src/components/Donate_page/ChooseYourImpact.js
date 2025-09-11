import React from 'react';
import './ChooseYourImpact.css';

const ChooseYourImpact = ({ donationType, setDonationType }) => (
  <section id="choose-impact-section" className="donation-options">
    <h2>Choose Your Impact</h2>
    <div className="options">
      <div 
        className={`option-card ${donationType === 'once' ? 'selected' : ''}`}
        onClick={() => setDonationType('once')}
      >
        <h3>Once-Off</h3>
        <p>Make a single donation to support a specific initiative. Your one-time contribution makes an immediate impact.</p>
        <button>Donate Once</button>
      </div>
      <div 
        className={`option-card ${donationType === 'monthly' ? 'selected' : ''}`}
        onClick={() => setDonationType('monthly')}
      >
        <h3>Monthly</h3>
        <p>Become a regular donor and help us plan long-term programs. Consistent support allows us to create sustainable change.</p>
        <button>Donate Monthly</button>
      </div>
    </div>
  </section>
);

export default ChooseYourImpact;