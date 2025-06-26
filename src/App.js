// src/App.js

import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <NavBar />
      <main style={{ padding: '2rem' }}>
        <h1>Welcome to Sethuse Community Haven</h1>
        <p>This is your homepage content.</p>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
