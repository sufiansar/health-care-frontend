import { serverFetch } from "@/lib/serverFatch";
import { zodValidator } from "@/lib/zodValidator";
import { IAdmin } from "@/types/admin.interface";
import {
  CreateAdminPayloadSchema,
  UpdateAdminPayloadSchema,
} from "@/zod/admin.validation";

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

export const getAdminById = async (id: string) => {
  try {
    const res = await serverFetch.get(`/admin/${id}`);
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
