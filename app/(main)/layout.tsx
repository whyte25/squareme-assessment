import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <Navbar />
          <div className="h-full rounded-lg bg-gray-100/50 p-5">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
