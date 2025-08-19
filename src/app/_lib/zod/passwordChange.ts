import z from "zod";

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().trim().min(1, "Fill in your current password"),
    newPassword: z
      .string()
      .trim()
      .min(8, "New password must be 8 characters or more.")
      .regex(/[a-z]/, "Password must contain at least one lowercase")
      .regex(/[0-9]/, "Password must contain at least a number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character (#,@_,e.t.c)",
      )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),

    confirmNewPassword: z.string().trim().min(1, "Confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "Password does not match",
    path: ["confirmNewPassword"],
  });
