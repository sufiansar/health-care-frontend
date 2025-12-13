"use server";

import { serverFetch } from "@/lib/serverFatch";
import { getNewAccessToken } from "../auth/auth.service";

export async function getDoctorOwnSchedules(queryString?: string) {
  try {
    // const response = await serverFetch.get(
    //   `/doctor-schedule/my-schedules${queryString ? `?${queryString}` : ""}`
    // );
    const response = await serverFetch.get(
      `/doctor-schedule/${queryString ? `?${queryString}` : ""}`
    );

    const result = await response.json();
    console.log(result);
    return {
      success: result.success,
      //   data: Array.isArray(result.data) ? result.data : [],
      data: result.data || [],
      meta: result.meta,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      data: [],
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getAvailableSchedules() {
  try {
    const response = await serverFetch.get(`/schedule`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
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
export async function createDoctorSchedule(schedulesIds: string[]) {
  try {
    const response = await serverFetch.post(
      `/doctor-schedule/create-doctor-schedule`,

      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ schedulesIds }),
      }
    );
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

export async function deleteDoctorOwnSchedule(scheduleId: string) {
  try {
    const response = await serverFetch.delete(
      `/doctor-schedule/${scheduleId}`,
      {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();

    return {
      success: result.success,
      message: result.message || "Schedule removed successfully",
    };
  } catch (error: any) {
    console.error("Delete schedule error:", error);
    return {
      success: false,
      message: error.message || "Failed to remove schedule",
    };
  }
}
