/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/serverFatch";
import { createPatientZodSchema } from "@/zod/patient.validation";
import { loginUser } from "./loginUsers";
// import { registerValidationZodSchema } from "@/zod/patient.validation";

export const registerPatient = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    console.log(formData.get("address"));
    const validationData = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (
      zodValidator(validationData, createPatientZodSchema).success === false
    ) {
      return zodValidator(validationData, createPatientZodSchema);
    }

    const validatedData: any = zodValidator(
      validationData,
      createPatientZodSchema
    ).data;

    const registerData = {
      password: validatedData.password,
      patient: {
        name: validatedData.name,
        address: validatedData.address,
        email: validatedData.email,
      },
    };

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post(`/auth/register-patient`, {
      body: newFormData,
    });

    const result = await res.json();

    console.log(res, "res");

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    };
  }
};
