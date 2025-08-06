import { handleDrizzleError } from "@/src/app/_utils/errorHandler";
import { getAuthSession } from "@/src/app/_utils/getSession";
import { db } from "@/src/db";
import { notes } from "@/src/db/schema/notes";
import { and, arrayOverlaps, eq, ilike, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getNoteBySearch = cache(async function (
  query: string | undefined,
) {
  const user = await getAuthSession();
  if (!user || !user.id) {
    redirect("/auth/login");
  }

  try {
    if (query) {
      const notesBySearch = await db
        .select()
        .from(notes)
        .where(
          and(
            eq(notes.author, user?.id),
            or(
              ilike(notes?.title, `%${query}%`),
              arrayOverlaps(notes?.tags, [query.toLowerCase()]),
              ilike(notes?.content, `%${query}%`),
            ),
          ),
        );

      return notesBySearch;
    }
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
