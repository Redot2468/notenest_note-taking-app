"use client";

import Tiptap from "@/src/app/_components/all-notes/new-note/Tiptap";
import { formatDate } from "@/src/app/_utils/funcs";
import { NoteFormStateType } from "@/src/app/_utils/types";
import { Clock, Tag } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { DebouncedState } from "use-debounce";

interface NewNoteFormProps {
  disable: boolean;
  lastEdited: Date | undefined;
  noteFormData: NoteFormStateType;
  setNoteFormData: Dispatch<SetStateAction<NoteFormStateType>>;
  noteSaveDebounceFunction: DebouncedState<() => Promise<void>>;
}

export default function NoteForm({
  disable,
  lastEdited,
  noteFormData,
  setNoteFormData,
  noteSaveDebounceFunction,
}: NewNoteFormProps) {
  const onUpdateContent = (content: string) => {
    setNoteFormData((cur) => ({ ...cur, noteContent: content }));
    noteSaveDebounceFunction();
  };

  return (
    <div className="space-y-3">
      <div>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={noteFormData?.title}
          disabled={disable}
          aria-disabled={disable}
          autoComplete="title"
          aria-label="note title"
          placeholder="Enter a title..."
          className="text-preset-2 w-full text-neutral-950 placeholder:text-neutral-950 focus:outline-none md:text-2xl"
          onChange={(e) => {
            setNoteFormData((cur) => ({ ...cur, title: e.target.value }));
            noteSaveDebounceFunction();
          }}
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
            defaultValue={noteFormData?.tags}
            disabled={disable}
            aria-disabled={disable}
            autoComplete="tags"
            aria-label="tags"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            className="text-preset-6 w-full text-neutral-950 focus:outline-none"
            onChange={(e) => {
              setNoteFormData((cur) => ({ ...cur, tags: e.target.value }));

              noteSaveDebounceFunction();
            }}
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

            <span
              className={`cursor-default ${lastEdited ? "text-neutral-700" : "text-neutral-400"}`}
            >
              {lastEdited ? formatDate(lastEdited) : "Not yet saved"}
            </span>
          </p>
        </div>
      </div>

      {/* seperator line */}
      <div className="mt-3 h-[1px] bg-neutral-200" />

      <div className="lg:pr-4">
        <input type="hidden" name="content" value={noteFormData?.noteContent} />
        <Tiptap
          content={noteFormData?.noteContent}
          disabled={disable}
          onUpdateContent={onUpdateContent}
        />
      </div>
    </div>
  );
}

/**
 
 Desktop
 - use optimistic for note deletion or note archived
 - desktop: use optimistic for adding data,
  * Add the Delete functionality
     
      1a on Desktop, switch to the latest note
   
  */
