import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/getUserInfo";

const MyProfilePage = async () => {
  const res = await getUserInfo();
  console.log(res, "userInfo in my profile page");

  return <MyProfile userInfo={res} />;
};

export default MyProfilePage;
