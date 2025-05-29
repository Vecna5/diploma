import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <h2 className="about-highlight">
        About<br />
        dream diary
      </h2>
      <div className="about-text">
        <p>
          Dream Diary is an online platform designed to facilitate the systematic recording and analysis of dreams. Users can document dream content immediately upon waking, helping to preserve episodic memory and minimize recall decay.
        </p>
      </div>
    </section>
  );
};

export default About;
