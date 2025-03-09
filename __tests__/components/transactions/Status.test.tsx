import { Status } from "@/components/transactions/status";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Status", () => {
  it("renders processed status correctly", () => {
    render(<Status status="Processed" />);
    const statusElement = screen.getByText("Processed");
    expect(statusElement).toBeInTheDocument();

    const badgeElement = statusElement.closest("[class*='border-green-600']");
    expect(badgeElement).toHaveClass(
      "border-green-600",
      "bg-green-600/10",
      "text-green-900",
    );
  });

  it("renders failed status correctly", () => {
    render(<Status status="Failed" />);
    const statusElement = screen.getByText("Failed");
    expect(statusElement).toBeInTheDocument();

    const badgeElement = statusElement.closest("[class*='border-red-600']");
    expect(badgeElement).toHaveClass(
      "border-red-600",
      "bg-red-600/10",
      "text-red-900",
    );
  });

  it("includes status indicator dot", () => {
    render(<Status status="Processed" />);

    const badgeElement = screen.getByText("Processed").closest("div");
    const dot = badgeElement?.querySelector("span");
    expect(dot).toHaveClass("h-2", "w-2", "rounded-full", "bg-green-600");
  });
});
