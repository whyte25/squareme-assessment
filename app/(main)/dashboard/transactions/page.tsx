import { TableSkeleton } from "@/components/skeleton/table-skeleton";
import { TransactionTableMobileSkeleton } from "@/components/skeleton/transaction-table-mobile-skeleton";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { Suspense } from "react";

const TransactionsTableFallback = () => {
  return (
    <>
      {/* Mobile View Fallback */}
      <div className="md:hidden">
        <TransactionTableMobileSkeleton />
      </div>

      {/* Desktop View Fallback */}
      <div className="hidden w-full flex-col gap-10 md:flex">
        <div className="border-b pb-3">
          <h1 className="before:contents-[''] relative border-primary text-base font-semibold before:absolute before:-bottom-3 before:h-0.5 before:w-36 before:bg-primary">
            Transactions
          </h1>
        </div>
        <TableSkeleton />
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<TransactionsTableFallback />}>
      <TransactionsTable />
    </Suspense>
  );
}
