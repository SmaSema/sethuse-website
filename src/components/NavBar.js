// src/components/NavBar.js

import React, { useState } from 'react';
import './NavBar.css';

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Sethuse</div>

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
