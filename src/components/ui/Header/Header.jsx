import React, { useState } from 'react';
import icon from '../../../assets/icons/Sun(black).svg';
import iconHover from '../../../assets/icons/Moon(white).svg';
import './Header.css';

const Header = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="header-container">
      <header className="header">
        <img
          src={active ? iconHover : icon}
          alt="Sun"
          className={`header-icon${active ? ' icon-active' : ''}`}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
        />

        <span className="header-title">DreamDiary</span>

        <div className="header-buttons">
          <button className="login-btn">Log in</button>
          <button className="register-btn">Register</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
