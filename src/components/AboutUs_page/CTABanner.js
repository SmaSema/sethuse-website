import React from 'react';
import '../AboutUs_page/CTABanner.css'; // optional: separate CSS for styling

const CTABanner = () => {
  return (
    <section className="cta-wrapper">
      <div className="cta-banner" data-aos="fade-left">
        <h2>Be Part of the Change</h2>
        <hr className="divider" />
        <p>Your support helps us grow stronger communities.</p>
        <button onClick={() => window.location.href = '/contact'}>Volunteer</button>
      </div>
    </section>

  );
};

export default CTABanner;
