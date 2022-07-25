import React from "react";
import classNames from "classnames";
import "./_weather-box.scss";

const WeatherBox = ({ description, icon, temp, vertical, size, className }) => {
  const classes = classNames("weather-box", className, {
    "--vertical": vertical,
    [`--${size}`]: size,
  });

  return (
    <div className={classes}>
      <p className="description">{description}</p>
      <img alt="weather" className="icon" src={icon} />
      <p className="temperature">{temp}°C</p>
    </div>
  );
};

export default WeatherBox;
