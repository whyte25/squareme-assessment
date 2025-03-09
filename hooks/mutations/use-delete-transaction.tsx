import { toast } from "@/components/ui/notify";
import { queryKeys } from "@/constants/query-keys";
import { deleteTransactions } from "@/services/api/transaction";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: deleteTransactions,
    mutationKey: [queryKeys.transactions],
    onSuccess: () => {
      toast.success("Transaction(s) deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete transaction(s)",
      );
    },
  });
};
