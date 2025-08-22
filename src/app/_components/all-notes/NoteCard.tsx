"use client";

import { formatDate } from "@/src/app/_utils/funcs";
import { notes } from "@/src/db/schema/notes";
import { InferSelectModel } from "drizzle-orm";
import { useParams } from "next/navigation";

interface NoteCardProps {
  note: InferSelectModel<typeof notes> | undefined;
}

export default function NoteCard({ note }: NoteCardProps) {
  const { noteId } = useParams();
  console.log(noteId);
  const isNoteSelected = noteId === note?.id;

  return (
    <div
      className={`flex flex-col gap-3 p-2 ${isNoteSelected ? "bg-neutral-100" : "bg-white"}`}
    >
      <p className="text-preset-3 text-neutral-950 capitalize">{note?.title}</p>

      <div className="flex flex-wrap gap-1">
        {note?.tags?.map((tag, id) => (
          <div
            key={id}
            className="radius-4 flex w-fit items-center justify-center gap-1 border border-[#D4E2FF] bg-neutral-200 px-1.5 py-0.5"
          >
            <p className="text-preset-6 text-neutral-950 capitalize">{tag}</p>
          </div>
        ))}
      </div>

      <p className="text-preset-6 text-neutral-700">
        {note?.published_at ? formatDate(note?.published_at) : "N/A"}
      </p>
    </div>
  );
}
