import { AppSidebar } from "@/components/modules/Dashboard/app-sidebar";
import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getNavItemsByRole } from "@/lib/navItem.confiq";
import { getUserInfo } from "@/services/getUserInfo";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const userInfo = await getUserInfo();
  const role = userInfo?.role || "PATIENT";
  const navItems = getNavItemsByRole(role);
  return (
    <div>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar userInfo={userInfo} navItems={navItems} variant="inset" />
        <SidebarInset>
          <DashboardNavbar />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 pl-5 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default layout;
