import Modal from "@/src/app/_components/reusables/Modal";
import { useAppDispatch, useAppSelector } from "@/src/app/_lib/redux/hooks";
import {
  getNotes,
  onToggleCancelModal,
} from "@/src/app/_lib/redux/notes/notes-slice";
import { DISCARD_MODAL_CONTENT } from "@/src/app/_utils/constants";

export default function CancelNoteModal({
  onResetForm,
}: {
  onResetForm: () => void;
}) {
  const dispatch = useAppDispatch();
  const { isCancelNoteModalOpen } = useAppSelector(getNotes);

  return (
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
  );
}
