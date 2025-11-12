import { UserInfo } from "@/types/user.Interface";
import { getCookie } from "./tokenHandlers";
import jwt from "jsonwebtoken";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
      return null;
    }

    const verifyToken = jwt.verify(
      accessToken,
      process.env.ACCESSTOKEN_SECRET as string
    );
    if (!verifyToken) {
      return null;
    }

    const userInfo: UserInfo = {
      email: (verifyToken as jwt.JwtPayload).email as string,
      role: (verifyToken as jwt.JwtPayload).role,
      avatar: (verifyToken as jwt.JwtPayload).avatar as string | undefined,
    };

    return userInfo;
  } catch (error) {
    return null;
  }
};
