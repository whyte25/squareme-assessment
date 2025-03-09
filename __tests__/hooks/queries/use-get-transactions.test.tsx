import { useGettransactions } from "@/hooks/queries/use-get-transactions";
import { getTransactions } from "@/services/api/transaction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the API call
vi.mock("@/services/api/transaction", () => ({
  getTransactions: vi.fn(),
}));

const mockTransactionsResponse = {
  data: {
    data: [
      {
        id: "1",
        amount: 1000,
        status: "success",
        date: "2023-01-01",
        description: "Test transaction",
      },
    ],
    meta: {
      total: 1,
      page: 1,
      limit: 6,
      total_pages: 1,
    },
  },
};

describe("useGettransactions", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch transactions successfully", async () => {
    // Mock the API response
    (getTransactions as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockTransactionsResponse,
    );

    const queryParams = {
      limit: 6,
      page: 1,
      from_date: undefined,
      to_date: undefined,
    };

    const { result } = renderHook(() => useGettransactions(queryParams), {
      wrapper,
    });

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify API was called with correct parameters
    expect(getTransactions).toHaveBeenCalledWith(queryParams);

    // Verify data is returned correctly
    expect(result.current.data).toEqual(mockTransactionsResponse);
  });

  it("should handle API error", async () => {
    // Mock API error
    const error = new Error("Failed to fetch transactions");
    (getTransactions as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

    const queryParams = {
      limit: 6,
      page: 1,
      from_date: undefined,
      to_date: undefined,
    };

    const { result } = renderHook(() => useGettransactions(queryParams), {
      wrapper,
    });

    // Wait for the query to fail
    await waitFor(() => expect(result.current.isError).toBe(true));

    // Verify error is handled correctly
    expect(result.current.error).toBeDefined();
  });

  it("should use query parameters correctly", async () => {
    // Mock the API response
    (getTransactions as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockTransactionsResponse,
    );

    const queryParams = {
      limit: 10,
      page: 2,
      from_date: "2023-01-01",
      to_date: "2023-01-31",
    };

    renderHook(() => useGettransactions(queryParams), { wrapper });

    // Verify API was called with correct parameters
    expect(getTransactions).toHaveBeenCalledWith(queryParams);
  });
});
