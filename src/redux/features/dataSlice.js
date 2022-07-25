import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCitiesData, getWeatherData } from "../../api";

const initialState = {
  weatherData: [],
  forecastData: [],
  cities: [],
  citiesLoading: false,
  weatherLoading: false,
};

export const fetchWeatherData = createAsyncThunk(
  "data/fetchWeatherData",
  async (params, { dispatch }) => {
    dispatch(setWeatherLoading(true));
    const res = await getWeatherData(params);
    dispatch(setWeatherData(res[0].data));
    dispatch(setForecastData(res[1].data));
    dispatch(setWeatherLoading(false));
  }
);

export const fetchCitiesData = createAsyncThunk(
  "data/fetchCitiesData",
  async (params, { dispatch }) => {
    dispatch(setCitiesLoading(true));
    const res = await getCitiesData(params);
    dispatch(setCitiesData(res));
    dispatch(setCitiesLoading(false));
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setForecastData: (state, action) => {
      state.forecastData = [...action.payload.list];
    },
    setCitiesData: (state, action) => {
      state.cities = [...action.payload.data];
    },
    setCitiesLoading: (state, action) => {
      state.citiesLoading = action.payload;
    },
    setWeatherLoading: (state, action) => {
      state.weatherLoading = action.payload;
    },
  },
});

export const {
  setWeatherData,
  setForecastData,
  setCitiesData,
  setCitiesLoading,
  setWeatherLoading,
} = dataSlice.actions;
export default dataSlice.reducer;
