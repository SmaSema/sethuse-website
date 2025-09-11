// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Displays the header section for the Contact Us page,
//              including a tagline and a brief call-to-action to
//              encourage volunteering or connecting with the organization.

import React from 'react';
import '../ContactUs_page/ContactHeader.css'; // Import corresponding styles

// Functional component to display Contact Us page header
const ContactHeader = () => (
  <header className="contact-header">
    {/* Main tagline */}
    <h5>Volunteer. Connect. Empower</h5>
    
    {/* Supporting description */}
    <p>
      Whether you're ready to volunteer or simply want to connect, we're here for it.
    </p>
  </header>
);

export default ContactHeader;
