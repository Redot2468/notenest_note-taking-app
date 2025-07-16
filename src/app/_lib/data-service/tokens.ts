import { getEmailVerificationTokenByEmail } from "@/app/_lib/data-service/auth";
import { db } from "@/db";
import { emailVerificationToken } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { v4 as uuidv4 } from "uuid";

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

export const generateEmailVerificationToken = cache(async function (
  email: string,
) {
  const token = uuidv4();
  const expires = new Date(Date.now() + 30 * 60 * 1000);

  const emailHasExistingToken = await getEmailVerificationTokenByEmail(email);

  try {
    if (emailHasExistingToken) {
      await db
        .delete(emailVerificationToken)
        .where(eq(emailVerificationToken?.token, emailHasExistingToken?.token));
    }

    const newToken = await db
      .insert(emailVerificationToken)
      .values({ token, expires, email })
      .returning();

    return newToken?.at(0);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Something went wrong - ${error?.cause}`);
    }
  }
});
