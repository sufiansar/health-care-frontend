"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import z from "zod";

// ✅ Zod schema for validation
const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.string().email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ✅ Server Action
export const registerPatient = async (formData: FormData) => {
  try {
    // Convert FormData to object
    const patientInfo = Object.fromEntries(formData.entries());

    // Validate input fields
    const validated = registerValidationZodSchema.safeParse(patientInfo);
    if (!validated.success) {
      return {
        success: false,
        errors: validated.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    const registerData = {
      password: patientInfo.password,
      patient: {
        name: patientInfo.name,
        address: patientInfo.address,
        email: patientInfo.email,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create-patient`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      }
    );

    const result = await res.json();
    console.log(result, "Patient registration result");

    if (result?.id) {
      revalidateTag("PATIENTS", "default");
      redirect("/"); // or change to your success route
    }

    return result;
  } catch (error) {
    console.error(error);
    return { error: "Registration failed" };
  }
};
