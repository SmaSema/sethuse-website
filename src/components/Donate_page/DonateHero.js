import '../Donate_page/DonateHero.css';

const DonateHero = () => {
  const handleScrollToImpact = () => {
    const target = document.getElementById('choose-impact-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="donateHero">
      <h6>Support Our Mission</h6>
      <p>Your donation helps us empower communities through education, health, and development programs.</p>
      <button className="donate-button" onClick={handleScrollToImpact}>
        Donate Now
      </button>
    </section>
  );
};

export default DonateHero;