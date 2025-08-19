import { db } from "@/src/db";
import {
  emailVerificationToken,
  resetPasswordToken,
  users,
} from "@/src/db/schema/auth";
import { eq } from "drizzle-orm";
import { cache } from "react";

export async function getPasswordResetTokenByToken(token: string) {
  try {
    const existingToken = await db
      .select()
      .from(resetPasswordToken)
      .where(eq(resetPasswordToken?.token, token));

    return existingToken?.at(0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Something went wrong - ${error?.cause}`);
    }
  }
}

export async function getPasswordResetTokenByemail(email: string) {
  try {
    const existingToken = await db
      .select()
      .from(resetPasswordToken)
      .where(eq(resetPasswordToken?.email, email));

    return existingToken?.at(0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Something went wrong - ${error?.cause}`);
    }
  }
}

export const getUserById = cache(async function (id: string) {
  try {
    const user = await db.select().from(users).where(eq(users?.id, id));

    return user?.at(0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Something went wrong - ${error?.cause}`);
    }
  }
});

export async function getEmailVerificationTokenByToken(token: string) {
  try {
    const existingToken = await db
      .select()
      .from(emailVerificationToken)
      .where(eq(emailVerificationToken?.token, token));

    return existingToken?.at(0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Something went wrong - ${error?.cause}`);
    }
  }
}

export async function getEmailVerificationTokenByEmail(email: string) {
  try {
    const token = await db
      .select()
      .from(emailVerificationToken)
      .where(eq(emailVerificationToken?.email, email));

    return token?.at(0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Something went wrong - ${error?.cause}`);
    }
  }
}

export const getUserByEmail = cache(async function (email: string) {
  console.log(email, "email");
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users?.email, email));

    return existingUser?.at(0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error?.message}-${error?.cause}`);
    }
  }
});
