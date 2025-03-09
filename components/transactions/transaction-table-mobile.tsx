import { QueryPagination } from "@/components/query/query-pagination";
import { paths } from "@/constants/paths";
import { Transaction } from "@/types";
import { GoBack } from "../ui/go-back";
import { TransactionsHeader } from "./header/transactions-header";
import { TransactionCard } from "./transaction-card";

interface ITransactionTableMobile {
  transactions: Transaction[];
  pagination?: {
    current_page: number;
    total_pages: number;
    total_items: number;
  };
}

export const TransactionTableMobile = ({
  transactions,
  pagination,
}: ITransactionTableMobile) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <GoBack
        href={paths.private.home}
        className="mr-auto"
        text="Transactions"
      />
      <TransactionsHeader />

      <div className="mt-2 flex flex-col gap-4">
        {transactions?.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>

      <QueryPagination
        current_page={pagination?.current_page || 1}
        total_pages={
          pagination?.total_pages || Math.ceil(transactions?.length / 6)
        }
        total_items={pagination?.total_items || transactions?.length}
      />
    </div>
  );
};
