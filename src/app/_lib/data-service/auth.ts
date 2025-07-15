import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { cache } from "react";

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
