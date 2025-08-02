"use server";

import { NoteSchema } from "@/src/app/_lib/zod/noteSchema";
import { getAuthSession } from "@/src/app/_utils/getSession";
import { db } from "@/src/db";
import { notes } from "@/src/db/schema/notes";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateNoteAction(prevState: unknown, formData: FormData) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  try {
    const noteId = formData.get("noteId") as string;

    const userNotesIds = await db
      .select({ id: notes?.id })
      .from(notes)
      .where(eq(notes?.author, user?.id));

    const noteBelongToUser = userNotesIds?.some(
      (userNoteId) => noteId === userNoteId?.id,
    );

    if (!noteBelongToUser)
      return { error: "You do not have permission to update this note! " };

    const noteData = Object.fromEntries(formData.entries());

    const validatingNoteData = NoteSchema.safeParse(noteData);

    if (!validatingNoteData?.success) {
      throw new Error(
        "Something went wrong during form validation for note update",
      );
    }

    const validatedNoteData = validatingNoteData?.data ?? {};

    const title = validatedNoteData?.title ?? "Untitled Note";
    const tags = validatedNoteData?.tags
      ? validatedNoteData?.tags?.split(", ").map((tag) => tag.trim())
      : [];

    await db
      .update(notes)
      .set({ tags, title, content: validatedNoteData?.content })
      .where(and(eq(notes?.author, user?.id), eq(notes?.id, noteId)));

    revalidatePath(`/notes/${noteId}`);
    revalidatePath(`/notes`);

    return {
      success: "Note updated successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: `Something went wrong. ${error?.message}. ${error?.cause} `,
      };
    }
  }
}

export async function updateNoteActionOnButton(
  noteId: string | undefined,
  noteTitle: string,
  noteTags: string,
  noteContent: string,
) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  if (!noteId) {
    throw new Error(
      "Note won't be updated because it doesn't have an identifier",
    );
  }

  try {
    const userNotesIds = await db
      .select({ id: notes?.id })
      .from(notes)
      .where(eq(notes?.author, user?.id));

    const noteBelongToUser = userNotesIds?.some(
      (userNoteId) => noteId === userNoteId?.id,
    );

    if (!noteBelongToUser)
      return { error: "You do not have permission to update this note! " };

    const title = noteTitle ?? "Untitled Note";
    const tags = noteTags ? noteTags?.split(", ").map((tag) => tag.trim()) : [];

    await db
      .update(notes)
      .set({ tags, title, content: noteContent })
      .where(and(eq(notes?.author, user?.id), eq(notes?.id, noteId)));

    revalidatePath(`/notes/${noteId}`);
    revalidatePath(`/notes`);

    return {
      success: "Note updated successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: `Something went wrong. ${error?.message}. ${error?.cause} `,
      };
    }
  }
}
