import './PaymentSection.css';

const PaymentSection = () => (
  <section className="payment-section" id="payment-section">
    <h2>Secure Payment with Ozow</h2>
    
    <p>
      We value your generosity—and your safety. That’s why we use <strong>trusted platforms like Ozow</strong> to process donations securely and seamlessly.
      Your transaction is encrypted, private, and handled with care.
    </p>

    <ul className="ozow-features">
      <li>🛡️ Fast, secure payments through Ozow</li>
      <li>📱 Mobile-friendly and easy-to-use interface</li>
      <li>💳 No need to share card details directly—Ozow connects to your bank securely</li>
      <li>✅ Verified by South African financial institutions</li>
    </ul>

    <p>
      <strong>Make your impact with confidence</strong>—knowing your donation is safe with us.
    </p>

    <button className="ozow-button">Donate via Ozow</button>
  </section>
);

export default PaymentSection;
