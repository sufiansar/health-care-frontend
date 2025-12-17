import { serverFetch } from "@/lib/serverFatch";
import { revalidateTag } from "next/cache";

export const getAllAppionments = async (queryString?: string) => {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const status = searchParams.get("status") || "all";
    const response = await serverFetch.get(
      `/appointment${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "appointments-list",
            `appointments-page-${page}`,
            `appointments-status-${status}`,
          ],
          revalidate: 120,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Something went wrong"
      }`,
    };
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/appointment/${id}`);
    if (!response.ok) {
      const err = await response.json();
      return (
        err || {
          success: false,
          message: "Failed to fetch appointment",
        }
      );
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? (error as Error).message
          : "Something went wrong"
      }`,
    };
  }
};

export const changeAppointmentStatus = async (id: string, status: string) => {
  try {
    const response = await serverFetch.patch(`/appointment/status/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const err = await response.json();
      return (
        err || {
          success: false,
          message: "Failed to change appointment status",
        }
      );
    }

    const result = await response.json();
    if (result.success) {
      revalidateTag("appointments-list", { expire: 0 });
      revalidateTag(`appointment-${id}`, { expire: 0 });
      revalidateTag("my-appointments", { expire: 0 });
      revalidateTag("admin-dashboard-meta", { expire: 0 });
      revalidateTag("doctor-dashboard-meta", { expire: 0 });
      revalidateTag("patient-dashboard-meta", { expire: 0 });
      revalidateTag("dashboard-meta", { expire: 0 });
    }

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
};
