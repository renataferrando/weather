import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./redux/features/dataSlice";
import { BrowserRouter as Router } from "react-router-dom";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: { data: dataReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
