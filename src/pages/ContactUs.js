// src/pages/ContactUs.js
import React from 'react';
import ContactHeader from '../components/ContactUs_page/ContactHeader';
import ContactForm from '../components/ContactUs_page/ContactForm';
import AlternateContact from '../components/ContactUs_page/AlternateContact';
import LocationMap from '../components/ContactUs_page/LocationMap'

const ContactUs = () => {
  return (
    <>
      <ContactHeader/>
      <ContactForm />
      <AlternateContact />
      <LocationMap />
    </>
  );
};

export default ContactUs;
