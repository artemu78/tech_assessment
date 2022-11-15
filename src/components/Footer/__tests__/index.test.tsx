import React from "react";
import { render, screen } from "@testing-library/react";
// import renderer from "react-test-renderer";
import Footer, { links } from "..";

test("render Footer", () => {
  const { container } = render(<Footer />);

  links.forEach((link) => {
    expect(screen.getByText(link[0])).toHaveAttribute("href", link[1]);
  });
  expect(container).toMatchSnapshot();
});
