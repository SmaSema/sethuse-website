// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Name and Address */}
        <div className="footer-logo">
          <h2>Sethuse</h2>
          <p>Empowering communities, transforming lives.</p>
          <div className="footer-address">
            <FaMapMarkerAlt size={16} style={{ marginRight: '8px' }} />
            <span>516 Unit 18, Imbali, Pietermaritzburg, 3201</span>
          </div>
        </div>

        {/* Middle: Quick links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/work">Our Work</a></li>
            <li><a href="/donate">Donate</a></li>
          </ul>
        </div>

        {/* Right: Social media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100092553245300#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.tiktok.com/search?q=sethuse%20community%20haven&t=1751316789756" target="_blank" rel="noopener noreferrer">
              <SiTiktok size={20} />
            </a>
            <a href="https://www.instagram.com/sethuse_community_haven_npo/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
  <p>&copy; {new Date().getFullYear()} Sethuse Community Haven. All rights reserved.</p>
  <p>Reg. No: NPO 290-151 | Established: 2023</p>
</div>

    </footer>
  );
}

export default Footer;
