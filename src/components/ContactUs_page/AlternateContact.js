// This component provides alternate contact methods for 
//              Sethuse Community Haven, including email, phone, and WhatsApp.
//              It is intended to supplement the main contact form, offering
//              quick ways to reach the organization.

import React from 'react';
import '../ContactUs_page/AlternateContact.css'; // CSS file for styling the alternate contact section

const AlternateContact = () => (
  <section className="alt-contact-section">
    
    {/* Container for contact information with scroll animation */}
    <div className="alt-contact" data-aos="fade-down">

      {/* Email contact */}
      <p>
        Email: <a href="mailto:zungusinqobiley@gmail.com">
                zungusinqobiley@gmail.com
              </a>
      </p>

      {/* Phone contact */}
      <p>
        Phone: <a href="tel:0676445955">067 644 5955</a>
      </p>

      {/* WhatsApp contact */}
      <p>
        WhatsApp: 
        <a 
          href="https://wa.me/27676445955" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Chat Now
        </a>
      </p>

    </div>
  </section>
);

export default AlternateContact;
