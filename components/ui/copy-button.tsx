"use client";

import { CheckIcon } from "lucide-react";
import * as React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/constants/icons";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends ButtonProps {
  value: string;
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-9 w-fit shrink-0 rounded-xl bg-purple-100 p-2 font-normal text-purple-600 hover:bg-purple-200 [&_svg]:size-4",
        className,
      )}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      {hasCopied ? <CheckIcon /> : <Icons.copy />}
      {hasCopied ? "Copied" : "Copy"}
    </Button>
  );
}
