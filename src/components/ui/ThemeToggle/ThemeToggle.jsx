import React, { useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme', !isDark);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;