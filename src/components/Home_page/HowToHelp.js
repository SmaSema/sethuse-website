// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: This React component displays different ways users can support 
//              Sethuse Community Haven. It includes options for volunteering, 
//              making donations, and sharing the organization’s mission via 
//              social platforms. It also provides a copy-to-clipboard feature 
//              for easy sharing.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home_page/HowToHelp.css';

// List of help options (excluding social sharing card)
const helpOptions = [
  {
    title: 'Volunteer Your Time',
    description: 'Join our hands-on initiatives and make a direct impact in the community.',
    icon: '🙌',
    link: '/contact',
  },
  {
    title: 'Make a Donation',
    description: 'Support our programs financially and help us reach more lives.',
    icon: '💸',
    link: '/donate',
  },
];

const HowToHelp = () => {
  // Capture the current page URL to share
  const shareLink = window.location.href; 

  // State variable to show/hide tooltip on share card
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Function: Copies the link to clipboard for manual sharing
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };

  // Function: Displays tooltip when user clicks the share card background
  const handleCardClick = (e) => {
    // Exclude internal buttons/links inside the card
    if (!e.target.closest('a') && !e.target.closest('button')) {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 5000); // hide tooltip after 5s
    }
  };

  return (
    <section className="help-section">
      {/* Section Heading */}
      <h2 className="help-title" data-aos="fade-up">How You Can Help</h2>
      <hr className="divider-work" data-aos="fade-up" />

      {/* Help options grid */}
      <div className="help-grid" data-aos="fade-up">

        {/* First two cards: Volunteer & Donation */}
        {helpOptions.map((option, index) => (
          <Link to={option.link} key={index} className="help-card">
            <span className="help-icon">{option.icon}</span>
            <h3 className="help-heading">{option.title}</h3>
            <p className="help-description">{option.description}</p>
          </Link>
        ))}

        {/* Third card: Spread the Word (Social Sharing) */}
        <div className="help-card" onClick={handleCardClick}>
          <span className="help-icon">📢</span>
          <h3 className="help-heading">Spread the Word</h3>
          <p className="help-description">
            Share our mission and help us grow our support network.
          </p>

          {/* Social media sharing buttons */}
          <div className="share-buttons">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=Check out Sethuse Community Haven! ${shareLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button"
            >
              WhatsApp
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/search/top?q=sethuse%20community%20haven`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-button"
            >
              Facebook
            </a>

            {/* Instagram (direct link to profile) */}
            <a
              href="https://www.instagram.com/sethuse_community_haven_npo/"
              target="_blank"
              rel="noopener noreferrer"
              className="share-button"
            >
              Instagram
            </a>


            {/* Copy Link Button */}
            <button onClick={copyToClipboard} className="share-button">
              Copy Link
            </button>
          </div>

          {/* Tooltip shown when user clicks outside the buttons */}
          {tooltipVisible && (
            <span className="card-tooltip">
              Please select your preferred method of sharing
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

// Exporting component so it can be reused in other parts of the project
export default HowToHelp;
