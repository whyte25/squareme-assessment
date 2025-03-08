import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function TransactionTableMobileSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Header skeleton */}
      <div className="border-b pb-3 pt-5">
        <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Skeleton className="h-10 w-[155px]" />
            <Skeleton className="h-10 w-[100px] md:hidden" />
          </div>
          <div className="flex w-full items-center gap-3 md:ml-auto md:w-fit">
            <div className="flex flex-1 items-center gap-2 md:flex-auto">
              <span className="md:mr0 mr-auto text-sm font-medium text-gray-500 md:text-base">
                Select Date Range:{" "}
              </span>
              <Skeleton className="h-10 w-[160px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction cards skeleton */}
      <div className="mt-2 flex flex-col gap-4">
        {[0, 1, 2].map((_, i) => (
          <Card key={i} className="rounded-lg bg-white px-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between border-b py-4">
                <div className="text-sm text-gray-500">AMOUNT:</div>
                <Skeleton className="h-4 w-[100px]" />
              </div>

              <div className="flex items-center justify-between border-b py-4">
                <div className="text-sm text-gray-500">TRANSACTION TYPE:</div>
                <Skeleton className="h-4 w-[120px]" />
              </div>

              <div className="flex items-center justify-between border-b py-4">
                <div className="text-sm text-gray-500">DATE:</div>
                <Skeleton className="h-4 w-[150px]" />
              </div>

              <div className="flex items-center justify-between border-b py-4">
                <div className="text-sm text-gray-500">STATUS:</div>
                <div className="flex w-fit justify-end">
                  <Skeleton className="h-6 w-[100px] rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-8 w-[100px]" />
        <div className="flex gap-2">
          {[0, 1, 2].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8" />
          ))}
        </div>
        <Skeleton className="h-8 w-[100px]" />
      </div>
    </div>
  );
}
