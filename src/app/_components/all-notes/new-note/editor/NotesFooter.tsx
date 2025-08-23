"use client";

import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import { onToggleCancelModal } from "@/src/app/_lib/redux/notes/notes-slice";
import { hasContent } from "@/src/app/_utils/htmlContent";
import { NoteFormStateType } from "@/src/app/_utils/types";
import { useParams } from "next/navigation";

interface NewNoteHeaderProps {
  disable: boolean;
  noteDetails: NoteFormStateType;
  updateIsDisabled: boolean;
  isNoteArchived: boolean | undefined;
}

export default function NotesFooter({
  disable,
  noteDetails,
  updateIsDisabled,
}: NewNoteHeaderProps) {
  const dispatch = useAppDispatch();

  const params = useParams();
  const thisIsANewNote = params?.noteId === "new";

  const elementHasContent = hasContent(noteDetails?.noteContent);
  const submissionIsDisabled =
    !elementHasContent && !noteDetails?.tags && !noteDetails?.title;

  return (
    <div className="hidden items-center gap-2 border-t border-neutral-200 pt-4 lg:flex">
      <button
        className="text-prest-4 btn btn-secondary"
        type="button"
        disabled={disable}
        aria-disabled={disable}
        onClick={() => dispatch(onToggleCancelModal(true))}
      >
        Cancel
      </button>
      {thisIsANewNote ? (
        <button
          className="btn btn-primary text-preset-4"
          disabled={disable || submissionIsDisabled}
          aria-disabled={disable || submissionIsDisabled}
        >
          Save Note
        </button>
      ) : (
        <button
          className="btn btn-primary text-preset-4"
          disabled={disable || updateIsDisabled}
          aria-disabled={disable || updateIsDisabled}
        >
          Update Note
        </button>
      )}
    </div>
  );
}
