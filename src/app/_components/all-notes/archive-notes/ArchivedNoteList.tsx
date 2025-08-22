import NoteCard from "@/src/app/_components/all-notes/NoteCard";
import { getArchivedNotes } from "@/src/app/_lib/data-service/notes";
import Link from "next/link";

export default async function ArchiveNoteList() {
  // change this to arhive note lists
  const userArchivedNotes = await getArchivedNotes();

  return (
    <div className="lg:hidden">
      <h1 className="text-preset-1 text-neutral-950 capitalize">
        Archived notes
      </h1>

      <p className="text-preset-5 mt-2 text-neutral-700">
        All your archived notes are stored here. You can restore or delete them
        anytime.
      </p>

      <div className="mt-4">
        {/* note list card */}
        {userArchivedNotes?.map((note, arrIndex, arr) => (
          <Link key={note?.id} href={`/archived/${note?.id}`}>
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
