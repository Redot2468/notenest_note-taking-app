import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email("Please fill in a valid email address").trim(),
  password: z.string().min(1, "Please fill in your password").trim(),
});

export const RegisterSchema = z
  .object({
    email: z.email("Please fill in a valid email address!").trim(),

    password: z
      .string()
      .min(1, "Please fill in a password!")
      .regex(/[a-z]/, "Password must contain at least one lowercase")
      .regex(/[0-9]/, "Password must contain at least a number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character (#,@_,e.t.c)",
      )
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),

    confirmPassword: z.string().trim().min(1, "Please confirm password"),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    error: "Password does not match!",
    path: ["confirmPassword"],
  });

// start validating using zod and react-hook-form in the registerFormComponent
