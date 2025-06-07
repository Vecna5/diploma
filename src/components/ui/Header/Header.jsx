import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import sunIcon from '../../../assets/icons/Sun(black).svg';
import moonIcon from '../../../assets/icons/Moon(white).svg';
import './Header.css';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  

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
          <button className="login-btn" onClick={() => navigate('/auth/login')}>Log in</button>
          <button className="register-btn" onClick={() => navigate('/auth/register')}>Register</button>
        </div>
      </header>
    </div>
  );
};

export default Header;