import React, { useRef } from "react";
import "./_forecast.scss";
import { useSelector } from "react-redux";
import WeatherBox from "../weatherBox/WeatherBox";
import useWindowSize from "../../hooks/useWindowSize";
import ArrowDown from "../svg/ArrowDown";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const Forecast = ({ isOpen }) => {
  const daily = useSelector((state) => state.data.forecastDaily);
  const hourly = useSelector((state) => state.data.forecastHourly);
  const targetRef = useRef(null);
  const isVisible = useIntersectionObserver(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    },
    targetRef
  );

  const [height, width] = useWindowSize();
  const isMobile = width < 768;

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
              icon={`weather/icons/${item.weather?.[0]?.icon}.png`}
              temp={Math.round(item.main?.temp)}
            />
          </div>
        ))}
      </div>
      <p>
        <strong>Next 5 days: *</strong>
      </p>
      {isMobile && isOpen && (
        <ArrowDown
          className={!isVisible ? "arrow-x --right" : "arrow-x --left"}
        />
      )}
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
              icon={`weather/icons/${item.weather?.[0]?.icon}.png`}
              temp={Math.round(item.main?.temp)}
            />
          </div>
        ))}
        <div className="intersection-containter" ref={targetRef}></div>
      </div>
      <p className="disclaimer">*Estimated conditions at 12pm for each day</p>
    </div>
  );
};

export default Forecast;
