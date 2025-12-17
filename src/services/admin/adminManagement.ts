import { serverFetch } from "@/lib/serverFatch";
import { zodValidator } from "@/lib/zodValidator";
import { IAdmin } from "@/types/admin.interface";
import {
  CreateAdminPayloadSchema,
  UpdateAdminPayloadSchema,
} from "@/zod/admin.validation";
import { revalidateTag } from "next/cache";

export const createAdmin = async (_prevState: any, formData: FormData) => {
  try {
    const payload: IAdmin = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
    };

    if (zodValidator(payload, CreateAdminPayloadSchema).success === false) {
      return zodValidator(payload, CreateAdminPayloadSchema);
    }
    const validatedPayload = zodValidator(
      payload,
      CreateAdminPayloadSchema
    ).data;

    if (!validatedPayload) {
      throw new Error("Invalid payload");
    }
    const newPayload = {
      Password: validatedPayload.password,
      admin: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        contactNumber: validatedPayload.contactNumber,
      },
    };
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(newPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("/user/admin-create", {
      body: newFormData,
      credentials: "include",
    });
    const result = await response.json();
    if (result.success) {
      revalidateTag("admins-list", { expire: 0 });
      revalidateTag("admins-page-1", { expire: 0 });
      revalidateTag("admin-dashboard-meta", { expire: 0 });
    }
    return result;
  } catch (error: any) {
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

export async function getAdmins(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await serverFetch.get(
      `/admin${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "admins-list",
            `admins-page-${page}`,
            `admins-search-${searchTerm}`,
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

export const updateAdmin = async (
  id: string,
  _prevState: any,
  formData: FormData
) => {
  try {
    const payload: IAdmin = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      contactNumber: formData.get("contactNumber") as string,
    };

    if (zodValidator(payload, UpdateAdminPayloadSchema).success === false) {
      return zodValidator(payload, UpdateAdminPayloadSchema);
    }
    const validatedPayload = zodValidator(
      payload,
      UpdateAdminPayloadSchema
    ).data;

    if (!validatedPayload) {
      throw new Error("Invalid payload");
    }

    const response = await serverFetch.patch(`/admin/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedPayload),
      credentials: "include",
    });
    const result = await response.json();
    if (result.success) {
      revalidateTag("admins-list", { expire: 0 });
      revalidateTag("admins-page-1", { expire: 0 });
      revalidateTag("admin-dashboard-meta", { expire: 0 });
    }
    return result;
  } catch (error: any) {
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

export const getAllAdmins = async (queryString?: string) => {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const res = await serverFetch.get(
      `/admin${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "admins-list",
            `admins-page-${page}`,
            `admins-search-${searchTerm}`,
          ],
          revalidate: 180,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch admins");
    }

    const result = await res.json();
    return result;
  } catch (error) {
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
export const getAdminById = async (id: string) => {
  try {
    const res = await serverFetch.get(`/admin/${id}`, {
      next: {
        tags: [`admin-${id}`, "admins-list"],
        revalidate: 180,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
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

export const deleteAdmin = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/admin/${id}`);
    const result = await res.json();
    if (result.success) {
      revalidateTag("admins-list", { expire: 0 });
      revalidateTag("admins-page-1", { expire: 0 });
      revalidateTag("admin-dashboard-meta", { expire: 0 });
    }
    return result;
  } catch (error: any) {
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
