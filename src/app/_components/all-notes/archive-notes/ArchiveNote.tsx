import Notes from "@/src/app/_components/all-notes/new-note/Notes";
import { getNoteById } from "@/src/app/_lib/data-service/notes";

async function ArchiveNote({ noteId }: { noteId: string }) {
  console.log(noteId);
  //   replace this with archive note data
  const note = await getNoteById(noteId);

  return (
    <div className="w-full space-y-3 border-4 border-green-800 px-4 py-5">
      <Notes noteFromDb={note} />
    </div>
  );
}

export default ArchiveNote;
