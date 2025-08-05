"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div>
      <button className="flex items-center gap-1" onClick={() => router.back()}>
        <ChevronLeft className="size-[18px] text-neutral-600" />

        <span className="text-preset-5 text-neutral-600">Go Back</span>
      </button>
    </div>
  );
}
