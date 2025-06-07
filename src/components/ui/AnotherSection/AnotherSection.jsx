import React from 'react';
import './AnotherSection.css';
import { useTheme } from '../../../contexts/ThemeContext';
import humanIcon from '../../../assets/icons/Human(black).svg';
import randomIcon from '../../../assets/icons/Random(black).svg';
import humanWhiteIcon from '../../../assets/icons/Human(white).svg';
import randomWhiteIcon from '../../../assets/icons/Random(white).svg';

const AnotherSection = () => {
  const { isDark } = useTheme();

  return (
    <section className="another-section">
      <div className="another-title">Another</div>
      <div className="another-cards">
        <div className="another-card">
          <div className="another-card-header">
            <span>Now online</span>
            <img
              src={isDark ? humanWhiteIcon : humanIcon}
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
              src={isDark ? randomWhiteIcon : randomIcon}
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
};

export default AnotherSection;