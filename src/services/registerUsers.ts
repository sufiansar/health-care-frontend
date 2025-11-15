/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUsers";
import { zodValidator } from "@/lib/zodValidator";
import { serverFetchClient } from "@/lib/server-fatch";

const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, {
        error: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error:
        "Confirm Password is required and must be at least 6 characters long",
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

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
      zodValidator(validationData, registerValidationZodSchema).success ===
      false
    ) {
      return zodValidator(validationData, registerValidationZodSchema);
    }

    const validatedData: any = zodValidator(
      validationData,
      registerValidationZodSchema
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

    const res = await serverFetchClient.post(`/auth/register-patient`, {
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
