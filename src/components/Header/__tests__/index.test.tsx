import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
const { default: userEvent } = require("@testing-library/user-event");
import Header from "..";

describe("Header", () => {
  test("Render snapshot", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  test("Check link", () => {
    render(<Header />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://war.ukraine.ua/support-ukraine/"
    );
  });

  test("Open & close menu", async () => {
    render(<Header />);
    const burgerButton = screen.getByRole("button", { name: "menu" });

    expect(burgerButton).toBeInTheDocument();
    fireEvent.click(burgerButton); // click on burger button on the left

    expect(screen.queryByRole("menuitem", { name: "About" })).toBeInTheDocument();

    const firstChild = screen.getByRole("presentation").firstChild; // material ui clickable layer to hide menu
    expect(firstChild).toBeInTheDocument();
    firstChild && fireEvent.click(firstChild);

    await waitFor(() => expect(screen.queryByRole("menuitem", { name: "About" })).toBeNull());
    expect(screen.queryByRole("menuitem", { name: "About" })).not.toBeInTheDocument();
  });

  test("open & close dialog by close button", async () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "menu" })); // click on burger button on the left

    const aboutItem = screen.getByRole("menuitem", { name: "About" });
    expect(aboutItem).toBeInTheDocument();

    await userEvent.click(aboutItem);

    const aboutItemHidden = screen.queryByRole("menuitem", { name: "About" });
    expect(aboutItemHidden).not.toBeInTheDocument();

    const dialog = screen.queryByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.queryByRole("button", { name: "Close" });
    await userEvent.click(closeButton);

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    const dialogHidden = screen.queryByRole("dialog");
    expect(dialogHidden).not.toBeInTheDocument();
  });

  test("open & close dialog by outside click", async () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: "menu" })); // click on burger button on the left

    const aboutItem = screen.getByRole("menuitem", { name: "About" });
    expect(aboutItem).toBeInTheDocument();

    await userEvent.click(aboutItem);

    const aboutItemHidden = screen.queryByRole("menuitem", { name: "About" });
    expect(aboutItemHidden).not.toBeInTheDocument();

    const dialog = screen.queryByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const firstChild = screen.getAllByRole("presentation")[0].firstChild; // material ui clickable layer to hide menu
    expect(firstChild).toBeInTheDocument();
    firstChild && fireEvent.click(firstChild);

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());

    const dialogHidden = screen.queryByRole("dialog");
    expect(dialogHidden).not.toBeInTheDocument();
  });
});
