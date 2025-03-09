"use client";
import { QueryDatePicker } from "@/components/query/query-datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExportButton } from "./export-button";

export const TransactionsHeader = () => {
  return (
    <div className="border-b pb-3 pt-5">
      <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
        <div className="flex w-full items-center justify-between md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[155px] rounded-md border-none bg-transparent pl-0 hover:bg-accent md:min-w-[165px] md:px-3">
              <SelectValue placeholder="All Accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="savings">Savings Account</SelectItem>
              <SelectItem value="checking">Checking Account</SelectItem>
              <SelectItem value="business">Business Account</SelectItem>
            </SelectContent>
          </Select>
          <ExportButton className="md:hidden" />
        </div>
        <div className="flex w-full items-center gap-3 md:ml-auto md:w-fit">
          <div className="flex flex-1 items-center gap-2 md:flex-auto">
            <span className="md:mr0 mr-auto text-sm font-medium text-gray-500 md:text-base">
              Select Date Range:{" "}
            </span>
            <QueryDatePicker />
          </div>
          <ExportButton className="hidden md:flex" />
        </div>
      </div>
    </div>
  );
};
