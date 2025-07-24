"use client";

import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NewNoteMobileBtn() {
  const pathname = usePathname();
  const hideButton =
    pathname === "/settings" ||
    pathname.startsWith("/notes/") ||
    pathname === "/notes/new";

  return (
    <button
      className={`flex size-12 items-center justify-center rounded-full bg-blue-500 ${hideButton ? "hidden" : "block"} large-shadow absolute right-6 bottom-20 lg:hidden`}
    >
      <Plus className="size-[24px] text-white" />
    </button>
  );
}
