"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewNoteHeader() {
  const router = useRouter();
  return (
    <header className="flex w-full items-center justify-between border-b border-neutral-200 pb-4">
      <button
        className="flex items-center"
        type="button"
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-[22px] text-neutral-600" />
        <span className="text-preset-5 text-neutral-600 capitalize">
          go back
        </span>
      </button>

      <div className="flex items-center gap-4">
        <button className="text-preset-5 text-neutral-600" type="button">
          Cancel
        </button>
        <button className="text-preset-5 gap-2 text-blue-500">Save Note</button>
      </div>
    </header>
  );
}
