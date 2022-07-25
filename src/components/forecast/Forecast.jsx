import React from "react";
import "./_forecast.scss";
import { useSelector } from "react-redux";
import WeatherBox from "../weatherBox/WeatherBox";

const Forecast = ({ isOpen }) => {
  const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  const { forecastData } = useSelector((state) => state.data);

  const daily = forecastData.filter((item) => {
    return new Date(item.dt * 1000).getHours() === 9;
  });

  const hourly = forecastData.slice(0, 4);

  return (
    <div className={!isOpen ? "forecast" : "forecast --show"}>
      <p>
        <strong>Next 12 hours:</strong>
      </p>
      <div className="hourly">
        {hourly.map((item, i) => (
          <div className="hourly-boxes" key={i}>
            {item.dt_txt.slice(10)}
            <WeatherBox
              size="small"
              vertical
              description={item.weather?.[0]?.description}
              icon={`icons/${item.weather?.[0]?.icon}.png`}
              temp={Math.round(item.main?.temp)}
            />
          </div>
        ))}
      </div>
      <p>
        <strong>Next 5 days: *</strong>
      </p>

      <div className="daily">
        {daily.map((item, i) => (
          <div
            className="daily-boxes"
            key={i}
            data-testid="daily-container-test-id"
          >
            <p>{forecastDays[i]}</p>
            <WeatherBox
              size="small"
              vertical
              description={item.weather?.[0]?.description}
              icon={`icons/${item.weather?.[0]?.icon}.png`}
              temp={Math.round(item.main?.temp)}
            />
          </div>
        ))}
      </div>
      <p className="disclaimer">*Estimated conditions at 12pm for each day</p>
    </div>
  );
};

export default Forecast;
