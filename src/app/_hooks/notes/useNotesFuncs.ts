import { addNewNoteActionForButtons } from "@/src/app/_lib/actions/notes/note-add";
import { updateNoteActionOnButton } from "@/src/app/_lib/actions/notes/note-update";
import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import {
  onToggleCancelModal,
  onToggleDiscardModal,
} from "@/src/app/_lib/redux/notes/notes-slice";
import { NoteFormStateType, NoteFromDbType } from "@/src/app/_utils/types";
import { useRouter } from "next/navigation";
import { Dispatch, RefObject, SetStateAction } from "react";
import toast from "react-hot-toast";

const DEFAULT_NOTE_DETAILS = {
  noteContent: "",
  tags: "",
  title: "",
};

type SetStateType = Dispatch<SetStateAction<NoteFormStateType>>;

export function useNotesFuncs(
  noteFormData: NoteFormStateType,
  noteFromDb: NoteFromDbType,
  setNoteFormData: SetStateType,
  formRef: RefObject<HTMLFormElement | null>,
) {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    router.back();
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
    router.back();
  }

  function onDiscard() {
    localStorage.removeItem("noteDetails");
    dispatch(onToggleDiscardModal(false));
    router.back();
  }

  return { onDiscard, onUpdateAndExit, onResetForm, onSaveAndExit };
}
