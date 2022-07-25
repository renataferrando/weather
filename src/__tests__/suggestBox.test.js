import React from "react";
import { renderWithProviders } from "../test-utils";
import { screen, fireEvent } from "@testing-library/react";
import SuggestBox from "../components/suggestBox/SuggestBox";

describe("suggestBoxInput", () => {
  test("onclick event", () => {
    const handleClick = jest.fn();
    renderWithProviders(<SuggestBox onClick={handleClick} />);
    const suggestBox = screen.getByTestId("suggest-box");
    fireEvent.click(suggestBox);
    expect(handleClick).toBeCalledTimes(1);
  });
});
