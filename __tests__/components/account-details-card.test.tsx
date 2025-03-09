import { AccountDetailsCard } from "@/components/account-details-card";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock the CopyButton component
vi.mock("@/components/ui/copy-button", () => ({
  CopyButton: ({ value, ...props }: { value: string }) => (
    <button data-testid="copy-button" data-copy-value={value} {...props}>
      Copy
    </button>
  ),
}));

describe("AccountDetailsCard", () => {
  const defaultProps = {
    amount: "50,000.00",
    accountName: "John Doe",
    bankName: "First Bank",
  };

  it("renders account details correctly", () => {
    render(<AccountDetailsCard {...defaultProps} />);

    // Check if the card title is rendered
    expect(screen.getByText("ACCOUNT DETAILS")).toBeInTheDocument();

    // Check if bank name is displayed
    expect(screen.getByText(defaultProps.bankName)).toBeInTheDocument();

    // Check if amount is displayed with the Naira symbol
    expect(screen.getByText(`₦${defaultProps.amount}`)).toBeInTheDocument();

    // Check if account name is displayed
    expect(screen.getByText(defaultProps.accountName)).toBeInTheDocument();
  });

  it("includes a copy button with the correct amount value", () => {
    render(<AccountDetailsCard {...defaultProps} />);

    const copyButton = screen.getByTestId("copy-button");
    expect(copyButton).toBeInTheDocument();
    expect(copyButton).toHaveAttribute("data-copy-value", defaultProps.amount);
  });

  it("applies the correct CSS classes", () => {
    render(<AccountDetailsCard {...defaultProps} />);

    // Check if the card has the correct width classes
    const card = screen.getByText("ACCOUNT DETAILS").closest(".w-full");
    expect(card).toHaveClass("w-full");
    expect(card).toHaveClass("sm:w-fit");

    // Check if account name has the md:hidden class
    const accountName = screen.getByText(defaultProps.accountName);
    expect(accountName).toHaveClass("md:hidden");
  });
});
