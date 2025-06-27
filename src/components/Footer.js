// src/components/Footer.js

import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Logo or name */}
        <div className="footer-logo">
          <h2>Sethuse</h2>
          <p>Empowering communities, transforming lives.</p>
        </div>

        {/* Middle: Quick links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#donate">Donate</a></li>
          </ul>
        </div>

        {/* Right: Social media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><span>🌐</span></a>
            <a href="#"><span>📘</span></a>
            <a href="#"><span>🐦</span></a>
            <a href="#"><span>📸</span></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sethuse Community Haven. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
