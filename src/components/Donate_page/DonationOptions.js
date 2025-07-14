import './DonationOptions.css'

const DonationOptions = () => (
  <section className="donation-options">
    <h2>Choose Your Impact</h2>
    <div className="options">
      <div className="option-card">
        <h3>Once-Off</h3>
        <p>Make a single donation to support a specific initiative.</p>
        <button>Donate Once</button>
      </div>
      <div className="option-card">
        <h3>Monthly</h3>
        <p>Become a regular donor and help us plan long-term programs.</p>
        <button>Donate Monthly</button>
      </div>
    </div>
  </section>
);

export default DonationOptions;
