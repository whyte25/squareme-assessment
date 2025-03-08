import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserProfile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex w-fit cursor-pointer items-center justify-between p-4"
          role="button"
          aria-label="User menu"
        >
          <div className="flex items-center space-x-1">
            <Avatar>
              <AvatarFallback className="bg-[#0CBC8B] text-white">
                GA
              </AvatarFallback>
            </Avatar>

            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
