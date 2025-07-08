import React from 'react';
import '../ContactUs_page/LocationMap.css';

const LocationMap = () => (
  <div className="location-map">
    <iframe
      title="Sethuse Location"
      src="https://maps.google.com/maps?q=Johannesburg&t=&z=13&ie=UTF8&iwloc=&output=embed"
      allowFullScreen
    />
  </div>
);

export default LocationMap;
