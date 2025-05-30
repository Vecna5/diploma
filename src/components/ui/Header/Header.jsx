import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import sunIcon from '../../../assets/icons/Sun(black).svg';
import moonIcon from '../../../assets/icons/Moon(white).svg';
import './Header.css';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="header-container">
      <header className="header">
        <img
          src={isDark ? moonIcon : sunIcon}
          alt={isDark ? 'Moon' : 'Sun'}
          className="header-icon"
          onClick={toggleTheme}
          style={{ cursor: 'pointer' }}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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