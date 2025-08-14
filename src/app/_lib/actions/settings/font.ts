"use server";

import { getAuthSession } from "@/src/app/_utils/getSession";
import { Font } from "@/src/app/_utils/types";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import { eq } from "drizzle-orm";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { redirect } from "next/navigation";

export async function updateFontAction(font: Font) {
  const session = await getAuthSession();
  if (!session || !session?.id) redirect("/auth/login");

  try {
    await db.update(users).set({ font }).where(eq(users?.id, session?.id));
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (process.env.NODE_ENV === "development") {
        throw new Error(
          `Something went wrong. ${error?.cause}. ${error?.message}`,
        );
      }
      throw new Error(`Something went wrong. ${error?.cause}`);
    }

    throw new Error("Something went wrong");
  }
}
