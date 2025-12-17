"use client";

import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/user.Interface";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import UserDropdown from "../Dashboard/UserDropDrown";
import { useAuthToken } from "@/hooks/useAuthToken";
import { ModeToggle } from "@/components/modeToggle";
interface NavbarAuthButtonsProps {
  initialHasToken: boolean;
  initialUserInfo: UserInfo | null;
  initialDashboardRoute: string;
}

export default function NavbarAuthButtons({
  initialHasToken,
  initialUserInfo,
  initialDashboardRoute,
}: NavbarAuthButtonsProps) {
  // Detect client-side auth state changes on navigation
  const clientHasToken = useAuthToken();

  // Use client token state if available, otherwise fall back to server state
  const hasToken = clientHasToken || initialHasToken;
  const userInfo = hasToken ? initialUserInfo : null;
  const dashboardRoute = initialDashboardRoute;

  if (hasToken && userInfo) {
    return (
      <>
        <Link href={dashboardRoute}>
          <Button variant="outline" className="gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <UserDropdown userInfo={userInfo} />
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button>Login</Button>
      </Link>

      <ModeToggle />
    </div>
  );
}
