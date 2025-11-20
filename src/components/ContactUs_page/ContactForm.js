// This component renders the Contact Us form for Sethuse Community Haven.
//              Users can enter their name, email, and message to reach out to the organization.
//              The form is integrated with EmailJS to send emails directly, and displays a
//              success message on submission.

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';          // EmailJS library for sending emails
import SuccessMessage from './SuccessMessage';   // Component shown after successful submission
import '../ContactUs_page/ContactForm.css';      // Form styling

const ContactForm = () => {
  // State to track if the form was successfully submitted
  const [submitted, setSubmitted] = useState(false);

  // Reference to the form element for EmailJS
  const form = useRef();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default page reload

    // Send form data using EmailJS
    emailjs.sendForm(
      'service_w9n7c9g',    // EmailJS Service ID
      'template_fztso2r',   // EmailJS Template ID
      form.current,         // Reference to form DOM node
      'qe_h8DreeKiY6Ke-o'  // Public API Key
    )
    .then(() => {
      setSubmitted(true);   // Show success message
    })
    .catch((error) => {
      console.error('Email sending error:', error);
      alert('Something went wrong. Try again later.');
    });
  };

  // Render either the success message or the contact form
  return submitted ? (
    <SuccessMessage /> // Display after successful submission
  ) : (
    <div className="contact-section">
      <div className="form-image-wrapper">

        {/* Contact Form */}
        <form
          ref={form} 
          className="contact-form" 
          data-aos="fade-left" // Animation on scroll
          onSubmit={handleSubmit}
        >
          {/* User name input */}
          <input type="text" name="name" placeholder="Your Name" required />
          
          {/* User email input */}
          <input type="email" name="email" placeholder="Your Email" required />
          
          {/* User message input */}
          <textarea name="message" placeholder="Your Message" rows="5" required />
          
          {/* Submit button */}
          <button type="submit">Send Message</button>
        </form>

        {/* Side image next to the form - now using public folder path */}
        <div className="form-side-image">
          <img src="/assets/contact-side.png" alt="Contact Visual" />
        </div>

      </div>
    </div>
  );
};

export default ContactForm;