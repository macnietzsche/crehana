import React from "react";
import PageNotFound from "components/page-not-found";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const Component: JSX.Element = (
  <Router>
    <PageNotFound />
  </Router>
);

test("View renders correct label", () => {
  const { getByTestId } = render(Component);
  const expectedLabel = getByTestId("page-not-found-label").textContent;

  expect(expectedLabel).toBe("Page Not Found");
});

test("Button renders correct", () => {
  const { getByTestId } = render(Component);
  const element = getByTestId("home-button-anchor");
  const buttonLabel = element.lastChild?.textContent
  const homeUrl = element.getAttribute("href")

  expect(buttonLabel).toBe("Go Home")
  expect(homeUrl).toBe("/")
});
