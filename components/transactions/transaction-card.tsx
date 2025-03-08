import { Transaction } from "@/types";
import { Card } from "../ui/card";
import { Status } from "./status";

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <Card className="rounded-lg bg-white px-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b py-4">
          <div className="text-sm text-gray-500">AMOUNT:</div>
          <div className="font-medium">{transaction.amount}</div>
        </div>

        <div className="flex items-center justify-between border-b py-4">
          <div className="text-sm text-gray-500">TRANSACTION TYPE:</div>
          <div className="font-medium text-[#535379]">
            {transaction.transaction_type}
          </div>
        </div>

        <div className="flex items-center justify-between border-b py-4">
          <div className="text-sm text-gray-500">DATE:</div>
          <div className="font-medium text-[#535379]">
            {transaction.date}, {transaction.time}
          </div>
        </div>

        <div className="flex items-center justify-between border-b py-4">
          <div className="text-sm text-gray-500">STATUS:</div>
          <div className="flex w-fit justify-end">
            <Status status={transaction.status} />
          </div>
        </div>
      </div>
    </Card>
  );
};
