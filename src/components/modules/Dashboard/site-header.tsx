"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "../../ui/input";
import { Bell, Search } from "lucide-react";
import UserDropdown from "./UserDropDrown";
import { UserInfo } from "@/types/user.Interface";
import { useState } from "react";
import AISearchDialog from "../shared/AISSearchDialog";
import NotificationDropdown from "./NotificationDropdown";
interface DashboardNavbarProps {
  userInfo: UserInfo | null;
}

export function SiteHeader({ userInfo }: DashboardNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setAiDialogOpen(true);
    }
  };

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      setAiDialogOpen(true);
    }
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* Search Bar & AI Search */}
        <div className="flex-1 flex items-center justify-end gap-2">
          {/* Search Input */}
          <div className="relative w-full hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
              onClick={handleSearchIconClick}
            />
            <Input
              type="text"
              placeholder="Search doctors by symptoms..."
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          {/* AI Search Dialog */}
          <AISearchDialog
            initialSymptoms={searchQuery}
            externalOpen={aiDialogOpen}
            onOpenChange={(open) => {
              setAiDialogOpen(open);
              if (!open) setSearchQuery("");
            }}
            onSearchComplete={() => setSearchQuery("")}
          />
        </div>
        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <NotificationDropdown />

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
}
