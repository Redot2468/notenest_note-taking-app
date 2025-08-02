"use client";

import { useAppDispatch } from "@/src/app/_lib/redux/hooks";
import { onToggleDiscardModal } from "@/src/app/_lib/redux/notes/notes-slice";
import { ChildrenType } from "@/src/app/_utils/types";
import { LucideProps } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ForwardRefExoticComponent, RefAttributes, useEffect } from "react";

interface ModalProps extends ChildrenType {
  modalContent: {
    isModalOpen: boolean;
    modalIcon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    modalTitle: string;
    modalDialogue: string;
  };
}

export default function Modal({ children, modalContent }: ModalProps) {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalDialogue, modalTitle } = modalContent ?? {};

  useEffect(() => {
    function onBlurModal(e: MouseEvent) {
      const targetEl = e.target as HTMLElement;

      if (!targetEl.closest(".modal-block")) {
        dispatch(onToggleDiscardModal(false));
      }
    }

    document.addEventListener("click", onBlurModal);

    return () => document.removeEventListener("click", onBlurModal);
  });

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed top-0 left-0 z-50 flex h-[100dvh] w-full items-center justify-center bg-neutral-950/50 px-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* modal block */}
          <div className="radius-12 modal-block mx-auto max-w-[350px] flex-grow border border-neutral-200 bg-white sm:max-w-[440px]">
            {/* delete message */}
            <div className="flex items-start gap-4 p-5">
              <div className="flex size-9 items-center justify-center gap-1 rounded-md bg-neutral-100">
                <modalContent.modalIcon className="size-[18px] text-neutral-950" />
              </div>

              <div className="w-full space-y-1.5">
                <h3 className="text-preset-3 text-neutral-950">{modalTitle}</h3>
                <p className="text-preset-5 text-neutral-700">
                  {modalDialogue}
                </p>
              </div>
            </div>

            {/* seperator */}
            <div className="h-[1.5px] bg-neutral-200" />

            {/* CTA buttons */}
            <div className="flex items-center justify-end gap-4 px-5 py-4">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
