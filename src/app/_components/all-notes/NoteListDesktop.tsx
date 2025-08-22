import NoteListBlock from "@/src/app/_components/all-notes/NoteListBlock";
import { getArchivedNotes, getNotes } from "@/src/app/_lib/data-service/notes";
import Link from "next/link";

export default async function NoteListDesktop() {
  const [notes, archivedNotes] = await Promise.all([
    getNotes(),
    getArchivedNotes(),
  ]);

  return (
    <div className="flex w-full flex-col gap-4 border lg:h-[85vh] lg:py-5 lg:pr-3 lg:pl-5 xl:pr-4 xl:pl-8">
      <Link href={"/notes/new"}>
        <button className="btn btn-primary text-preset-4 w-full capitalize">
          + create new note
        </button>
      </Link>

      <NoteListBlock notes={notes} archivedNotes={archivedNotes} />
    </div>
  );
}

//keep working on the archive and notes session, ensure they work perfectly

// work on the tag feature.
