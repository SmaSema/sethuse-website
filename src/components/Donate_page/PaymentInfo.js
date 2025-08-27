import React from 'react';
import './PaymentInfo.css';

const PaymentInfo = () => (
  <section className="payment-section">
    <h2 data-aos="fade-up">Secure Payment with PaySharp</h2>
    
    <p data-aos="fade-up">
      We value your generosity—and your safety. That's why we use <strong>trusted South African payment platforms like PaySharp</strong> to process donations securely and seamlessly.
      Your transaction is encrypted, private, and handled with care.
    </p>

    <ul className="paysharp-features" data-aos="fade-up">
      <li>🛡️ Fast, secure payments through PaySharp</li>
      <li>📱 Mobile-friendly and easy-to-use interface</li>
      <li>💳 Support for all major South African payment methods</li>
      <li>✅ Verified by South African financial institutions</li>
      <li>🇿🇦 Local South African payment processing</li>
    </ul>

    <p data-aos="fade-up">
      <strong>Make your impact with confidence</strong>—knowing your donation is safe with us and supports local South African businesses.
    </p>
  </section>
);

export default PaymentInfo;