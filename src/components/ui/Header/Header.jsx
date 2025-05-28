import React, { useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import icon from '../../../assets/icons/Sun(black).png';
import iconHover from '../../../assets/icons/Moon(white).png';
import './Header.css';

const Header = () => {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div className="header-container">
      <header className="header">
        <img
          src={hover ? iconHover : icon}
          alt="Sun"
          className={`header-icon${active ? ' icon-active' : ''}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => { setHover(false); setActive(false); }}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
        />
        <span className="header-title">DreamDiary</span>
        <div className="header-content">
          <h1>DreamDiary</h1>
          <p>Don't let your dreams fade away</p>
        </div>
        <ThemeToggle />
      </header>
    </div>
  );
};

export default Header;