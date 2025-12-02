//              Displays a confirmation message after a user
//              successfully submits the contact form. Includes
//              heading and paragraph styling from CSS.


import React from 'react';
import '../ContactUs_page/SuccessMessage.css'; // Import corresponding styles

// Functional component to display a success message
const SuccessMessage = () => (
  <div className="success-message">
    {/* Heading for confirmation */}
    <h2>Thanks!</h2>
    
    {/* Informative paragraph */}
    <p>Your message was sent successfully. We’ll be in touch soon.</p>
  </div>
);

export default SuccessMessage;
