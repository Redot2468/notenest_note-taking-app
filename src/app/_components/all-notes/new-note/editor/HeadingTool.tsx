"use client";

import { useDropdown } from "@/src/app/_hooks/useDropdown";
import { HEADINGS_LEVEL } from "@/src/app/_utils/constants";
import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";
import { Check } from "lucide-react";
import { useState } from "react";

export default function HeadingTool({ editor }: { editor: Editor }) {
  const [headingLevel, setHeadingLevel] = useState<number | null>();
  const { isDropdownOpen, onOpenDropdown } = useDropdown(".heading-tool");

  return (
    <div className="heading-tool space-y-1">
      <button
        type="button"
        className="text- font-medium"
        onClick={onOpenDropdown}
      >
        {headingLevel ? (
          <span>
            H<span className="text-xs">{headingLevel}</span>
          </span>
        ) : (
          "H"
        )}
      </button>

      <ul
        className={`${isDropdownOpen ? "translate-y-0 opacity-100" : "pointer-events-none opacity-0"} absolute top-8 left-0 z-30 flex w-fit -translate-y-4 transform flex-col space-y-1 rounded-md border border-neutral-200 bg-white px-1 py-1 shadow-md transition-all duration-300`}
      >
        {HEADINGS_LEVEL?.map((level) => (
          <li
            key={level}
            className={`flex cursor-pointer items-center gap-4 rounded-md px-3 py-1 font-medium transition-all hover:bg-neutral-100 ${editor.isActive("heading", { level: level as Level }) ? "is-active" : ""}} `}
            onClick={() => {
              setHeadingLevel((cur) => (cur === level ? null : level));
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as Level })
                .run();
            }}
          >
            {headingLevel === level && <Check className="size-3" />}
            <span>
              H<span className="text-xs">{level}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
