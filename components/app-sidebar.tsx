"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { paths } from "@/constants/paths";
import { sidebarItems } from "@/constants/sidebar-links";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Icons } from "@/constants/icons";
import { Logo } from "./logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const toggleOnMobile = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible={"icon"} {...props}>
      <SidebarHeader>
        <SidebarMenu className={cn("space-y-4 pt-3", !isCollapsed && "px-1.5")}>
          <SidebarMenuItem className="flex items-center justify-between">
            <Logo
              logoWithText={!isCollapsed}
              href={paths.private.home}
              linkClassName={cn(isCollapsed ? "w-full justify-center" : "ml-1")}
            />
            {!isCollapsed && (
              <SidebarMenuButton className="w-fit" asChild>
                <SidebarTrigger className="ml-auto text-[#04004D]" />
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>

          {isCollapsed && (
            <SidebarMenuButton size={"lg"} asChild>
              <SidebarTrigger className="text-[#04004D]" />
            </SidebarMenuButton>
          )}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent
            className={cn("h-full pt-5", !isCollapsed && "px-1.5")}
          >
            <SidebarMenu className="gap-2">
              {sidebarItems.map((item) => (
                <SidebarMenuItem className="w-full" key={item.label}>
                  <SidebarMenuButton
                    size={"lg"}
                    asChild
                    tooltip={item.label}
                    className={cn(
                      "h-10 px-3 text-[#04004D]",
                      isCollapsed &&
                        "flex items-center justify-center group-data-[collapsible=icon]:!w-full",
                    )}
                    onClick={toggleOnMobile}
                    isActive={pathname === item.path}
                    data-testid={`sidebar-button-${item.label.toLowerCase()}`}
                  >
                    <Link
                      scroll={false}
                      href={item?.path as string}
                      data-testid={`nav-link-${item.label.toLowerCase()}`}
                    >
                      <span data-testid={`${item.label.toLowerCase()}-icon`}>
                        <item.icon className="size-5" />
                      </span>
                      {!isCollapsed && (
                        <span data-testid={`${item.label.toLowerCase()}-label`}>
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton className="h-10 items-center px-3 pb-2.5" asChild>
          <Link scroll={false} href={paths.auth.login}>
            <span>
              <Icons.logout className="size-5 shrink-0" />
            </span>
            {!isCollapsed && <span className="mb-0.5">Logout</span>}
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
