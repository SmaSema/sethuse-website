// 
// Author: Smangalene Charles Sema
// Date: 5 September 2025
// Description:
//   The "Contact Us" page for Sethuse Community Haven.
//   This page allows users to reach out to the organization through
//   a contact form, view alternative contact information, and 
//   locate the organization's physical address on Google Maps.


import React from 'react';
import ContactHeader from '../components/ContactUs_page/ContactHeader';
import ContactForm from '../components/ContactUs_page/ContactForm';
import AlternateContact from '../components/ContactUs_page/AlternateContact';
import LocationMap from '../components/ContactUs_page/LocationMap';

const ContactUs = () => {
  return (
    <>
      {/* Header section with tagline and short description */}
      <ContactHeader />

      {/* Contact form where users can send messages directly */}
      <ContactForm />

      {/* Alternative contact options (email, phone, WhatsApp) */}
      <AlternateContact />

      {/* Google Maps location of Sethuse Community Haven */}
      <LocationMap />
    </>
  );
};

export default ContactUs;
