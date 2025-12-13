import { SiteHeader } from "@/components/modules/Dashboard/site-header";
import { getUserInfo } from "@/services/getUserInfo";

import { UserInfo } from "@/types/user.Interface";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  return (
    <div>
      <SiteHeader userInfo={userInfo} />
    </div>
  );
};

export default DashboardNavbar;
