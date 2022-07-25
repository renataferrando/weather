import React, { useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCitiesData,
  fetchWeatherData,
} from "../../redux/features/dataSlice";
import { useSearchParams } from "react-router-dom";
import debounce from "just-debounce-it";
import useClickOutside from "../../hooks/useClickOutside";
import SuggestBox from "../suggestBox/SuggestBox";
import "./_search-input.scss";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [display, setDisplay] = useState(false);

  const ref = useRef();
  useClickOutside(ref, () => setDisplay(false));
  const { cities, citiesLoading } = useSelector((state) => state.data);

  const handleOnChange = (e) => {
    setDisplay(true);
    dispatch(fetchCitiesData({ namePrefix: e.target.value }));
  };

  const debounceOnChange = useCallback(
    debounce((e) => handleOnChange(e), 1000),
    []
  );
  const handleClick = (item) => {
    setDisplay(false);
    dispatch(fetchWeatherData({ lat: item.latitude, lon: item.longitude }));
  };

  const value = searchParams.get("namePrefix") ?? "";

  return (
    <div>
      <input
        className="input"
        defaultValue={value}
        onChange={(e) => {
          debounceOnChange(e);
        }}
        type="text"
        placeholder="Search by city"
      />
      {display && (
        <div ref={ref} className="suggests-container">
          {citiesLoading ? (
            <p>Loading</p>
          ) : (
            <>
              {cities.map((item, i) => (
                <SuggestBox
                  onClick={() => handleClick(item)}
                  className="option"
                  key={i}
                >
                  <p>
                    {item.name}, {item.country}{" "}
                  </p>
                </SuggestBox>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
