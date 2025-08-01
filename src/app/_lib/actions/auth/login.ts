"use server";

import { getUserByEmail } from "@/app/_lib/data-service/auth";
import { sendEmailVerifcationMail } from "@/app/_lib/data-service/mails";
import { generateEmailVerificationToken } from "@/app/_lib/data-service/tokens";
import { LoginSchema } from "@/app/_lib/zod/authschema";
import { signIn } from "@/src/auth";

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

  //   check if the user exists,
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    console.log(existingUser?.emailVerified, "email verified");
    if (!existingUser?.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(email);

      if (!verificationToken)
        return { error: "Verification token was not created." };

      await sendEmailVerifcationMail(verificationToken?.token, email);

      return {
        success: "Check your mail inbox to verify your email",
      };
    }
  }

  // if user hasn't verified his mail, block from the signin callback

  // check if the user has verified his mail
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Welcome back" };
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
}
