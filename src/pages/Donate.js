// src/pages/Donate.js
import React from 'react';

const Donate = () => (
  <div>
    <h1>Support Our Mission</h1>
    <p>Your donation helps us empower communities through education, health, and development programs.</p>
    <button
      style={{
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={() => alert('Redirect to payment gateway or donation instructions')}
    >
      Donate Now
    </button>
  </div>
);

export default Donate;
