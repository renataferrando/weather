import React, { useState } from "react";
import "./_current-weather.scss";
import { useSelector } from "react-redux";
import Forecast from "../forecast/Forecast";
import ArrowDown from "../svg/ArrowDown";
import WeatherBox from "../weatherBox/WeatherBox";

const CurrentWeather = () => {
  const { weatherData } = useSelector((state) => state.data);
  const [showForecast, setShowForecast] = useState(false);
  return (
    <div className="current-weather" id="current-weather-test-id">
      <h2>
        {weatherData.name}, <span>{weatherData.sys?.country}</span>
      </h2>
      <WeatherBox
        description={weatherData.weather?.[0]?.description}
        icon={`icons/${weatherData.weather?.[0]?.icon}.png`}
        temp={Math.round(weatherData.main?.temp)}
      />
      <div className="details">
        <p>Feels like: {Math.round(weatherData.main?.feels_like)}°C</p>
        <p>Wind: {weatherData.wind?.speed} m/s</p>
        <p>Humidity: {weatherData.main?.humidity} %</p>
      </div>
      <div className="arrow" onClick={() => setShowForecast(!showForecast)}>
        <ArrowDown
          className={!showForecast ? "arrow-down" : "arrow-down --open"}
        />
      </div>
      <Forecast isOpen={showForecast} />
    </div>
  );
};

export default CurrentWeather;
