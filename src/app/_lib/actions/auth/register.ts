"use server";

import { getUserByEmail } from "@/app/_lib/data-service/auth";
import { sendEmailVerifcationToken } from "@/app/_lib/data-service/mails";
import {
  generateEmailVerificationToken,
  getEmailVerificationTokenByToken,
} from "@/app/_lib/data-service/tokens";
import { RegisterSchema } from "@/app/_lib/zod/authschema";
import { db } from "@/db";
import { emailVerificationToken, users } from "@/db/schema/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import z from "zod";

export async function verifyEmailAction(token: string) {
  const existingToken = await getEmailVerificationTokenByToken(token);
  if (!existingToken) return { error: "Invalid token" };

  const hasExpired = new Date(existingToken?.token) < new Date();
  if (hasExpired) return { error: "Invalid token" };

  const tokenOwner = await getUserByEmail(existingToken?.email);

  if (!tokenOwner) {
    return { error: "Invalid token" };
  }

  try {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users?.id, tokenOwner?.id));

    await db
      .delete(emailVerificationToken)
      .where(eq(emailVerificationToken?.id, existingToken?.id));

    return { success: "Account successfully verified, please log in" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Something went wrong - ${error?.cause}` };
    }
  }
}

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

    //  generate verification token
    const verificationToken = await generateEmailVerificationToken(email);
    if (!verificationToken) {
      return { error: "Email verification token was not generated" };
    }

    // send verification token
    await sendEmailVerifcationToken(verificationToken?.token, email);

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
