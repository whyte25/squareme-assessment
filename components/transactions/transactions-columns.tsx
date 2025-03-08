"use client";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Transaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Status } from "./status";

export const TransactionsColumns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mt-1.5"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="AMOUNT" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.amount}</div>,
  },
  {
    accessorKey: "transaction_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRANSACTION ID" />
    ),

    cell: ({ row }) => (
      <div className="font-medium text-[#535379]">
        {row.original.transaction_id}
      </div>
    ),
  },
  {
    accessorKey: "transaction_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TRANSACTION TYPE" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-[#535379]">
        {row.original.transaction_type}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-[#535379]">{row.original.date}</div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TIME" />
    ),
    cell: ({ row }) => (
      <div className="font-medium text-[#535379]">{row.original.time}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return <Status status={status} />;
    },
  },
];
