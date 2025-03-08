"use client";
import { TableEmptyState } from "@/components/empty-state/table-empty-state";
import { QueryPagination } from "@/components/query/query-pagination";
import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { TransactionTableMobileSkeleton } from "@/components/skeleton/transaction-table-mobile-skeleton";
import { DataTableWithFilter } from "@/components/ui/data-table-with-filter";
import { useGettransactions } from "@/hooks/queries/use-get-transactions";
import { parseAsInteger, useQueryState } from "nuqs";
import { Card } from "../ui/card";
import { TransactionsHeader } from "./header/transactions-header";
import { TransactionTableMobile } from "./transaction-table-mobile";
import { TransactionsColumns } from "./transactions-columns";

export const TransactionsTable = () => {
  const [urlFrom] = useQueryState("from");
  const [urlTo] = useQueryState("to");
  const [page] = useQueryState("page", parseAsInteger);
  const [limit] = useQueryState("limit", parseAsInteger);

  const { data, isLoading, isError, refetch } = useGettransactions({
    limit: limit!,
    page: page!,
    from_date: urlFrom!,
    to_date: urlTo!,
  });

  const transactions = data?.data?.transactions;

  return (
    <>
      {/* Mobile View - Shown on small screens, hidden on medium and up */}
      <div className="flex w-full flex-col gap-3 md:hidden">
        {isLoading ? (
          <TransactionTableMobileSkeleton />
        ) : (
          <div>
            <TransactionTableMobile
              transactions={transactions!}
              pagination={{
                current_page: data?.data?.pagination?.current_page!,
                total_pages: data?.data?.pagination?.total_pages!,
                total_items: data?.data?.pagination?.total_items!,
              }}
            />
          </div>
        )}
      </div>

      {/* Desktop View - Hidden on small screens, shown on medium and up */}
      <div className="hidden w-full flex-col gap-10 md:flex">
        <TransactionsHeader />
        <Card className="rounded-lg bg-white">
          {isLoading ? (
            <TableSkeleton />
          ) : transactions?.length! > 0 ? (
            <div>
              <DataTableWithFilter
                columns={TransactionsColumns}
                data={transactions!}
              />

              <QueryPagination
                current_page={data?.data?.pagination?.current_page!}
                total_pages={data?.data?.pagination?.total_pages!}
                total_items={data?.data?.pagination?.total_items!}
              />
            </div>
          ) : isError ? (
            <div className="">
              <TableEmptyState
                columns={TransactionsColumns}
                title="Something went wrong"
                description="Please try again."
                onClick={refetch}
              />
            </div>
          ) : (
            <div className="">
              <TableEmptyState
                columns={TransactionsColumns}
                title="Transactions table is empty."
                description="When you have a transaction, it will appear here."
              />
            </div>
          )}
        </Card>
      </div>
    </>
  );
};
