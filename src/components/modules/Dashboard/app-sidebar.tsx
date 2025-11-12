"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/modules/Dashboard/nav-main";
import type { UserInfo } from "@/types/user.Interface";
import type { NavSection } from "@/types/dashboard.Interface";
import * as Icons from "lucide-react";
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userInfo: UserInfo | null;
  navItems: NavSection[];
}

export function AppSidebar({ userInfo, navItems, ...props }: AppSidebarProps) {
  const allNavItems = navItems.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      icon: item.icon ? (Icons as any)[item.icon] : undefined,
    }))
  );
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard" className="text-lg font-semibold">
                Ph Health
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {userInfo && (
            <SidebarMenuItem className="mt-3 px-2">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-primary">{userInfo.name}</p>
                <p className="text-xs">{userInfo.email}</p>
                <p className="text-[10px] text-gray-500 mt-1">
                  Role: {userInfo.role}
                </p>
              </div>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={allNavItems} />
      </SidebarContent>
    </Sidebar>
  );
}
