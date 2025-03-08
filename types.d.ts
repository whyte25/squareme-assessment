export interface PaginationMetadata {
  total_items: number;
  total_pages: number;
  items_per_page: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface Transaction {
  id: string;
  amount: string;
  transaction_id: string;
  transaction_type: "Transfer" | "Withdrawal" | "Deposit" | "Request";
  date: string;
  time: string;
  status: "Processed" | "Failed";
  createdAt: string;
}

export interface TransactionsApiResponse {
  status: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    pagination: PaginationMetadata;
  };
}

export interface TransactionsQueryParams {
  limit?: number;
  page?: number;
  from_date?: string;
  to_date?: string;
}
