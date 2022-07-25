import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../redux/features/dataSlice";
import { usePosition } from "../hooks/usePosition";
import CurrentWeather from "../components/currentWeather/CurrentWeather";
import "./_home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { weatherLoading } = useSelector((state) => state.data);
  const { latitude, longitude } = usePosition();

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

  return (
    <div className="wrapper">
      <div className="main">
        {weatherLoading ? (
          <p>loading</p>
        ) : (
          <>
            <CurrentWeather />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
