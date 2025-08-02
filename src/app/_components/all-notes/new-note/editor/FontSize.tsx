"use client";

import { useDropdown } from "@/src/app/_hooks/useDropdown";
import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";
import { Check, Type } from "lucide-react";
import { useState } from "react";

export const FONT_SIZE_LEVELS = Array.from({ length: 7 }, (_, i) => i + 10);

export default function FontSize({ editor }: { editor: Editor }) {
  const [fontSize, setFontSize] = useState<number | null>();
  const { isDropdownOpen, onOpenDropdown } = useDropdown(".font-size-tool");

  return (
    <div className="font-size-tool z-50 space-y-1">
      <button
        type="button"
        className="text- font-medium"
        onClick={onOpenDropdown}
      >
        {fontSize ? (
          <span>
            <span className="text-sm">{fontSize}px</span>
          </span>
        ) : (
          <Type className="size-4" />
        )}
      </button>

      <ul
        className={`${isDropdownOpen ? "translate-y-0 opacity-100" : "pointer-events-none opacity-0"} absolute top-8 left-8 z-50 flex w-fit -translate-y-4 transform flex-col space-y-1 rounded-md border border-neutral-200 bg-white px-1 py-1 shadow-md transition-all duration-300`}
      >
        {FONT_SIZE_LEVELS?.map((level) => (
          <li
            key={level}
            className={`flex cursor-pointer items-center gap-4 rounded-md px-3 py-1 font-medium transition-all hover:bg-neutral-100 ${editor.isActive("heading", { level: level as Level }) ? "is-active" : ""}} `}
            onClick={() => {
              setFontSize((cur) => (cur === level ? null : level));
              editor.chain().focus().setFontSize(`${level}px`).run();
            }}
          >
            {fontSize === level && <Check className="size-3" />}
            <span>
              <span className="text-sm">{level}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
