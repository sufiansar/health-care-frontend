import { serverFetchClient } from "@/lib/server-fatch";
import { zodValidator } from "@/lib/zodValidator";
import z, { json } from "zod";

const createSpecialityZodSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
});

export const createSpeciality = async (formData: FormData) => {
  try {
    const payload = { title: formData.get("title") as string };
    if (zodValidator(payload, createSpecialityZodSchema).success === false) {
      return zodValidator(payload, createSpecialityZodSchema);
    }

    const validatedData = zodValidator(payload, createSpecialityZodSchema).data;
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedData));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as File);
    }

    const res = await serverFetchClient.post(`/specialties`, {
      body: newFormData,
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Speciality creation failed."
      }`,
    };
  }
};

export const getSpecialities = async () => {
  try {
    const res = await serverFetchClient.get(`/specialties`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Fetching specialities failed."
      }`,
    };
  }
};

export const deleteSpeciality = async (id: string) => {
  try {
    const res = await serverFetchClient.delete(`/specialties/${id}`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Speciality deletion failed."
      }`,
    };
  }
};
