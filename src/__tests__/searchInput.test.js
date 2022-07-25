import React from "react";
import { renderWithProviders } from "../test-utils";
import { screen, fireEvent } from "@testing-library/react";
import SearchInput from "../components/searchInput/SearchInput";

beforeEach(() => {
  renderWithProviders(<SearchInput />);
});

describe("searchInputTest", () => {
  test("renders the input", () => {
    const input = screen.getByPlaceholderText("Search by city");
    expect(input).toBeInTheDocument();
  });

  test("Should test onchange event", () => {
    const input = screen.getByPlaceholderText("Search by city");
    fireEvent.change(input, { target: { value: "Buenos Aires" } });
    expect(input.value).toBe("Buenos Aires");
  });
});
