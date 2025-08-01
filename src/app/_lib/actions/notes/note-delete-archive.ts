"use server";

import { getAuthSession } from "@/src/app/_utils/getSession";
import { db } from "@/src/db";
import { notes } from "@/src/db/schema/notes";
import { and, DrizzleError, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function archiveNoteAction(
  noteId: string,
  isNoteArchived: boolean | undefined,
) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  try {
    const userNotesId = await db
      .select({ id: notes?.id })
      .from(notes)
      .where(eq(notes?.author, user?.id));

    const noteBelongToUser = userNotesId?.some(
      (userNote) => userNote?.id === noteId,
    );

    if (!noteBelongToUser) {
      return {
        error: "You do not have the required permission to mutate this record.",
      };
    }

    await db
      .update(notes)
      .set({ isArchived: isNoteArchived ? false : true })
      .where(and(eq(notes?.author, user?.id), eq(notes?.id, noteId)));

    revalidatePath(`/note/${noteId}`);
    revalidatePath("/archived");

    return { success: isNoteArchived ? "Note restored" : "Note archived" };
  } catch (error) {
    if (error instanceof DrizzleError) {
      return { error: `Note was not archived. ${error?.cause}` };
    }

    return { error: "Something went wrong try again" };
  }
}

export async function deleteNoteAction(noteId: string) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  try {
    const userNotesIds = await db
      .select({ id: notes.id })
      .from(notes)
      .where(eq(notes?.author, user?.id));

    const noteBelongToUser = userNotesIds?.some(
      (userNoteId) => userNoteId?.id === noteId,
    );

    if (!noteBelongToUser)
      return { error: "You do not have permission to update this note! " };

    await db
      .delete(notes)
      .where(and(eq(notes?.author, user?.id), eq(notes.id, noteId)));

    revalidatePath("/notes");

    return { success: "Note successfully deleted" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Something went wrong. ${error?.message}` };
    }
  }
}
