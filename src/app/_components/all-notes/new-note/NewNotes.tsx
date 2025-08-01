"use client";

import NoteForm from "@/src/app/_components/all-notes/new-note/NoteForm";
import NoteHeader from "@/src/app/_components/all-notes/new-note/NoteHeader";
import Modal from "@/src/app/_components/reusables/Modal";
import {
  addNewNoteAction,
  addNewNoteActionForButtons,
} from "@/src/app/_lib/actions/notes/note-add";
import { deleteNoteAction } from "@/src/app/_lib/actions/notes/note-delete-archive";
import {
  updateNoteAction,
  updateNoteActionOnButton,
} from "@/src/app/_lib/actions/notes/note-update";
import { useAppDispatch, useAppSelector } from "@/src/app/_lib/redux/hooks";
import {
  getNotes,
  onToggleCancelModal,
  onToggleDiscardModal,
} from "@/src/app/_lib/redux/notes/notes-slice";
import { DISCARD_MODAL_CONTENT } from "@/src/app/_utils/constants";
import { hasContent } from "@/src/app/_utils/htmlContent";
import { NoteFormStateType } from "@/src/app/_utils/types";
import { notes } from "@/src/db/schema/notes";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

interface NewNotesProps {
  noteFromDb: InferSelectModel<typeof notes> | undefined;
}

const DEFAULT_NOTE_DETAILS = {
  noteContent: "",
  tags: "",
  title: "",
};

export default function NewNotes({ noteFromDb }: NewNotesProps) {
  const [state, formAction, isSavingNote] = useActionState(
    addNewNoteAction,
    null,
  );

  const [updateState, updateFormAction, isUpdatingNote] = useActionState(
    updateNoteAction,
    null,
  );

  const { isDiscardNoteModalOpen, isCancelNoteModalOpen } =
    useAppSelector(getNotes);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const noteDetailsFromLocalStorage = localStorage.getItem("noteDetails");
  const noteDataFromLocalStorage: NoteFormStateType =
    noteDetailsFromLocalStorage && JSON.parse(noteDetailsFromLocalStorage);

  const [noteFormData, setNoteFormData] = useState<NoteFormStateType>({
    noteContent:
      noteDataFromLocalStorage?.noteContent || noteFromDb?.content || "",
    title: noteDataFromLocalStorage?.title || noteFromDb?.title || "",
    tags: noteDataFromLocalStorage?.tags || noteFromDb?.tags?.join(", ") || "",
  });
  const thereIsNoteContent = hasContent(noteFormData?.noteContent);
  const theNoteFormsAreEmpty =
    !thereIsNoteContent && !noteFormData?.tags && !noteFormData?.title;

  const noteSaveDebounceFunction = useDebouncedCallback(async () => {
    if (!noteFromDb) {
      const response = await addNewNoteActionForButtons(noteFormData);

      if (response?.error) {
        toast.error(response?.error);
      }

      if (response?.success) {
        router.replace(`/notes/${response?.noteAddedToDbId}`, {
          scroll: false,
        });
      }
    } else {
      if (theNoteFormsAreEmpty && noteFromDb?.id) {
        const response = await deleteNoteAction(noteFromDb?.id);

        if (response?.success) {
          router.replace(`/notes/new`, { scroll: false });
        }

        if (response?.error) {
          toast.error(response?.error);
          return;
        }
        return;
      }

      const response = await updateNoteActionOnButton(
        noteFromDb?.id,
        noteFormData?.title,
        noteFormData?.tags,
        noteFormData?.noteContent,
      );

      if (response?.error) {
        toast.error(response?.error);
      }
    }
  }, 2000);

  // I did this inorder to check if there are any content within the html tag in the content form, because the empty form still returns an html tag.

  const thisIsANewNote = !noteFromDb || !noteFromDb?.id;
  console.log(thisIsANewNote, "okaay");

  useEffect(() => {
    // only store in local storage if it's a new note. Stored notes will come from db.
    localStorage.setItem("noteDetails", JSON.stringify(noteFormData));
  }, [noteFormData]);

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

  useEffect(() => {
    return () => {
      localStorage.removeItem("noteDetails");
    };
  }, []);

  const updateIsDisabled =
    noteFromDb?.title === noteFormData?.title &&
    noteFromDb?.tags?.join(", ") === noteFormData?.tags &&
    noteFromDb?.content === noteFormData?.noteContent;

  function onResetForm() {
    const formEl = formRef?.current;
    if (!formEl) return;

    setNoteFormData(DEFAULT_NOTE_DETAILS);
    localStorage.removeItem("noteDetails");
    formEl.reset();
    dispatch(onToggleCancelModal(false));
  }

  async function onSaveAndExit() {
    const response = await addNewNoteActionForButtons(noteFormData);

    if (response?.success) {
      toast.success(response?.success);
      router.push("/notes");
    } else if (response?.error) {
      toast.success(response?.error);
    }

    dispatch(onToggleDiscardModal(false));
  }

  async function onUpdateAndExit() {
    const response = await updateNoteActionOnButton(
      noteFromDb?.id,
      noteFormData?.title,
      noteFormData?.tags,
      noteFormData?.noteContent,
    );

    if (response?.error) {
      toast?.error(response?.error);
    } else if (response?.success) {
      toast?.success(response?.success);
    }

    dispatch(onToggleDiscardModal(false));
  }

  function onDiscard() {
    localStorage.removeItem("noteDetails");
    dispatch(onToggleDiscardModal(false));
    router.back();
  }

  return (
    <>
      <form
        ref={formRef}
        action={thisIsANewNote ? formAction : updateFormAction}
        autoComplete="on"
        className="new-note-form"
      >
        <input type="hidden" name="noteId" value={noteFromDb?.id} />
        {/* new tab header */}
        <NoteHeader
          disable={isSavingNote || isUpdatingNote}
          noteDetails={noteFormData}
          updateIsDisabled={updateIsDisabled}
          isNoteArchived={noteFromDb?.isArchived}
        />

        <NoteForm
          disable={isSavingNote || isUpdatingNote}
          noteFormData={noteFormData}
          setNoteFormData={setNoteFormData}
          noteSaveDebounceFunction={noteSaveDebounceFunction}
        />
      </form>

      {/* modal for go back button */}
      <Modal
        modalContent={{
          isModalOpen: isDiscardNoteModalOpen,
          ...DISCARD_MODAL_CONTENT,
        }}
      >
        <button
          type="button"
          className="btn bg-red-500 text-white"
          onClick={onDiscard}
        >
          Discard
        </button>

        <button
          type="button"
          className="btn btn-primary text-white"
          onClick={thisIsANewNote ? onSaveAndExit : onUpdateAndExit}
        >
          {thisIsANewNote ? "Save" : "Update"} & Exit
        </button>
      </Modal>

      <Modal
        modalContent={{
          isModalOpen: isCancelNoteModalOpen,
          ...DISCARD_MODAL_CONTENT,
        }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => dispatch(onToggleCancelModal(false))}
        >
          cancel
        </button>
        <button
          type="button"
          className="btn bg-red-500 text-white"
          onClick={onResetForm}
        >
          Discard
        </button>
      </Modal>
    </>
  );
}

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
