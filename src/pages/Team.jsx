import React from 'react';
import './Team.css'; // Import the CSS file

const TeamMember = ({ imgSrc, name, position }) => {
  return (
    <div className="team-member">
      <div className="our-team">
        <img src={imgSrc} alt={name} />
        <div className="team-content">
          <h3 className="title">{name}</h3>
          <span className="post">{position}</span>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <>
    
    <div class="mb-16 text-center">
            <h2 class="mb-4 text-center text-2xl text-gray-900 font-bold md:text-4xl">Tailus blocks leadership</h2>
            <p class="text-gray-600 lg:w-8/12 lg:mx-auto">Tailus prides itself not only on award-winning technology, but also on the talent of its people of some of the brightest minds and most experienced executives in business.</p>
          </div>
    <div className="team-container">
      <div className="team-row">
        <TeamMember imgSrc="https://siddhu.vercel.app/assets/me1-926e0f32.jpg" name="siddhu from srikakulam" position="Web3 Developer" />
        <TeamMember imgSrc="https://siddhu.vercel.app/assets/me1-926e0f32.jpg" name="Kristiana" position="Web Designer" />
        
      </div>
    </div>
    </>
  );
};

export default Team;
