import { getNoteById } from "@/src/app/_lib/data-service/notes";
import Note from "@components/all-notes/new-note/Note";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = await params;

  const note = await getNoteById(noteId);

  if (noteId === "new") {
    return { title: "New note" };
  }

  return { title: note?.title };
}

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteParam = await params;
  console.log(noteParam, "noteparramm");

  return <Note noteId={noteParam?.noteId} />;
}
