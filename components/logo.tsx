import { Icons } from "@/constants/icons";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface LogoProps {
  className?: string;
  linkClassName?: string;
  logoWithText?: boolean;
  href: string;
}

export function Logo({
  className,
  linkClassName,
  logoWithText = true,
  href,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("flex w-full items-center gap-2", linkClassName)}
      data-testid="logo-link-id"
    >
      {logoWithText ? (
        <Icons.logo data-testid="logo-text-icon" />
      ) : (
        <Icons.logoIcon data-testid="logo-icon" className={className} />
      )}
    </Link>
  );
}
