import { serverFetch } from "@/lib/serverFatch";

export const appointmentCreate = async (
  doctorId: string,
  scheduleId: string
) => {
  try {
    const response = await serverFetch.post("/appointment", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doctorId, scheduleId }),
    });

    if (!response.ok) {
      const err = await response.json();
      return (
        err || {
          success: false,
          message: "Failed to create appointment",
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
