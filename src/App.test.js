import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders loading message of App", () => {
  render(<App />);

  const linkElement = screen.getByText(/loading/i);
  expect(linkElement).toBeInTheDocument();
});

test("check placeholder of Autocomplete", () => {
  render(<App />);

  const linkElement = screen.queryByPlaceholderText(/where are you going/i);
  expect(linkElement).toBeInTheDocument();
});

test("left panel render", () => {
  const { container } = render(<App />);

  const pans = container.getElementsByClassName("left-panel");
  expect(pans.length).toBe(1);
});

test("autocomplete render", () => {
  const { container } = render(<App />);

  const autocomp = container.getElementsByClassName("autocomplete");
  expect(autocomp.length).toBe(1);
});
