import { serverFetch } from "@/lib/serverFatch";
import { UserInfo } from "@/types/user.Interface";

import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const response = await serverFetch.get("/auth/my-profile", {
      cache: "force-cache",
      next: { tags: ["user-info"] },
    });

    const result = await response.json();

    if (result.success) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const verifiedToken = jwt.verify(
        accessToken,
        process.env.ACCESSTOKEN_SECRET as string
      ) as JwtPayload;

      userInfo = {
        name: verifiedToken.name || "Unknown User",
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }

    userInfo = {
      name:
        result?.data?.admin?.name ||
        result?.data?.doctor?.name ||
        result?.data?.patient?.name ||
        result?.data?.name ||
        "Unknown User",
      ...result.data,
    };

    // console.log(result.data.name, "user g info from service");
    return userInfo;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "PATIENT",
    };
  }
};
