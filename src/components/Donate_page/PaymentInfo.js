import React from 'react';
import './PaymentInfo.css';

const PaymentInfo = () => (
  <section className="payment-section">
    <h2 data-aos="fade-up">Secure Payment with Paystack</h2>
    
    <p data-aos="fade-up">
      We value your generosity—and your safety. That's why we use <strong>Paystack</strong> to process donations securely and seamlessly.
      Your transaction is encrypted, private, and handled with care.
    </p>

    <ul className="paystack-features" data-aos="fade-up">
      <li>🛡️ Fast, secure payments through Paystack</li>
      <li>📱 Mobile-friendly and easy-to-use interface</li>
      <li>💳 Support for all major payment methods</li>
      <li>✅ Verified by financial institutions</li>
      <li>🌍 International payment processing</li>
    </ul>

    <p data-aos="fade-up">
      <strong>Make your impact with confidence</strong>—knowing your donation is safe with us.
    </p>
  </section>
);

export default PaymentInfo;