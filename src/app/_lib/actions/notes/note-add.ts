"use server";

import { NoteSchema } from "@/src/app/_lib/zod/noteSchema";
import { getAuthSession } from "@/src/app/_utils/getSession";
import { NoteFormStateType } from "@/src/app/_utils/types";
import { db } from "@/src/db";
import { notes } from "@/src/db/schema/notes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewNoteAction(prevState: unknown, formData: FormData) {
  const user = await getAuthSession();
  if (!user || !user?.id) {
    redirect("/auth/login");
  }

  const noteData = Object.fromEntries(formData.entries());
  const validatingNoteData = NoteSchema.safeParse(noteData);
  console.log(noteData, "note data");

  if (!validatingNoteData?.success) {
    throw new Error(
      "Something went wrong - A validation error occured when adding notes",
    );
  }

  const validatedNoteData = validatingNoteData?.data ?? {};

  const title = validatedNoteData?.title || "Untitled Note";

  const tags =
    validatedNoteData?.tags?.split(",")?.map((tag) => tag.trim()) ?? [];

  console.log(title, tags);
  //   mutation

  try {
    const noteAddedToDb = await db
      .insert(notes)
      .values({
        title,
        tags,
        content: validatedNoteData?.content,
        author: user?.id,
      })
      .returning();

    revalidatePath("/notes");

    return { success: "Note saved!", noteAddedToDb: noteAddedToDb?.at(0) };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: `Something went wrong - ${error.name}. Cause:${error.cause}`,
      };
    }
  }
}

export async function addNewNoteActionForButtons(
  noteDetails: NoteFormStateType,
) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  const validatingNoteData = NoteSchema.safeParse(noteDetails);

  if (!validatingNoteData?.success) {
    throw new Error(
      "Something went wrong - A validation error occured when adding notes",
    );
  }

  const validatedNoteData = validatingNoteData?.data ?? {};

  const title = validatedNoteData?.title || "Untitled note";

  const tags = validatedNoteData?.tags
    ? validatedNoteData?.tags?.split(", ").map((tag) => tag.trim())
    : [];

  try {
    const note = await db
      .insert(notes)
      .values({ title, tags, author: user?.id })
      .returning({ id: notes?.id });

    revalidatePath("/notes");

    return { success: "Note Saved!", noteAddedToDbId: note?.at(0)?.id };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error?.message };
    }
  }
}
