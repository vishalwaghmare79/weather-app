import React from 'react';
import { useDarkModeToggle } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa'; 

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useDarkModeToggle();

  return (
    <button onClick={toggleTheme} className="toggle-button">
      {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      <span className="toggle-text">{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span> 
    </button>
  );
};

export default DarkModeToggle;
