import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../assets/Logo.png';  // Import the logo image

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Sethuse Logo" className="logo" />
        </Link>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
        <Link to="/work" onClick={() => setMobileMenuOpen(false)}>Our Work</Link>
        <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
        <Link to="/donate" className="donate-link" onClick={() => setMobileMenuOpen(false)}>Donate</Link>
    </div>

      <div className="mobile-menu-icon" onClick={toggleMenu}>
        <div className={isMobileMenuOpen ? 'bar rotate1' : 'bar'}></div>
        <div className={isMobileMenuOpen ? 'bar fade' : 'bar'}></div>
        <div className={isMobileMenuOpen ? 'bar rotate2' : 'bar'}></div>
      </div>
    </nav>
  );
};

export default NavBar;
