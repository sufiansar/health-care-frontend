import { redirect } from "next/navigation";
import { deleteCookie } from "./tokenHandlers";

export const logOutUser = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");

  redirect("/login");
};
