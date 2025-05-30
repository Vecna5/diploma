import React from 'react';
import './AnotherSection.css';
import humanIcon from '../../../assets/icons/Human(black).svg';
import randomIcon from '../../../assets/icons/Random(black).svg';

const AnotherSection = () => (
  <section className="another-section">
    <div className="another-title">Another</div>
    <div className="another-cards">
      <div className="another-card">
        <div className="another-card-header">
          <span>Now online</span>
          <img
            src={humanIcon}
            alt="User icon"
            className="another-icon"
          />
        </div>
        <div className="another-card-value">
          34
        </div>
      </div>
      <div className="another-card">
        <div className="another-card-header">
          <span>Random dream</span>
          <img
            src={randomIcon}
            alt="Refresh icon"
            className="another-icon"
          />
        </div>
        <div className="another-card-value another-card-value--wide">
          Title 1
        </div>
      </div>
    </div>
  </section>
);

export default AnotherSection;