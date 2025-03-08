"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusProps {
  status: string;
}

export const Status = ({ status }: StatusProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "items- flex h-8 w-full justify-center gap-1.5 rounded-full border px-3 py-1 font-normal",
        status === "Processed"
          ? "border-green-600 bg-green-600/10 text-green-900"
          : "border-red-600 bg-red-600/10 text-red-900",
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          status === "Processed" ? "bg-green-600" : "bg-red-600",
        )}
      />
      {status}
    </Badge>
  );
};
