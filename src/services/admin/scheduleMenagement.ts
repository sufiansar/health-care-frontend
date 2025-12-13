import { serverFetch } from "@/lib/serverFatch";
import { zodValidator } from "@/lib/zodValidator";
import { createScheduleZodSchema } from "@/zod/schedule.validation";

export async function createSchedule(_prevState: any, formData: FormData) {
  const validationPayload = {
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
  };

  const validation = zodValidator(validationPayload, createScheduleZodSchema);

  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validation.errors,
    };
  }

  if (!validation.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
    };
  }

  try {
    const response = await serverFetch.post("/schedule/create-schedule", {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Create schedule error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create schedule",
      formData: validationPayload,
    };
  }
}

export const getSchedules = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(
      `/schedule/get-schedules${queryString ? `?${queryString}` : ""}`
    );
    if (!response.ok) {
      const err = await response.json().catch(() => null);
      return (
        err || {
          success: false,
          message: "Failed to fetch schedules",
        }
      );
    }
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
};
export const getScheduleById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/schedule/${id}`);
    if (!response.ok) {
      const err = await response.json().catch(() => null);
      return (
        err || {
          success: false,
          message: "Failed to fetch schedule",
        }
      );
    }
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
};

export const deleteScheduleById = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/specialties/${id}`);

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      return (
        err || {
          success: false,
          message: "Failed to delete speciality",
        }
      );
    }

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
};
