import { z } from "zod";

/* --- Create Admin Schema --- */
export const CreateAdminPayloadSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  admin: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    contactNumber: z
      .string()
      .regex(
        /^01[3-9]\d{8}$/,
        "Invalid Bangladeshi phone number (example: 01712345678)"
      ),
    profilePhoto: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

/* --- Update Admin Schema --- */
export const UpdateAdminPayloadSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  admin: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email").optional(),
    contactNumber: z
      .string()
      .regex(
        /^01[3-9]\d{8}$/,
        "Invalid Bangladeshi phone number (example: 01712345678)"
      )
      .optional(),
    profilePhoto: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
