import instance from "@/lib/instance";
import { TransactionsApiResponse, TransactionsQueryParams } from "@/types";
import { DELETE_LEAD, GET_TRANSACTIONS } from "../endpoints/transaction";

export const getTransactions = ({
  limit,
  page,
  from_date,
  to_date,
}: TransactionsQueryParams): Promise<TransactionsApiResponse> => {
  return instance.get(
    GET_TRANSACTIONS({
      limit,
      page,
      from_date,
      to_date,
    }),
  );
};

interface DeleteTransactionPayload {
  transaction_ids: string[];
}

export const deleteTransactions = async (payload: DeleteTransactionPayload) => {
  const response = await instance.delete(DELETE_LEAD, { data: payload });
  return response.data;
};
