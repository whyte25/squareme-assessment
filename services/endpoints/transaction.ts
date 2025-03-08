import { env } from "@/env";
import { TransactionsQueryParams } from "@/types";

const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;

export const DELETE_LEAD = `${baseUrl}/transactions`;

export const GET_TRANSACTIONS = ({
  limit,
  page,
  from_date,
  to_date,
}: TransactionsQueryParams) =>
  `${baseUrl}/transactions?limit=${limit || 6}${`&page=${page || 1}`}${from_date ? `&from_date=${from_date}` : ""}${to_date ? `&to_date=${to_date}` : ""}`;
