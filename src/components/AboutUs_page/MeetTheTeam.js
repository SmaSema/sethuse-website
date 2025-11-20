// React component for the "Meet the Team" section of the About Us page. 
//              Displays a list of team members with their images, names, roles, and personal quotes.
//              Includes a responsive grid layout and fade-up animations using AOS library.

import React from 'react';
import '../AboutUs_page/MeetTheTeam.css'; // Import corresponding CSS

// Import team member images (adjust paths as needed)
import sinqobileImage from '../../assets/team/sinqobile.jpg';
import bridgetImage from '../../assets/team/bridget.jpg';
import nzuzoImage from '../../assets/team/nzuzo.jpg';
import sihleImage from '../../assets/team/sihle.jpg';
import ntobekoImage from '../../assets/team/ntobeko.jpg';

// Array of team members with their details including images
const team = [
  {
    name: 'Sinqobile Zungu',
    role: 'Founder',
    quote: '"Every act of kindness creates ripples that transform lives."',
    image: sinqobileImage,
  },
  {
    name: 'Bridget Godlimpi',
    quote: '"I believe in creating spaces where everyone feels they belong."',
    image: bridgetImage,
  },
  {
    name: 'Nzuzo Shelembe',
    quote: '"Empowering people starts with listening to their stories."',
    image: nzuzoImage,
  },
  {
    name: 'Sihle Mthembu',
    quote: '"Building bridges between communities is my passion and purpose."',
    image: sihleImage,
  },
  {
    name: 'Ntobeko Dlamini',
    quote: '"Small actions, when multiplied, can change the world."',
    image: ntobekoImage,
  },
];

const MeetTheTeam = () => {
  return (
    // Main container for the Meet the Team section
    <section className="meet-the-team">
      {/* Section heading */}
      <h2>Meet the Team</h2>
      {/* Divider line under heading */}
      <hr className="divider" />
      
      {/* Grid container for team member cards */}
      <div className="team-grid" data-aos="fade-up">
        {team.map((member, index) => (
          // Individual team member card
          <div className="team-card" key={index}>
            {/* Team member image */}
            <div className="team-member-image">
              <img 
                src={member.image} 
                alt={`Portrait of ${member.name}`}
                loading="lazy"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              {/* Fallback initial circle */}
              <div className="image-fallback" style={{display: 'none'}}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            {/* Team member name */}
            <h3>{member.name}</h3>
            {/* Team member role */}
            <p className="role">{member.role}</p>
            {/* Team member quote */}
            <p className="quote">{member.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;