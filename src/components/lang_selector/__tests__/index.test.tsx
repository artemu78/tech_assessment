import { render } from "@testing-library/react";
import LangSelector from "..";

describe("Header", () => {
  test("Render snapshot", () => {
    const { container } = render(<LangSelector />);
    expect(container).toMatchSnapshot();
  });
});
