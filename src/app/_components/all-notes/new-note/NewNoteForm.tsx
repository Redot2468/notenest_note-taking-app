"use client";

import Tiptap from "@/src/app/_components/all-notes/new-note/Tiptap";
import { Clock, Tag } from "lucide-react";
import { useEffect, useState } from "react";

type NoteFormStateType = {
  noteContent: string;
  title: string;
  tags: string;
};

export default function NewNoteForm() {
  const noteDetailsFromLocalStorage = localStorage.getItem("noteDetails");
  console.log(
    noteDetailsFromLocalStorage ? JSON.parse(noteDetailsFromLocalStorage) : "",
    "ridwan",
  );

  const [newNoteFormState, setNewNoteFormState] = useState<NoteFormStateType>(
    () =>
      noteDetailsFromLocalStorage
        ? JSON.parse(noteDetailsFromLocalStorage)
        : {
            noteContent: "",
            title: "",
            tags: "",
          },
  );

  const onUpdateContent = (content: string) =>
    setNewNoteFormState((cur) => ({ ...cur, noteContent: content }));

  useEffect(() => {
    // only store in local storage if it's a new note. Stored notes will come from db.
    localStorage.setItem("noteDetails", JSON.stringify(newNoteFormState));
  }, [newNoteFormState]);

  return (
    <div className="mt-3 space-y-3">
      <div>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={newNoteFormState?.title}
          autoComplete="title"
          aria-label="note title"
          placeholder="Enter a title..."
          className="text-preset-2 w-full text-neutral-950 placeholder:text-neutral-950 focus:outline-none md:text-2xl"
          onChange={(e) =>
            setNewNoteFormState((cur) => ({ ...cur, title: e.target.value }))
          }
        />
      </div>

      {/* tags and last edited */}
      <div className="space-y-1">
        {/* tags */}
        <div className="flex items-center gap-2">
          <div className="flex w-[115px] items-center gap-1.5 py-1">
            <Tag className="size-4 text-neutral-700" />
            <p className="text-preset-6 text-neutral-700">Tags</p>
          </div>

          <input
            type="text"
            name="tags"
            id="tags"
            defaultValue={newNoteFormState?.tags}
            autoComplete="tags"
            aria-label="tags"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            className="text-preset-6 w-full text-neutral-950 focus:outline-none"
            onChange={(e) =>
              setNewNoteFormState((cur) => ({ ...cur, tags: e.target.value }))
            }
          />
        </div>

        {/* last edited */}
        <div className="flex items-center gap-2">
          <div className="flex w-[115px] items-center gap-1.5 py-1">
            <Clock className="size-4 text-neutral-700" />
            <p className="text-preset-6 text-neutral-700">Last edited</p>
          </div>

          <p className="text-preset-6 w-full">
            <span className="hidden text-neutral-700"></span>

            <span className="cursor-default text-neutral-400">
              Not yet saved
            </span>
          </p>
        </div>
      </div>

      {/* seperator line */}
      <div className="mt-3 h-[1px] bg-neutral-200" />

      <div className="">
        <Tiptap
          content={newNoteFormState?.noteContent}
          onUpdateContent={onUpdateContent}
        />
      </div>
    </div>
  );
}
