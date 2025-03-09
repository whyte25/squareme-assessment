import { TransactionTableMobile } from "@/components/transactions/transaction-table-mobile";
import { Transaction } from "@/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock the components used in TransactionTableMobile
vi.mock("@/components/ui/go-back", () => ({
  GoBack: ({ text }: { text: string }) => (
    <div data-testid="go-back">{text}</div>
  ),
}));

// Mock the QueryDatePicker component to prevent nuqs adapter issues
vi.mock("@/components/query/query-datepicker", () => ({
  QueryDatePicker: () => <div data-testid="query-datepicker">Date Picker</div>,
}));

vi.mock("@/components/transactions/header/transactions-header", () => ({
  TransactionsHeader: () => <div data-testid="transactions-header">Header</div>,
}));

vi.mock("@/components/query/query-pagination", () => ({
  QueryPagination: ({
    current_page,
    total_pages,
    total_items,
  }: {
    current_page: number;
    total_pages: number;
    total_items: number;
  }) => (
    <div data-testid="query-pagination">
      Page {current_page} of {total_pages} ({total_items} items)
    </div>
  ),
}));

vi.mock("@/components/transactions/transaction-card", () => ({
  TransactionCard: ({ transaction }: { transaction: Transaction }) => (
    <div data-testid={`transaction-card-${transaction.id}`}>
      {transaction.transaction_type} - {transaction.amount}
    </div>
  ),
}));

describe("TransactionTableMobile", () => {
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      amount: "N43,644",
      transaction_id: "TR_8401857902",
      transaction_type: "Transfer",
      date: "Feb 12, 2025",
      time: "10:30AM",
      status: "Processed",
      createdAt: "2025-02-12T10:30:00Z",
    },
    {
      id: "2",
      amount: "N15,000",
      transaction_id: "TR_8401857903",
      transaction_type: "Deposit",
      date: "Feb 13, 2025",
      time: "11:45AM",
      status: "Processed",
      createdAt: "2025-02-13T11:45:00Z",
    },
  ];

  const mockPagination = {
    current_page: 2,
    total_pages: 5,
    total_items: 25,
  };

  it("renders all components correctly with pagination", () => {
    render(
      <TransactionTableMobile
        transactions={mockTransactions}
        pagination={mockPagination}
      />,
    );

    // Check GoBack component
    expect(screen.getByTestId("go-back")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();

    // Check TransactionsHeader component
    expect(screen.getByTestId("transactions-header")).toBeInTheDocument();

    // Check transaction cards
    mockTransactions.forEach((transaction) => {
      expect(
        screen.getByTestId(`transaction-card-${transaction.id}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `${transaction.transaction_type} - ${transaction.amount}`,
        ),
      ).toBeInTheDocument();
    });

    // Check pagination
    expect(screen.getByTestId("query-pagination")).toBeInTheDocument();
    expect(screen.getByText(`Page 2 of 5 (25 items)`)).toBeInTheDocument();
  });

  it("uses fallback values when pagination is not provided", () => {
    render(<TransactionTableMobile transactions={mockTransactions} />);

    // Check pagination with fallback values
    // Default current_page should be 1
    // Default total_pages should be Math.ceil(transactions.length / 6) = Math.ceil(2 / 6) = 1
    // Default total_items should be transactions.length = 2
    expect(screen.getByText("Page 1 of 1 (2 items)")).toBeInTheDocument();
  });

  it("handles empty transactions array", () => {
    render(<TransactionTableMobile transactions={[]} />);

    // No transaction cards should be rendered
    expect(screen.queryByTestId(/transaction-card-/)).not.toBeInTheDocument();

    // Pagination should still be rendered with fallback values
    expect(screen.getByText("Page 1 of 0 (0 items)")).toBeInTheDocument();
  });
});
