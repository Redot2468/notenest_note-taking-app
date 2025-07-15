"use server";

import { getUserByEmail } from "@/app/_lib/data-service/auth";
import { RegisterSchema } from "@/app/_lib/zod/authschema";
import { db } from "@/db";
import { users } from "@/db/schema/auth";
import bcrypt from "bcryptjs";
import z from "zod";

export async function registerAction(formData: z.infer<typeof RegisterSchema>) {
  const validatedCredentials = RegisterSchema.safeParse(formData);

  if (!validatedCredentials?.success) {
    return {
      error: "Inputs could not be validated, Try submitting again.",
    };
  }

  const { email, confirmPassword } = validatedCredentials?.data ?? {};

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Account already exists, please log in." };
  }

  const hashedPassword = await bcrypt.hash(confirmPassword, 10);

  try {
    await db.insert(users).values({ email, password: hashedPassword });

    console.log("successful");

    // if successfull

    //  generate verification token

    // send verification token

    // success message
    return {
      success:
        "Account successfully created, Check your mail inbox to verify your email",
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Something went wrong - ${error?.message}` };
    }
  }
}
