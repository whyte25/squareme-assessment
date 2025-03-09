import { TransactionCard } from "@/components/transactions/transaction-card";
import { Transaction } from "@/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
describe("TransactionCard", () => {
  const mockTransaction: Transaction = {
    id: "1",
    amount: "N43,644",
    transaction_id: "TR_8401857902",
    transaction_type: "Transfer",
    date: "Feb 12, 2025",
    time: "10:30AM",
    status: "Processed",
    createdAt: "2025-02-12T10:30:00Z",
  };

  it("renders transaction details correctly", () => {
    render(<TransactionCard transaction={mockTransaction} />);

    expect(screen.getByText("AMOUNT:")).toBeInTheDocument();
    expect(screen.getByText(mockTransaction.amount)).toBeInTheDocument();

    expect(screen.getByText("TRANSACTION TYPE:")).toBeInTheDocument();
    expect(
      screen.getByText(mockTransaction.transaction_type),
    ).toBeInTheDocument();

    expect(screen.getByText("DATE:")).toBeInTheDocument();
    expect(
      screen.getByText(`${mockTransaction.date}, ${mockTransaction.time}`),
    ).toBeInTheDocument();

    expect(screen.getByText("STATUS:")).toBeInTheDocument();
    expect(screen.getByText(mockTransaction.status)).toBeInTheDocument();
  });

  it("renders Status component with correct status", () => {
    render(<TransactionCard transaction={mockTransaction} />);
    const statusElement = screen.getByText(mockTransaction.status);
    expect(statusElement.closest(".border-green-600")).toHaveClass(
      "border-green-600",
      "bg-green-600/10",
      "text-green-900",
    );
  });
});
