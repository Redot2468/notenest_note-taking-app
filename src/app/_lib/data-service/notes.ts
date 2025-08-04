import { handleDrizzleError } from "@/src/app/_utils/errorHandler";
import { getAuthSession } from "@/src/app/_utils/getSession";
import { NoteFromDbType } from "@/src/app/_utils/types";
import { db } from "@/src/db";
import { notes } from "@/src/db/schema/notes";
import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getArchivedNotesById = cache(async function (
  noteId: string,
): Promise<NoteFromDbType> {
  const user = await getAuthSession();
  if (!user || !user?.id) {
    redirect("/auth/login");
  }

  try {
    const archivedNoteById = await db
      .select()
      .from(notes)
      .where(and(eq(notes.author, user.id), eq(notes.id, noteId)));

    return archivedNoteById?.at(0);
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

export const getArchivedNotes = cache(async function () {
  const user = await getAuthSession();
  if (!user || !user?.id) {
    redirect("/auth/login");
  }

  try {
    const archivedNotes = await db
      .select()
      .from(notes)
      .where(and(eq(notes.author, user.id), eq(notes?.isArchived, true)))
      .orderBy(desc(notes.published_at));

    return archivedNotes;
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

export const getNotes = cache(async function () {
  const user = await getAuthSession();
  if (!user || !user?.id) {
    redirect("/auth/login");
  }

  try {
    const userNotes = await db
      .select()
      .from(notes)
      .where(and(eq(notes?.author, user?.id), eq(notes?.isArchived, false)))
      .orderBy(desc(notes.published_at));

    return userNotes;
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

export const getNoteById = cache(async function (id: string) {
  const user = await getAuthSession();
  console.log(id, "note start", new Error().stack);
  if (!user || !user?.id) redirect("/auth/login");

  console.log(id, "note before", new Error().stack);
  try {
    console.log(id, "idddd after", new Error().stack);

    const note = await db
      .select()
      .from(notes)
      .where(and(eq(notes.author, user?.id), eq(notes?.id, id)));

    console.log(note, "note itself");

    return note?.at(0);
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
