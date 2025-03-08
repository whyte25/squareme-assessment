import { queryKeys } from "@/constants/query-keys";
import { getTransactions } from "@/services/api/transaction";
import { TransactionsQueryParams } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGettransactions = ({
  limit,
  page,
  from_date,
  to_date,
}: TransactionsQueryParams) => {
  return useQuery({
    queryFn: () =>
      getTransactions({
        limit,
        page,
        from_date,
        to_date,
      }),

    queryKey: [queryKeys.transactions, limit, page, from_date, to_date],
    placeholderData: (data) => data,
  });
};
