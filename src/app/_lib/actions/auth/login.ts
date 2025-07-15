"use server";

import { LoginSchema } from "@/app/_lib/zod/authschema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import z from "zod";

export async function loginAction(prevState: unknown, formData: FormData) {
  const loginCredentials = Object.fromEntries(formData.entries());
  const validatedCredentials = LoginSchema.safeParse(loginCredentials);

  if (!validatedCredentials?.success) {
    return {
      formErrors: z.treeifyError(validatedCredentials?.error)?.properties,
      inputs: {
        email: loginCredentials?.login,
      },
    };
  }

  const { email, password } = validatedCredentials?.data ?? {};
  const callbackUrl = formData.get("callbackUrl") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error?.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
            inputs: {
              email,
            },
          };

        default:
          return { error: "Something went wrong" };
      }
    }
  }

  return { success: "Welcome back" };
}
