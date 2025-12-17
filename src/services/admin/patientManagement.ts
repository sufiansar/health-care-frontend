import { serverFetch } from "@/lib/serverFatch";
import { zodValidator } from "@/lib/zodValidator";
import { updatePatientZodSchema } from "@/zod/patient.validation";
import { revalidateTag } from "next/cache";

export async function getPatients(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(
      `/patient${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "patients-list",
            `patients-page-${page}`,
            `patients-search-${searchTerm}`,
          ],
          revalidate: 180,
        },
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

export const patientGetById = async (id: string) => {
  try {
    const response = await serverFetch.get(`/patient/${id}`, {
      next: {
        tags: [`patient-${id}`, "patients-list"],
        revalidate: 180,
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
};
export const deletePatientById = async (id: string) => {
  try {
    const response = await serverFetch.delete(`/patient/${id}`);
    const result = await response.json();
    if (result.success) {
      revalidateTag("patients-list", { expire: 0 });
      revalidateTag(`patient-${id}`, { expire: 0 });
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

export const updatePatientById = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  const validatedPayload: any = {
    name: formData.get("name") as string,
    contactNumber: formData.get("contactNumber") as string,
    address: formData.get("address") as string,
  };

  const validation = zodValidator(validatedPayload, updatePatientZodSchema);
  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validation.errors,
      errors: validation.errors,
    };
  }

  try {
    const response = await serverFetch.put(`/patient/${id}`, {
      body: JSON.stringify(validation.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.json();
      return (
        err || {
          success: false,
          message: "Failed to update patient",
        }
      );
    }

    const result = await response.json();
    if (result.success) {
      revalidateTag("patients-list", { expire: 0 });
      revalidateTag(`patient-${id}`, { expire: 0 });
      revalidateTag("patient-dashboard-meta", { expire: 0 });
      revalidateTag("admin-dashboard-meta", { expire: 0 });
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
