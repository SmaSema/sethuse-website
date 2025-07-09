import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import SuccessMessage from './SuccessMessage';
import '../ContactUs_page/ContactForm.css';
import contactImage from '/Users/smang/sethuse-website/src/assets/contact-side.png';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_w8rs99i',     // Service ID
      'template_tuj4z5h',    // Template ID
      form.current,
      'X7kJOYaPQLxoiiMGv'      // Public Key
    )
    .then(() => {
      setSubmitted(true); // Show success message
    })
    .catch((error) => {
      console.error('Email sending error:', error);
      alert('Something went wrong. Try again later.');
    });
  };

  return submitted ? (
    <SuccessMessage />
  ) : (
    <div className="contact-section">
      <div className="form-image-wrapper">
        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="5" required />
          <button type="submit">Send Message</button>
        </form>
        <div className="form-side-image">
          <img src={contactImage} alt="Contact Visual" />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
