// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Events from './pages/Events';
import Donate from './pages/Donate';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
