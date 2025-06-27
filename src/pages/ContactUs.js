// src/pages/ContactUs.js
import React from 'react';

const ContactUs = () => (
  <div>
    <h1>Contact Us</h1>
    <p>We would love to hear from you! Reach out using the details below or by filling out the form.</p>
    
    <h3>Our Contact Information:</h3>
    <ul>
      <li>Email: info@sethusehaven.org</li>
      <li>Phone: +27 71 234 5678</li>
      <li>Location: 123 Community Street, Johannesburg, South Africa</li>
    </ul>

    <h3>Send us a message:</h3>
    <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
      <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <textarea placeholder="Your Message" rows="5" required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
      <button type="submit" style={{ backgroundColor: '#28a745', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
        Send Message
      </button>
    </form>
  </div>
);

export default ContactUs;
