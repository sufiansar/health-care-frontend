import { ZodObject } from "zod";

export const zodValidator = <T>(payload: T, schema: ZodObject) => {
  const validatedData = schema.safeParse(payload);

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.issues.map((issue: any) => {
        return {
          field: issue.path[0],
          message: issue.message,
        };
      }),
    };
  }

  return {
    success: true,
    data: validatedData.data,
  };
};
