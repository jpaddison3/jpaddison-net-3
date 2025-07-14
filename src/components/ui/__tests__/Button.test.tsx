import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, IconButton } from "../Button";

describe("Button", () => {
  it("renders button with text content", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("prevents interaction when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows loading state with proper accessibility", () => {
    render(<Button loading>Save changes</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("maintains focus after user interaction", async () => {
    const user = userEvent.setup();
    render(<Button>Focus me</Button>);

    const button = screen.getByRole("button");
    await user.tab();

    expect(button).toHaveFocus();
  });
});

describe("IconButton", () => {
  it("renders with required aria-label for accessibility", () => {
    render(
      <IconButton aria-label="Close dialog">
        <span>×</span>
      </IconButton>,
    );

    const button = screen.getByRole("button", { name: "Close dialog" });
    expect(button).toBeInTheDocument();
  });

  it("handles loading state", () => {
    render(
      <IconButton loading aria-label="Submit">
        <span>→</span>
      </IconButton>,
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
