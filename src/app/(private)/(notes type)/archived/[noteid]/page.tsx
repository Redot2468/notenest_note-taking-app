import ArchiveNote from "@/src/app/_components/all-notes/archive-notes/ArchiveNote";
import { getArchivedNotesById } from "@/src/app/_lib/data-service/notes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const { noteId } = await params;

  const archivedNote = await getArchivedNotesById(noteId);

  if (noteId === "new") {
    return { title: "New note" };
  }

  return { title: archivedNote?.title };
}

export default async function Page({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const param = await params;

  return (
    <div className="">
      {/* note content - mobile and desktop */}
      <ArchiveNote noteId={param?.noteId} />
    </div>
  );
}
