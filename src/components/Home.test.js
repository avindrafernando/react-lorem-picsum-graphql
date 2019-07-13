import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

it("renders a heading", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Welcome to My Featured Posts")).toBeInTheDocument();
});
