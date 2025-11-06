import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Donate.css';

const DonateSuccess = () => {
  const [donationDetails, setDonationDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve donation details from storage
    const retrieveDonationDetails = () => {
      console.log('Retrieving donation details from storage...');
      
      // Try sessionStorage first (most reliable for this session)
      const sessionDonation = sessionStorage.getItem('lastDonation');
      console.log('Session storage data:', sessionDonation);
      
      if (sessionDonation) {
        try {
          const details = JSON.parse(sessionDonation);
          console.log('Parsed session details:', details);
          setDonationDetails(details);
          
          // Clean up session storage after retrieving
          sessionStorage.removeItem('lastDonation');
        } catch (error) {
          console.error('Error parsing session storage:', error);
        }
      } else {
        // Fallback to localStorage
        const localDonation = localStorage.getItem('lastDonation');
        console.log('Local storage data:', localDonation);
        
        if (localDonation) {
          try {
            const details = JSON.parse(localDonation);
            console.log('Parsed local details:', details);
            setDonationDetails(details);
          } catch (error) {
            console.error('Error parsing local storage:', error);
          }
        }
      }
      
      setLoading(false);
    };

    retrieveDonationDetails();
  }, []);

  const formatAmount = (amount) => {
    if (!amount) return '0.00';
    return parseFloat(amount).toFixed(2);
  };

  const getDonationTypeText = (type) => {
    return type === 'monthly' ? 'Monthly Subscription' : 'One-Time Donation';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return new Date().toLocaleDateString();
    return new Date(timestamp).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <main className="donate-page">
        <div className="success-message">
          <div className="loading-spinner">Loading your donation details...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="donate-page">
      <div className="success-message">
        <div className="success-icon">🎉</div>
        <h2>Thank You for Your Generous Support!</h2>
        
        {donationDetails ? (
          <>
            <div className="donation-confirmation">
              Your {getDonationTypeText(donationDetails.type).toLowerCase()} of 
              <strong> R{formatAmount(donationDetails.amount)} </strong> 
              was successfully processed!
            </div>

            <div className="donation-summary">
              <h3>Donation Details</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Amount Donated:</span>
                  <span className="value">R{formatAmount(donationDetails.amount)}</span>
                </div>
                
                <div className="summary-item">
                  <span className="label">Donation Type:</span>
                  <span className="value">{getDonationTypeText(donationDetails.type)}</span>
                </div>
                
                {donationDetails.donor && donationDetails.donor !== 'Donor' && (
                  <div className="summary-item">
                    <span className="label">Donor Name:</span>
                    <span className="value">{donationDetails.donor}</span>
                  </div>
                )}
                
                {donationDetails.email && (
                  <div className="summary-item">
                    <span className="label">Email:</span>
                    <span className="value">{donationDetails.email}</span>
                  </div>
                )}
                
                <div className="summary-item">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(donationDetails.timestamp)}</span>
                </div>
                
                {donationDetails.message && (
                  <div className="summary-item full-width">
                    <span className="label">Your Message:</span>
                    <span className="value">"{donationDetails.message}"</span>
                  </div>
                )}
              </div>
            </div>

            <div className="impact-message">
              <h4>Your Impact</h4>
              <p>
                Your generous contribution will help us continue our mission of empowering communities 
                through education, health, and development programs in the Imbali community.
              </p>
            </div>
          </>
        ) : (
          <div className="donation-confirmation">
            Your donation was successfully processed! Thank you for your generous support.
          </div>
        )}

        <div className="next-steps">
          <h4>What Happens Next?</h4>
          <ul>
            <li>✓ You will receive a confirmation email shortly</li>
            <li>✓ Your donation will be put to work immediately</li>
            <li>✓ We'll keep you updated on the impact of your contribution</li>
            {donationDetails?.type === 'monthly' && (
              <li>✓ Your monthly subscription is now active</li>
            )}
          </ul>
        </div>

        <div className="success-actions">
          <Link to="/" className="back-button">
            Return to Homepage
          </Link>
          <Link to="/donate" className="donate-again-button">
            Make Another Donation
          </Link>
          
        </div>

        <div className="thank-you-note">
          <p>
            <strong>From the entire Sethuse Community Haven team:</strong><br />
            Thank you for believing in our mission and helping us transform lives in our community.
          </p>
        </div>
      </div>
    </main>
  );
};

export default DonateSuccess;