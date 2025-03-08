"use client";

import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";

interface AccountDetailsCardProps {
  amount: string;
  accountName: string;
  bankName: string;
}

export function AccountDetailsCard({
  amount,
  accountName,
  bankName,
}: AccountDetailsCardProps) {
  return (
    <Card className={`w-full p-4 sm:w-fit`}>
      <div className="space-y-2">
        <p className="text-sm uppercase text-muted-foreground">
          ACCOUNT DETAILS
        </p>

        <div className="space-y-1">
          <p className="text-sm uppercase">{bankName}</p>

          <div className="flex items-center justify-between gap-16 md:justify-normal">
            <h2 className="text-xl font-semibold">₦{amount}</h2>

            <CopyButton variant={"secondary"} value={amount} className="mr-1" />
          </div>

          <p className="text-sm uppercase md:hidden">{accountName}</p>
        </div>
      </div>
    </Card>
  );
}
