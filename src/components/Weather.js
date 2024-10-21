import React, { useState } from 'react';
import axios from 'axios';
import DarkModeToggle from './DarkModeToggle'; 
import { useDarkModeToggle } from '../context/ThemeContext';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { darkMode } = useDarkModeToggle();

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`weather-app ${darkMode ? 'dark-mode' : ''}`}>
      <DarkModeToggle /> 
      <div className="card">
        <h2 className="app-title">Weather App</h2>
        <div className="input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="city-input"
          />
          <button className="btn-primary" onClick={fetchWeather}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h3 className="city-name">{weatherData.name}, {weatherData.sys.country}</h3>
            <div className="temperature">
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Feels like: {weatherData.main.feels_like}°C</p>
            </div>
            <p className="weather-description">{weatherData.weather[0].description}</p>
            <div className="additional-info">
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
