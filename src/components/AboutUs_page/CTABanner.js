import React from 'react';
import '../AboutUs_page/CTABanner.css'; // optional: separate CSS for styling

const CTABanner = () => {
  return (
    <section className="cta-banner">
      <h2>Be Part of the Change</h2>
      <hr className="divider" />
      <p>Your support helps us grow stronger communities.</p>
      <button onClick={() => window.location.href = '/donate'}>
        Donate Now
      </button>
    </section>
  );
};

export default CTABanner;
