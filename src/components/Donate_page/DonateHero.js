import '../Donate_page/DonateHero.css';

const DonateHero = () => {
  const handleScrollToPayment = () => {
    const target = document.getElementById('payment-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="donateHero">
      <h6>Support Our Mission</h6>
      <p>Your donation helps us empower communities through education, health, and development programs.</p>
      <button className="donate-button" onClick={handleScrollToPayment}>
        Donate Now
      </button>
    </section>
  );
};

export default DonateHero;
