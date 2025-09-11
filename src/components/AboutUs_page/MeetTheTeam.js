// Author: Smangalene Charles Sema & Ntsikayethu Nyamezele
// Date: 5 September 2025
// Description: React component for the "Meet the Team" section of the About Us page. 
//              Displays a list of team members with their names, roles, and personal quotes.
//              Includes a responsive grid layout and fade-up animations using AOS library.

import React from 'react';
import '../AboutUs_page/MeetTheTeam.css'; // Import corresponding CSS

// Array of team members with their details
const team = [
  {
    name: 'Sinqobile Zungu',
    role: 'Founder',
    quote: '"Every act of kindness creates ripples that transform lives."',
  },
  {
    name: 'Bridget Godlimpi',
    quote: '"I believe in creating spaces where everyone feels they belong."',
  },
  {
    name: 'Nzuzo Shelembe',
    quote: '"Empowering people starts with listening to their stories."',
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
            {/* Team member name */}
            <h3>{member.name}</h3>
            {/* Team member role (optional) */}
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
