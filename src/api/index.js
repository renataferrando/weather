import axios from "axios";
import { weatherURL, weatherApiKey, cityApiKey, cityURL } from "../constants";

export const getWeatherData = (params) => {
  let endpoints = [
    `${weatherURL}weather?${weatherApiKey}&units=metric`,
    `${weatherURL}forecast?${weatherApiKey}&units=metric`,
  ];
  return axios
    .all(endpoints.map((endpoint) => axios.get(endpoint, { params })))
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const getCitiesData = (params) => {
  return axios
    .get(`${cityURL}${cityApiKey}`, { params })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
