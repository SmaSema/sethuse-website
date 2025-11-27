//   src/App.js
//   This is the main entry point of the Sethuse Community Haven website.
//   It sets up routing using React Router, global components (NavBar, Footer),
//   scroll behavior, and page animations using AOS (Animate On Scroll).

import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Change to HashRouter

// Global Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton';
import Loading from './components/Loading/Loading';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWork from './pages/OurWork';
import ContactUs from './pages/ContactUs';
import Donate from './pages/Donate';
import Admin from './pages/Admin';
import DonateSuccess from './pages/DonateSuccess';
import DonateCancel from './pages/DonateCancel';

// AOS library for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [appLoading, setAppLoading] = useState(true);

  // Initialize AOS library once when App mounts
  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      AOS.init({ 
        duration: 1000, // Animation duration in ms
        once: true      // Animation doesnt repeat when elements enter viewport again
      });
      setAppLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return (
      <div className="app-loading">
        <Loading 
          type="pulse" 
          size="large" 
          text="Loading Sethuse Community Haven..." 
          overlay={true}
        />
        <div className="app-loading-content">
          <img src="/logo.png" alt="Sethuse Logo" className="app-loading-logo" />
          <h2>Sethuse Community Haven</h2>
          <p>Empowering communities, transforming lives</p>
        </div>
      </div>
    );
  }

  return (
    <Router> {/* This now uses HashRouter - no other changes needed */}
      {/* ScrollToTop component ensures each new page opens at top */}
      <ScrollToTop />  

      {/* Main layout container: vertical flex layout for sticky footer */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Navigation bar, visible on all pages */}
        <NavBar />

        {/* Main content area */}
        <main style={{ flex: 1 }}>
          <Routes>
            {/* Define routes for all pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/work" element={<OurWork />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/donate/success" element={<DonateSuccess />} />
            <Route path="/donate/cancel" element={<DonateCancel />} />
          </Routes>
        </main>

        {/* Footer, visible on all pages */}
        <Footer />
      </div>

      {/* Scroll-to-top button for user convenience */}
      <ScrollToTopButton />
    </Router>
  );
}

export default App;