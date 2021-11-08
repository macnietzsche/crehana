import React from "react";
import Fallback from "components/fallback";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("View render correct label", () => {
  const {getByTestId} = render(<Fallback />);
  const expectedLabel = getByTestId("loading-label").textContent
  expect(expectedLabel).toBe("Loading...")
});
