import { toast } from "@/components/ui/notify";
import { useDeleteTransaction } from "@/hooks/mutations/use-delete-transaction";
import { deleteTransactions } from "@/services/api/transaction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the API call and toast
vi.mock("@/services/api/transaction", () => ({
  deleteTransactions: vi.fn(),
}));

vi.mock("@/components/ui/notify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useDeleteTransaction", () => {
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

  it("should delete transactions successfully", async () => {
    // Mock successful API response
    const mockResponse = {
      success: true,
      message: "Transactions deleted successfully",
    };
    (deleteTransactions as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse,
    );

    const { result } = renderHook(() => useDeleteTransaction(), { wrapper });

    // Execute the mutation
    const payload = { transaction_ids: ["1", "2"] };
    result.current.mutate(payload);

    // Wait for the mutation to complete
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify API was called with correct parameters
    expect(deleteTransactions).toHaveBeenCalledWith(payload);

    // Verify success toast was shown
    expect(toast.success).toHaveBeenCalledWith(
      "Transaction(s) deleted successfully",
    );
  });

  it("should handle API error", async () => {
    // Mock API error
    const errorResponse = {
      response: {
        data: {
          message: "Failed to delete transactions",
        },
      },
    };
    (deleteTransactions as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      errorResponse,
    );

    const { result } = renderHook(() => useDeleteTransaction(), { wrapper });

    // Execute the mutation
    const payload = { transaction_ids: ["1", "2"] };
    result.current.mutate(payload);

    // Wait for the mutation to fail
    await waitFor(() => expect(result.current.isError).toBe(true));

    // Verify error toast was shown with the correct message
    expect(toast.error).toHaveBeenCalledWith("Failed to delete transactions");
  });

  it("should handle API error with generic message when no specific message is provided", async () => {
    // Mock API error without specific message
    const errorResponse = new Error("Network error");
    (deleteTransactions as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      errorResponse,
    );

    const { result } = renderHook(() => useDeleteTransaction(), { wrapper });

    // Execute the mutation
    const payload = { transaction_ids: ["1", "2"] };
    result.current.mutate(payload);

    // Wait for the mutation to fail
    await waitFor(() => expect(result.current.isError).toBe(true));

    // Verify error toast was shown with the generic message
    expect(toast.error).toHaveBeenCalledWith("Failed to delete transaction(s)");
  });
});
