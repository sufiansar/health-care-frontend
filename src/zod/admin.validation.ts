import { z } from "zod";

export const CreateAdminPayloadSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  admin: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email"),
    contactNumber: z
      .string()
      .regex(
        /^01[3-9]\d{8}$/,
        "Invalid Bangladeshi phone number (example: 01712345678)"
      ),
  }),
});
