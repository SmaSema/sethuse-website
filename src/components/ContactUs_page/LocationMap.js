// Embeds a Google Maps iframe showing the
//              physical location of Sethuse Community Haven.
//              Used on the Contact Us page to help users
//              locate the organization easily.

import React from 'react';
import '../ContactUs_page/LocationMap.css'; // Import corresponding styles

// Functional component to display the embedded Google Map
const LocationMap = () => (
  <div className="location-map">
    <iframe  
      title="Sethuse Location"
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d30200.000000000000!2d30.338000000000000!3d-29.650000000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s516%20T6%20Edendale%20T,%20Pietermaritzburg%20South%20Africa!5e0!3m2!1sen!2sza!4v1755096439380!5m2!1sen!2sza"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default LocationMap;