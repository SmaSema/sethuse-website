import React from 'react';
import '../AboutUs_page/MeetTheTeam.css';

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
    <section className="meet-the-team">
      <h2>Meet the Team</h2>
      <hr className="divider" />
      <div className="team-grid">
        {team.map((member, index) => (
          <div className="team-card" key={index}>
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="quote">{member.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam;
