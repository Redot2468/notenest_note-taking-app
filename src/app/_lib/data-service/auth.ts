import { db } from "@/db";
import { emailVerificationToken, users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { cache } from "react";

export async function getUserById(id: string) {
  try {
    const user = await db.select().from(users).where(eq(users?.id, id));

    return user?.at(0);
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
