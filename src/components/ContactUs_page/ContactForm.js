import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import SuccessMessage from './SuccessMessage';
import '../ContactUs_page/ContactForm.css';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading state

    // Get credentials from environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Validate environment variables
    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are not properly configured');
      alert('Form configuration error. Please contact support.');
      setIsLoading(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setSubmitted(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Email sending error:', error);
        alert('Something went wrong. Try again later.');
        setIsLoading(false);
      });
  };

  return submitted ? (
    <SuccessMessage />
  ) : (
    <div className="contact-section">
      <div className="form-image-wrapper">
        <form
          ref={form}
          className="contact-form"
          data-aos="fade-left"
          onSubmit={handleSubmit}
        >
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="5" required />
          
          {/* Updated button with loading state */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="form-side-image">
          <img src="/assets/contact-side.png" alt="Contact Visual" />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;