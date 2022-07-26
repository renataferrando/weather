import React, { useState } from "react";
import "./_current-weather.scss";
import { useSelector } from "react-redux";
import Forecast from "../forecast/Forecast";
import ArrowDown from "../svg/ArrowDown";
import WeatherBox from "../weatherBox/WeatherBox";
import { weather } from "../../redux/features/dataSlice";

const CurrentWeather = ({ time }) => {
  const weatherData = useSelector(weather);
  const weatherLoading = useSelector((state) => state.data.weatherLoading);
  const [showForecast, setShowForecast] = useState(false);

  return (
    <>
      {weatherLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="current-weather" id="current-weather-test-id">
          <h2>
            {weatherData.name}, <span>{weatherData.sys?.country}</span>
          </h2>
          <p className="last-update">Last update: {time}</p>
          <WeatherBox
            description={weatherData.weather?.[0]?.description}
            icon={`weather/icons/${weatherData.weather?.[0]?.icon}.png`}
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
      )}
    </>
  );
};
export default CurrentWeather;
