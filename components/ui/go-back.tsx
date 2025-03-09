import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "./button";

interface IGoBack {
  className?: string;
  hiddenIcon?: boolean;
  text: string;
  href: string;
}

export const GoBack = ({ className, hiddenIcon, text, href }: IGoBack) => {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "ghost",
        className: cn(
          "-ml-3 rounded-md p-0 !px-1 font-medium hover:bg-gray-100 md:px-2",
          className,
        ),
      })}
    >
      {!hiddenIcon && <ChevronLeft className="h-4 w-4" />}
      {text}
    </Link>
  );
};
