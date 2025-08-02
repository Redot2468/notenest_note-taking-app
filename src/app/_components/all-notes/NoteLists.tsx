import NoteCard from "@/src/app/_components/all-notes/NoteCard";
import { getNotes } from "@/src/app/_lib/data-service/notes";
import Link from "next/link";

export default async function NoteLists() {
  const userNotes = await getNotes();

  return (
    <div className="space-y-4">
      <h1 className="text-preset-1 text-neutral-950 capitalize">all notes</h1>

      <div>
        {/* note list card */}
        {userNotes?.map((note, arrIndex, arr) => (
          <Link key={note?.id} href={`/notes/${note?.id}`}>
            <NoteCard note={note} />
            {arrIndex !== arr.length - 1 && (
              <div className="radius-20 h-[1px] bg-neutral-200" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
