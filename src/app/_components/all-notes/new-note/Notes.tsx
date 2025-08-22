"use client";

import CancelNoteModal from "@/src/app/_components/all-notes/new-note/CancelNoteModal";
import DiscardNoteModal from "@/src/app/_components/all-notes/new-note/DiscardNoteModal";
import NotesFooter from "@/src/app/_components/all-notes/new-note/editor/NotesFooter";
import NoteForm from "@/src/app/_components/all-notes/new-note/NoteForm";
import NoteHeader from "@/src/app/_components/all-notes/new-note/NoteHeader";
import NotesSidebar from "@/src/app/_components/all-notes/new-note/NotesSidebar";
import { useNoteForm } from "@/src/app/_hooks/notes/useNoteForm";
import { useNoteSaveDebounce } from "@/src/app/_hooks/notes/useNoteSaveDebounce";
import { useNotesFuncs } from "@/src/app/_hooks/notes/useNotesFuncs";
import { addNewNoteAction } from "@/src/app/_lib/actions/notes/note-add";
import { updateNoteAction } from "@/src/app/_lib/actions/notes/note-update";
import { notes } from "@/src/db/schema/notes";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface NewNotesProps {
  noteFromDb: InferSelectModel<typeof notes> | undefined;
}

export default function Notes({ noteFromDb }: NewNotesProps) {
  console.log(noteFromDb);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const [state, formAction, isSavingNote] = useActionState(
    addNewNoteAction,
    null,
  );

  const [updateState, updateFormAction, isUpdatingNote] = useActionState(
    updateNoteAction,
    null,
  );

  // normal notes states
  const {
    noteFormData,
    setNoteFormData,
    theNoteFormsAreEmpty,
    updateIsDisabled,
  } = useNoteForm(noteFromDb);

  console.log(noteFromDb?.tags, noteFormData?.tags, "oooooo");

  // Created this hook to save notes after 2s after user stops typing
  const noteSaveDebounceFunction = useNoteSaveDebounce(
    noteFromDb,
    theNoteFormsAreEmpty,
    noteFormData,
  );

  const { onDiscard, onResetForm, onSaveAndExit, onUpdateAndExit } =
    useNotesFuncs(noteFormData, noteFromDb, setNoteFormData, formRef);

  const thisIsANewNote = !noteFromDb || !noteFromDb?.id;

  // newNote
  useEffect(() => {
    if (state) {
      if (state?.error) {
        toast.error(state?.error);
      } else if (state?.success) {
        toast.success(state?.success);

        if (thisIsANewNote) {
          router.replace(`/notes/${state?.noteAddedToDb?.id}`, {
            scroll: false,
          });
        }
      }
    }
  }, [state, router, thisIsANewNote]);

  // updateAction state
  useEffect(() => {
    if (updateState) {
      if (updateState?.error) {
        toast.error(updateState?.error);
      } else if (updateState?.success) {
        toast.success(updateState?.success);
        localStorage.removeItem("noteDetails");
      }
    }
  }, [updateState]);

  return (
    <>
      <form
        ref={formRef}
        action={thisIsANewNote ? formAction : updateFormAction}
        autoComplete="on"
        className="new-note-form lg:flex"
      >
        <input type="hidden" name="noteId" value={noteFromDb?.id || ""} />
        {/* new tab header */}
        <NoteHeader
          disable={isSavingNote || isUpdatingNote}
          noteDetails={noteFormData}
          updateIsDisabled={updateIsDisabled}
          isNoteArchived={noteFromDb?.isArchived}
        />

        <div className="scrollbar-thin scrollbar-thumb-neutral-400 overflow-y-auto border-r border-neutral-200 lg:h-[80vh] lg:w-[70%]">
          <NoteForm
            disable={isSavingNote || isUpdatingNote}
            noteFormData={noteFormData}
            setNoteFormData={setNoteFormData}
            noteSaveDebounceFunction={noteSaveDebounceFunction}
            lastEdited={noteFromDb?.published_at}
          />
          <NotesFooter
            disable={isSavingNote || isUpdatingNote}
            noteDetails={noteFormData}
            updateIsDisabled={updateIsDisabled}
            isNoteArchived={noteFromDb?.isArchived}
          />
        </div>
        <NotesSidebar
          disable={isSavingNote || isUpdatingNote}
          noteDetails={noteFormData}
          updateIsDisabled={updateIsDisabled}
          isNoteArchived={noteFromDb?.isArchived}
        />
      </form>

      {/* modal for go back button */}
      <DiscardNoteModal
        onDiscard={onDiscard}
        onSaveAndExit={onSaveAndExit}
        onUpdateAndExit={onUpdateAndExit}
        thisIsANewNote={thisIsANewNote}
      />

      <CancelNoteModal onResetForm={onResetForm} />
    </>
  );
}

// start adding the functionalities for the archive, delete, save, and cancel.

{
  /* <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch(onToggleDiscardModal(false))}
        >
          Cancel
        </button>

        <button type="button" className="btn bg-red-500 text-white">
          Delete Note
        </button> */
}

// refactor this page,
// start the 3rd sprint which is tags and search
