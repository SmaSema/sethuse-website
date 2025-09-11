// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Displays a testimonial section for the Our Work page.
//              Includes a quote from a community member with attribution
//              and animation on scroll using AOS library.

import React from 'react';
import '../OurWork_page/Testimonial.css'; // Import CSS for styling

// Functional component to display testimonial
function Testimonial() {
  return (
    <section className="testimonial-section">
      
      {/* Single testimonial card */}
      <div className="testimonial-card" data-aos="fade-down">
        
        {/* Quote from a community member */}
        <p className="quote">“Sethuse gave me the courage to dream again.”</p>
        
        {/* Attribution of the quote */}
        <span className="attribution">— Community Member</span>
      </div>
    </section>
  );
}

// Export the component to be used in other parts of the application
export default Testimonial;
