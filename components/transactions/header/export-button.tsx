"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudDownload } from "lucide-react";

interface IExportButton {
  className?: string;
}

export const ExportButton = ({ className }: IExportButton) => {
  return (
    <Button
      className={cn(
        "flex items-center gap-2 bg-transparent text-gray-600",
        className,
      )}
      variant={"outline"}
    >
      <CloudDownload className="h-4 w-4 rotate-180" />
      Export All
    </Button>
  );
};
