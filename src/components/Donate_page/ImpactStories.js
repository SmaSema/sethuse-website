import './ImpactStories.css'

const ImpactStories = () => (
  <section className="impact-stories">
    <h2>How Your Donation Helps</h2>
    <div className="stories-grid">
      {['Education', 'Health', 'Development'].map((title, index) => (
        <div className="story-card" key={index}>
          <img src={`/images/${title.toLowerCase()}.jpg`} alt={`${title} Program`} />
          <h3>{title}</h3>
          <p>{title === 'Education' ? 'Fund school supplies and mentorship for learners.' :
              title === 'Health' ? 'Support mobile clinics and wellness workshops.' :
              'Enable skills training and sustainable projects.'}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ImpactStories;
