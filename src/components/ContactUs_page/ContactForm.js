import React, { useState } from 'react';
import SuccessMessage from './SuccessMessage';
import '../ContactUs_page/ContactForm.css';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Simulate submission
  };

  return submitted ? (
    <SuccessMessage />
  ) : (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" rows="5" required />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactForm;
