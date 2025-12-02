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
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.4433104377235!2d30.3347068!3d-29.6779245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6a2a8538110d1%3A0x307b356917d4522e!2s516%20T6%2C%20Edendale%20T%2C%20Pietermaritzburg%2C%203217!5e0!3m2!1sen!2sza!4v1764682875775!5m2!1sen!2sza" 
      width="100%" 
      height="300" 
      allowfullscreen
      loading="lazy" 
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
);

export default LocationMap;