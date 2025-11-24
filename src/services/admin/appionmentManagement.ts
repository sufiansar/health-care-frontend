import { serverFetch } from "@/lib/serverFatch";

export const getAllAppionments = async (queryString?: string) => {
  try {
    const response = await serverFetch.get(
      `/appointment${queryString ? `?${queryString}` : ""}`
    );
    if (!response.ok) {
      const err = await response.json();
      return (
        err || {
          success: false,
          message: "Failed to fetch appointments",
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
