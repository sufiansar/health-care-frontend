/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFatch";
import { getUserInfo } from "../getUserInfo";

export async function getDashboardMetaData() {
  try {
    const userInfo = await getUserInfo();
    const cacheTag = `${userInfo.role.toLowerCase()}-dashboard-meta`;

    const response = await serverFetch.get("/meta", {
      next: {
        tags: [cacheTag, "dashboard-meta", "meta-data"],
        revalidate: 30,
      },
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
