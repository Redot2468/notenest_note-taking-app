import Modal from "@/src/app/_components/reusables/Modal";

import { useAppSelector } from "@/src/app/_lib/redux/hooks";
import { getNotes } from "@/src/app/_lib/redux/notes/notes-slice";
import { DISCARD_MODAL_CONTENT } from "@/src/app/_utils/constants";

interface DiscardNoteModalTypes {
  onDiscard: () => void;
  thisIsANewNote: boolean;
  onSaveAndExit: () => Promise<void>;
  onUpdateAndExit: () => Promise<void>;
}

export default function DiscardNoteModal({
  onDiscard,
  thisIsANewNote,
  onSaveAndExit,
  onUpdateAndExit,
}: DiscardNoteModalTypes) {
  const { isDiscardNoteModalOpen } = useAppSelector(getNotes);

  return (
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
  );
}
