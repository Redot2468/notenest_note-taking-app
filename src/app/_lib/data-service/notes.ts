import { getAuthSession } from "@/src/app/_utils/getSession";
import { db } from "@/src/db";
import { notes } from "@/src/db/schema/notes";
import { and, DrizzleError, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getNotes = cache(async function () {
  const user = await getAuthSession();
  if (!user || !user?.id) {
    redirect("/auth/login");
  }

  try {
    const userNotes = await db
      .select()
      .from(notes)
      .where(and(eq(notes?.author, user?.id)));

    return userNotes;
  } catch (error) {
    if (error instanceof DrizzleError) {
      throw new Error(`Something went wrong. ${error?.message}`);
    }
  }
});

export async function getNoteById(id: string) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  try {
    console.log(id, "id");
    const note = await db
      .select()
      .from(notes)
      .where(and(eq(notes.author, user?.id), eq(notes?.id, id)));

    return note?.at(0);
  } catch (error) {
    if (error instanceof DrizzleError) {
      throw new Error(`Something went wrong.
            Cause: ${error?.cause}
            message: ${error?.message}
            `);
    }
  }
}
