import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the anniversary dashboard", () => {
  render(<App />);
  expect(screen.getByText(/Hôm nay là ngày thứ/i)).toBeInTheDocument();
  expect(screen.getByText(/Sự kiện sắp tới/i)).toBeInTheDocument();
});
