import Note from "@components/all-notes/new-note/Note";

export async function generateMetadata(params: Promise<{ noteId: string }>) {
  const { noteId } = await params;

  if (noteId === "new") {
    return { title: "New note" };
  }

  // if noteId !== "new"

  // export title from data
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
