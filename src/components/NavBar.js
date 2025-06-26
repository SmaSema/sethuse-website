// src/components/NavBar.js

import React, { useState } from 'react';
import './NavBar.css';
import logo from '../assets/Logo.png'; // adjust the path if your logo is elsewhere

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        <img src={logo} alt="Sethuse Logo" />
      </a>

      <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#home">Home</a>
        <a href="#programs">Programs</a>
        <a href="#events">Events</a>
        <a href="#contact">Contact</a>
        <a href="#donate" className="highlight">Donate</a>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default NavBar;
