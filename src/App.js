// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description:
//   This is the main entry point of the Sethuse Community Haven website.
//   It sets up routing using React Router, global components (NavBar, Footer),
//   scroll behavior, and page animations using AOS (Animate On Scroll).


import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Change to HashRouter

// Global Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWork from './pages/OurWork';
import ContactUs from './pages/ContactUs';
import Donate from './pages/Donate';
import Admin from './pages/Admin';

// AOS library for animations
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  // Initialize AOS library once when App mounts
  useEffect(() => {
    AOS.init({ 
      duration: 1000, // Animation duration in ms
      once: false      // Animation repeats when elements enter viewport again
    });
  }, []);

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