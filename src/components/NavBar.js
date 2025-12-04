/* 
      Responsive navigation bar for the Sethuse website.
                Features include:
                - Logo linking to home
                - Nav links with active highlighting
                - Donate button styled separately
                - Mobile hamburger menu toggle
                - Scroll-based background change
*/

import React, { useState, useEffect } from 'react';  // useState for state, useEffect for scroll listener
import { NavLink } from 'react-router-dom';          // NavLink for active link highlighting
import './NavBar.css';                               // CSS for styling
import Logo from '../assets/Logo.png';               // Logo image

const NavBar = () => {
  // State for mobile menu toggle
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  // State for scroll detection to change navbar background or styles
  const [scrolled, setScrolled] = useState(false);

  // Toggle mobile menu open/close
  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // Effect hook to handle scroll-based changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Threshold: 50px
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}
    >
      {/* Logo section */}
      <div className="navbar-logo">
        <NavLink to="/" onClick={closeMenu} className="logo-container">
          <img src={Logo} alt="Sethuse Logo" className="logo" />
          <span className="logo-text">Sethuse Community Haven</span>
        </NavLink>
      </div>

      {/* Navigation links */}
      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* Active link styling handled by NavLink */}
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
          Home
        </NavLink>
        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
          About Us
        </NavLink>
        <NavLink to="/work" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
          Our Work
        </NavLink>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
          Contact Us
        </NavLink>
        <NavLink 
          to="/donate" 
          onClick={closeMenu} 
          className={({ isActive }) => isActive ? 'active-link donate-link' : 'donate-link'}
        >
          Donate
        </NavLink>
      </div>

      {/* Mobile hamburger menu icon */}
      <div className={`mobile-menu-icon ${scrolled ? 'scrolled' : ''}`} onClick={toggleMenu}>
        <div className={isMobileMenuOpen ? 'bar rotate1' : 'bar'}></div>
        <div className={isMobileMenuOpen ? 'bar fade' : 'bar'}></div>
        <div className={isMobileMenuOpen ? 'bar rotate2' : 'bar'}></div>
      </div>
    </nav>
  );
};

export default NavBar;
