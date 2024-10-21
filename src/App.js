import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Weather from './components/Weather';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Weather />
      </div>
    </ThemeProvider>
  );
};

export default App;
