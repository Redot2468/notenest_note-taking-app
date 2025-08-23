"use client";
import archiveIcon from "@/public/icons/icon-archive.svg";
import unarchivedIcon from "@/public/icons/icon-restore.svg";
import {
  archiveNoteAction,
  deleteNoteAction,
} from "@/src/app/_lib/actions/notes/note-delete-archive";
import { NoteFormStateType } from "@/src/app/_utils/types";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface NewNoteHeaderProps {
  disable: boolean;
  noteDetails: NoteFormStateType;
  updateIsDisabled: boolean;
  isNoteArchived: boolean | undefined;
}

import deleteIcon from "@/public/icons/icon-delete.svg";

export default function NotesSidebar({ isNoteArchived }: NewNoteHeaderProps) {
  const router = useRouter();
  const [isDeletingNote, startTransition] = useTransition();
  const [isArchivingNote, startArchiveTransition] = useTransition();

  const params = useParams();
  const thisIsANewNote = params?.noteId === "new";

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

  return (
    <div className="hidden border border-yellow-300 py-5 pl-4 lg:flex lg:w-[30%] xl:w-[30%]">
      {!thisIsANewNote && (
        <div className="flex w-full flex-col gap-3 border">
          <button
            className="btn flex w-full items-center justify-start gap-2 border border-neutral-300 px-4 py-3 text-gray-300"
            type="button"
            onClick={onArchiveNote}
            disabled={isArchivingNote}
            aria-disabled={isArchivingNote}
          >
            <Image
              src={isNoteArchived ? unarchivedIcon : archiveIcon}
              alt="archive"
              quality={100}
              priority={true}
            />

            {isNoteArchived ? (
              isArchivingNote ? (
                <span className="text-neutral-950 capitalize italic">
                  unarchiving...
                </span>
              ) : (
                <span className="text-neutral-950 capitalize">
                  unarchive note
                </span>
              )
            ) : isArchivingNote ? (
              <span className="text-neutral-950 capitalize italic">
                archiving...
              </span>
            ) : (
              <span className="text-neutral-950 capitalize">archive note</span>
            )}
          </button>

          <button
            className="btn flex w-full items-center justify-start gap-2 border border-neutral-300 px-4 py-3 text-gray-300 hover:bg-neutral-100"
            onClick={onDeleteNote}
            disabled={isDeletingNote}
            aria-disabled={isDeletingNote}
            type="button"
          >
            <Image
              src={deleteIcon}
              alt="archive"
              quality={100}
              priority={true}
            />

            {isDeletingNote ? (
              <span className="text-neutral-950 capitalize italic">
                deleting...
              </span>
            ) : (
              <span className="text-neutral-950 capitalize">delete note</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
