import { handleDrizzleError } from "@/src/app/_utils/errorHandler";
import { getAuthSession } from "@/src/app/_utils/getSession";
import { db } from "@/src/db";
import { notes } from "@/src/db/schema/notes";
import { and, arrayOverlaps, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getNotesByTag = cache(async function (tag: string) {
  const user = await getAuthSession();
  if (!user || !user?.id) {
    redirect("/auth/login");
  }

  try {
    const notesByTag = await db
      .select()
      .from(notes)
      .where(and(eq(notes.author, user.id), arrayOverlaps(notes.tags, [tag])));

    return notesByTag;
  } catch (error) {
    const appError = handleDrizzleError(error);

    if (process.env.NODE_ENV === "development" && error instanceof Error) {
      throw new Error(
        `Something went wrong: ${appError?.message}. ${error?.cause} `,
      );
    }
    throw new Error(`Something went wrong. ${appError?.userMessage}`);
  }
});

export const getTagsList = cache(async function () {
  const user = await getAuthSession();
  if (!user || !user?.id) {
    redirect("/auth/login");
  }

  try {
    const tags = await db
      .select({ tags: notes.tags })
      .from(notes)
      .where(eq(notes?.author, user.id));

    return tags;
  } catch (error) {
    const appError = handleDrizzleError(error);

    if (process.env.NODE_ENV === "development" && error instanceof Error) {
      throw new Error(
        `Something went wrong: ${appError?.message}. ${error?.cause} `,
      );
    }
    throw new Error(`Something went wrong. ${appError?.userMessage}`);
  }
});
