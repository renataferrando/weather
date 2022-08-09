import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherData } from "../redux/features/dataSlice";
import { usePosition } from "../hooks/usePosition";
import CurrentWeather from "../components/currentWeather/CurrentWeather";
import { useSelector } from "react-redux";

import "./_home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, timestamp, error } = usePosition();
  const dataError = useSelector((state) => state.data.error);

  let time = new Date(timestamp).toLocaleTimeString();

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(
        fetchWeatherData({
          lon: longitude,
          lat: latitude,
        })
      );
    }
  }, [latitude, longitude]);

  if (dataError) {
    return <p>{dataError}</p>;
  } else if (error) {
    <p>
      Could not get your current location. Make sure to allow it and reload the
      page
    </p>;
  } else
    return (
      <div className="wrapper">
        <div className="main">
          <CurrentWeather time={time} />
        </div>
      </div>
    );
};

export default Home;
