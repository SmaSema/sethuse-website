// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: Embeds a Google Maps iframe showing the
//              physical location of Sethuse Community Haven.
//              Used on the Contact Us page to help users
//              locate the organization easily.

import React from 'react';
import '../ContactUs_page/LocationMap.css'; // Import corresponding styles

// Functional component to display the embedded Google Map
const LocationMap = () => (
  <div className="location-map">
    <iframe  
      // Inline frame to embed Google Map
      title="Sethuse Location"
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d30206.656122242188!2d30.341632811970253!3d-29.619433147351828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s516%20Shembe%20Road%20Unit%2018%20Imbali%20Pietermaritzburg%203201!5e0!3m2!1sen!2sza!4v1755096439380!5m2!1sen!2sza"
      allowFullScreen  // Allows fullscreen viewing
      loading="lazy"   // Improves performance by lazy-loading
      referrerPolicy="no-referrer-when-downgrade" // Security policy
    />
  </div>
);

export default LocationMap;
