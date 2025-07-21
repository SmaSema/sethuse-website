import React, { useState, useEffect } from 'react';  // added useEffect
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import Logo from '../assets/Logo.png';

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);  // new state

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // change 50 to your scroll threshold
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <NavLink to="/" onClick={closeMenu}>
          <img src={Logo} alt="Sethuse Logo" className="logo" />
        </NavLink>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>About Us</NavLink>
        <NavLink to="/work" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Our Work</NavLink>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Contact Us</NavLink>
        <NavLink to="/donate" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link donate-link' : 'donate-link'}>Donate</NavLink>
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
