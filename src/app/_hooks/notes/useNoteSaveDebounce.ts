import { addNewNoteActionForButtons } from "@/src/app/_lib/actions/notes/note-add";
import { deleteNoteAction } from "@/src/app/_lib/actions/notes/note-delete-archive";
import { updateNoteActionOnButton } from "@/src/app/_lib/actions/notes/note-update";
import { NoteFormStateType, NoteFromDbType } from "@/src/app/_utils/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

export function useNoteSaveDebounce(
  noteFromDb: NoteFromDbType,
  theNoteFormsAreEmpty: boolean,
  noteFormData: NoteFormStateType,
) {
  const router = useRouter();

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

  return noteSaveDebounceFunction;
}
