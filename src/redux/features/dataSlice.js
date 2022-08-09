import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCitiesData, getWeatherData } from "../../api";

const initialState = {
  currentWeather: [],
  forecastDaily: [],
  forecastHourly: [],
  cities: [],
  citiesLoading: false,
  weatherLoading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "data/fetchWeatherData",
  async (params) => {
    const res = await getWeatherData(params);
    return res;
  }
);

export const fetchCitiesData = createAsyncThunk(
  "data/fetchCitiesData",
  async (params) => {
    const res = await getCitiesData(params);
    return res;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCitiesData.pending, (state) => {
      state.citiesLoading = true;
    });
    builder.addCase(fetchCitiesData.fulfilled, (state, action) => {
      state.citiesLoading = false;
      state.cities = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchCitiesData.rejected, (state, action) => {
      state.citiesLoading = false;
      state.cities = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.weatherLoading = true;
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.weatherLoading = false;
      state.currentWeather = action.payload.weather;
      state.forecastDaily = action.payload.forecast.list.filter(
        (item) => new Date(item.dt * 1000).getHours() === 9
      );
      state.forecastHourly = action.payload.forecast.list.slice(0, 4);
      state.error = "";
    });
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.weatherLoading = false;
      state.currentWeather = [];
      state.forecastDaily = [];
      state.forecastHourly = [];
      state.error = "Ups something went wrong, please try again later";
    });
  },
});

export const weather = (state) => state.data.currentWeather;

export default dataSlice.reducer;
