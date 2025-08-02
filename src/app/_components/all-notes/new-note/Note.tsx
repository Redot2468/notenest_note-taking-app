import NewNotes from "@/src/app/_components/all-notes/new-note/NewNotes";
import { getNoteById } from "@/src/app/_lib/data-service/notes";

async function Note({ noteId }: { noteId: string }) {
  console.log(noteId);
  const note = await getNoteById(noteId);

  return (
    <div className="w-full space-y-3 border-4 border-green-800 px-4 py-5">
      <NewNotes noteFromDb={note} />
    </div>
  );
}

export default Note;
