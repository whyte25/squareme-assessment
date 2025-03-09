import { Logo } from "@/components/logo";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode }) => (
    <a {...props}>{children}</a>
  ),
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});

describe("Logo Component", () => {
  it("renders logo text by default", () => {
    render(<Logo href="/" />);
    const logoLink = screen.getByTestId("logo-text-icon");

    expect(logoLink).toBeInTheDocument();
  });

  it("hides logo text when logoWithText is false", () => {
    render(<Logo href="/" logoWithText={false} />);
    expect(screen.queryByTestId("logo-text-icon")).not.toBeInTheDocument();
  });

  it("renders link with correct href", () => {
    const href = "/dashboard";
    render(<Logo href={href} />);
    const link = screen.getByTestId("logo-link-id");
    expect(link).toHaveAttribute("href", href);
  });
});
