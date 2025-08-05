import NoteCard from "@/src/app/_components/all-notes/NoteCard";
import { getNotesByTag } from "@/src/app/_lib/data-service/tags";
import Link from "next/link";

export default async function TagNotesList({ tag }: { tag: string }) {
  // replace with tag note list, and use the tag to get the tag
  const userNotes = await getNotesByTag(tag);

  if (!userNotes.length) {
    return (
      <div className="radius-8 text-preset-5 mt-4 w-full border border-neutral-200 bg-neutral-100 p-2 text-neutral-950">
        <p>You don&apos;t have any notes for the tag ”{tag}”. </p>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full">
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
  );
}
