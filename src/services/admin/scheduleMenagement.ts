import { serverFetch } from "@/lib/serverFatch";
import { zodValidator } from "@/lib/zodValidator";
import { createScheduleZodSchema } from "@/zod/schedule.validation";

export const createSchedule = async (_prevState: any, formData: FormData) => {
  const validatedPayload: any = {
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
  };

  const validation = zodValidator(validatedPayload, createScheduleZodSchema);
  if (!validation.success && validation.errors) {
    return {
      success: validation.success,
      message: "Validation failed",
      formData: validatedPayload,
      errors: validation.errors,
    };
  }

  if (!validation.data) {
    return {
      success: false,
      message: "Validation failed",
      formData: validatedPayload,
    };
  }

  try {
    const response = await serverFetch.post("/schedule/create-schedule", {
      body: JSON.stringify(validation.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      return (
        err || {
          success: false,
          message: "Failed to create schedule",
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
