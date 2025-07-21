// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurWork from './pages/OurWork';
import ContactUs from './pages/ContactUs';
import Donate from './pages/Donate';
import AOS from 'aos'; // Importing AOS library (for animation )
import 'aos/dist/aos.css'; // Make sure to import AOS styles
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTop/ScrollToTopButton'; //Button

function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: false });
  }, []);

  return (
    <Router>
      <ScrollToTop />  {/* Scroll to top on new-page open */}

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/work" element={<OurWork />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <ScrollToTopButton />
    </Router>
  );
}

export default App;
