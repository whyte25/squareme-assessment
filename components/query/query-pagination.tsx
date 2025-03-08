import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { PaginationMetadata } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTransition } from "react";
import { Button } from "../ui/button";

interface QueryPaginationProps {
  current_page: PaginationMetadata["current_page"];
  total_pages: PaginationMetadata["total_pages"];
  total_items: PaginationMetadata["total_items"];
}

export function QueryPagination({
  current_page,
  total_pages,
  total_items,
}: QueryPaginationProps) {
  const [isRefetching, startTransition] = useTransition();
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(6));

  const handlePageChange = async (newPage: number) => {
    startTransition(async () => {
      await setPage(newPage);
    });
  };

  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (total_pages <= maxPagesToShow) {
      for (let i = 1; i <= total_pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (current_page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(-1); // Represents ellipsis
        pageNumbers.push(total_pages);
      } else if (current_page >= total_pages - 2) {
        pageNumbers.push(1);
        pageNumbers.push(-1);
        for (let i = total_pages - 3; i <= total_pages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(-1);
        pageNumbers.push(current_page - 1);
        pageNumbers.push(current_page);
        pageNumbers.push(current_page + 1);
        pageNumbers.push(-1);
        pageNumbers.push(total_pages);
      }
    }

    return pageNumbers;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-between gap-3 border-t px-2 py-2.5 max-sm:flex-col">
      <div className="flex justify-start">
        <p className="text-sm text-[#696D8C]">
          Showing {limit * current_page} of {total_items} results
        </p>
      </div>
      <div className="justify-center md:-ml-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 disabled:pointer-events-none disabled:bg-gray-100 disabled:opacity-50"
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1 || isRefetching}
                aria-label="Go to previous page"
              >
                <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </PaginationItem>

            {pages.map((pageNum, idx) => {
              if (pageNum === -1) {
                return (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={pageNum}>
                  <Button
                    size="icon"
                    className="h-8 w-8"
                    variant={pageNum === current_page ? "default" : "ghost"}
                    onClick={() => handlePageChange(pageNum) || isRefetching}
                    aria-current={pageNum === current_page ? "page" : undefined}
                  >
                    {pageNum}
                  </Button>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => handlePageChange(current_page + 1)}
                disabled={current_page === total_pages}
                aria-label="Go to next page"
              >
                <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className=""></div>
    </div>
  );
}
