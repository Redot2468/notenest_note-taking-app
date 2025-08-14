"use server";

import { getAuthSession } from "@/src/app/_utils/getSession";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import { eq } from "drizzle-orm";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Theme = "light" | "dark" | "system";

export async function updateThemeAction(theme: Theme) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  try {
    await db.update(users).set({ theme }).where(eq(users?.id, user?.id));

    revalidatePath("/");
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (process.env.NODE_ENV === "development") {
        throw new Error(
          `Something went wrong. ${error?.cause}. ${error?.message}`,
        );
      }
      throw new Error(`Something went wrong. ${error?.cause}`);
    }
  }
}
