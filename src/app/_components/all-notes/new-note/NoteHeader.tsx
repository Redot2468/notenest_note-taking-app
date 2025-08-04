"use client";
import archiveIcon from "@/public/icons/icon-archive.svg";
import unarchivedIcon from "@/public/icons/icon-restore.svg";
import {
  archiveNoteAction,
  deleteNoteAction,
} from "@/src/app/_lib/actions/notes/note-delete-archive";
import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import {
  onToggleCancelModal,
  onToggleDiscardModal,
} from "@/src/app/_lib/redux/notes/notes-slice";
import { hasContent } from "@/src/app/_utils/htmlContent";
import { NoteFormStateType } from "@/src/app/_utils/types";
import { ChevronLeftIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

interface NewNoteHeaderProps {
  disable: boolean;
  noteDetails: NoteFormStateType;
  updateIsDisabled: boolean;
  isNoteArchived: boolean | undefined;
}

export default function NoteHeader({
  disable,
  noteDetails,
  updateIsDisabled,
  isNoteArchived,
}: NewNoteHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isDeletingNote, startTransition] = useTransition();
  const [isArchivingNote, startArchiveTransition] = useTransition();

  const params = useParams();
  const thisIsANewNote = params?.noteId === "new";

  const elementHasContent = hasContent(noteDetails?.noteContent);
  const submissionIsDisabled =
    !elementHasContent && !noteDetails?.tags && !noteDetails?.title;

  function onNavigateBackForNewNote() {
    // if note has no content
    if (submissionIsDisabled) {
      router.back();
      return;
    }
    // if note has a content
    dispatch(onToggleDiscardModal(true));
  }

  function onNavigateBackForStoredNote() {
    // if note content hasn't changed from that in the db
    if (updateIsDisabled) {
      router.back();
      return;
    }
    // if note has a content
    dispatch(onToggleDiscardModal(true));
  }

  function onDeleteNote() {
    startTransition(async () => {
      const response = await deleteNoteAction(params?.noteId as string);

      if (response?.success) {
        toast.success(response?.success);
        router.back();
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  }

  function onArchiveNote() {
    startArchiveTransition(async () => {
      const response = await archiveNoteAction(
        params?.noteId as string,
        isNoteArchived,
      );
      if (response?.success) {
        toast.success(response?.success);
      } else if (response?.error) {
        toast.error(response?.error);
      }
    });
  }

  console.log(isNoteArchived, "isNoteArchived");

  return (
    <header className="flex w-full items-center justify-between border-b border-neutral-200 pb-4">
      <button
        className="flex items-center"
        type="button"
        onClick={
          thisIsANewNote
            ? onNavigateBackForNewNote
            : onNavigateBackForStoredNote
        }
        disabled={disable}
        aria-disabled={disable}
      >
        <ChevronLeftIcon className="size-[22px] text-neutral-600" />
        <span className="text-preset-5 text-neutral-600 capitalize">
          go back
        </span>
      </button>

      <div className="flex items-center gap-4">
        {!thisIsANewNote && (
          <>
            <button
              onClick={onDeleteNote}
              disabled={isDeletingNote}
              aria-disabled={isDeletingNote}
              type="button"
            >
              {isDeletingNote ? (
                <HashLoader size={20} />
              ) : (
                <Trash2 className="size-5" />
              )}
            </button>

            <button
              type="button"
              onClick={onArchiveNote}
              disabled={isArchivingNote}
              aria-disabled={isArchivingNote}
            >
              {isArchivingNote ? (
                <HashLoader size={20} />
              ) : (
                <Image
                  src={isNoteArchived ? unarchivedIcon : archiveIcon}
                  alt="archive"
                  className="size-5"
                  priority={true}
                  quality={100}
                />
              )}
            </button>
          </>
        )}
        <button
          className="text-preset-5 text-neutral-600"
          type="button"
          disabled={disable}
          aria-disabled={disable}
          onClick={() => dispatch(onToggleCancelModal(true))}
        >
          Cancel
        </button>
        {thisIsANewNote ? (
          <button
            className="text-preset-5 gap-2 text-blue-500 disabled:text-neutral-300"
            disabled={disable || submissionIsDisabled}
            aria-disabled={disable || submissionIsDisabled}
          >
            Save Note
          </button>
        ) : (
          <button
            className="text-preset-5 gap-2 text-blue-500 disabled:text-neutral-300"
            disabled={disable || updateIsDisabled}
            aria-disabled={disable || updateIsDisabled}
          >
            Update Note
          </button>
        )}
      </div>
    </header>
  );
}

// continue the instructions from the NoteFormComponent
// make the code clean in the NewNotes components
