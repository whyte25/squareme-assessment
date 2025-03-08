"use client";

import { paths } from "@/constants/paths";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { Notification } from "./notification";
import { useSidebar } from "./ui/sidebar";
import { UserProfile } from "./user-profile";

export function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="sticky top-0 z-50 flex h-[70px] w-full items-center justify-between bg-[#FDFDFD] px-3 shadow-sm md:px-0 lg:px-3">
      <Menu
        onClick={toggleSidebar}
        className="h-5 w-5 text-primary md:hidden"
      />
      <Logo linkClassName="md:invisible w-fit" href={paths.private.home} />
      <div className="flex items-center">
        <Notification />
        <UserProfile />{" "}
      </div>
    </div>
  );
}
