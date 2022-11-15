import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
const { default: userEvent } = require("@testing-library/user-event");
import Dialog from "@mui/material/Dialog";
import Header from "..";

// jest.mock("../foo-bar-baz", () => {
//   const originalModule = jest.requireActual("../foo-bar-baz");
//   return {
//     __esModule: true,
//     ...originalModule,
//     onClose: jest.fn(() => console.log()),
//   };
// });

describe("Header", () => {
  test("render snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
  test("hide and show dialog", async () => {
    // const customSetState = (initial) => [initial, (val) => {}];

    // const setModalOpen = jest.fn();
    // const setMenuAnchorEl = jest.fn();

    // const setModalOpen = jest.fn().mockReturnValueOnce(false);

    // const setstate = <T,>(init: T) => {
    //   const hook = { val: init };
    //   return [hook.val, (newval: any) => (hook.val = newval)];
    // };

    // React.useState = jest
    //   .fn()
    //   .mockReturnValueOnce(setstate(false))
    //   .mockReturnValueOnce(setstate(null));

    const { container, getByTestId } = render(<Header />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://war.ukraine.ua/support-ukraine/"
    );
    expect(screen.queryByTestId("header_menuButton")).toBeInTheDocument();
    expect(screen.queryByTestId("header_aboutItem")).not.toBeInTheDocument();

    fireEvent.click(getByTestId("header_menuButton")); // 1st click on burger button on the left
    expect(screen.queryByTestId("header_aboutItem")).toBeInTheDocument();
    await waitFor(() => screen.getByTestId("header_menuButton"));
    await waitFor(() => screen.getByTestId("header_aboutItem"));
    expect(screen.queryByTestId("header_aboutDialog")).not.toBeInTheDocument();
    expect(screen.queryByTestId("header_aboutItem")).toBeVisible();

    console.log("before 2nd click", new Date().toISOString());
    await userEvent.click(getByTestId("header_menuButton"), { delay: 1000 }); // 2nd click on burger button on the left
    console.log("after 2nd click", new Date().toISOString());

    expect(screen.queryByTestId("header_aboutItem")).toBeInTheDocument();
    expect(screen.queryByTestId("header_aboutItem")).toBeVisible();

    await waitFor(() => screen.getByTestId("header_menuButton"));
    await waitFor(() => screen.getByTestId("header_aboutItem"));
    expect(screen.queryByTestId("header_aboutDialog")).not.toBeInTheDocument();

    fireEvent.click(getByTestId("header_aboutItem")); // click on "About" menu item
    await waitFor(() => screen.getByTestId("header_aboutDialog")); // wait until dialog appear
    expect(screen.queryByTestId("header_aboutDialog")).toBeInTheDocument();

    expect(
      screen
        .getAllByRole("link")
        .find(
          (el) =>
            (el as HTMLLinkElement).href ===
            "https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github"
        )
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link")
        .find(
          (el) =>
            (el as HTMLLinkElement).href ===
            "https://github.com/ebazhanov/linkedin-skill-assessments-quizzes/"
        )
    ).toBeInTheDocument();

    // fireEvent.click(getByTestId("header_menuButton")); // click on burger button on the left
    // // fireEvent.click(document.body);

    // await fireEvent.keyDown(document.body, {
    //   key: "Escape",
    //   keyCode: 27,
    //   which: 27,
    //   delay: 1000,
    // });

    // await userEvent.click(document.body, { delay: 1000 });
    // await userEvent.click(getByTestId("header-closeButton"), { delay: 1000 });

    // // expect(screen.queryByTestId("header_aboutDialog")).not.toBeInTheDocument();
    // expect(screen.queryByTestId("header_aboutDialog")).not.toContainElement(null);
    // // expect(setModalOpen).toHaveBeenLastCalledWith(false);
  });
});
