"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsBackButton() {
  const router = useRouter();

  return (
    <div>
      <button
        className="flex items-center gap-1"
        onClick={() => router.push("/settings")}
      >
        <ChevronLeft className="size-[18px] text-neutral-600" />

        <span className="text-preset-4 text-neutral-600">Settings</span>
      </button>
    </div>
  );
}
