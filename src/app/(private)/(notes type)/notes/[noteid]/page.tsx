import Note from "@components/all-notes/new-note/Note";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Note",
};

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const noteParam = await params;
  console.log(noteParam, "noteparramm");

  return <Note noteId={noteParam?.noteId} />;
}
