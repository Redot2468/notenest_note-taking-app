"use client";

import { ChildrenType } from "@/src/app/_utils/types";
import { useState } from "react";

interface ToggleProps extends ChildrenType {
  onClick: () => void;
}

export default function Toggle({ children, onClick }: ToggleProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      type="button"
      className={`rounded-sm ${isClicked && "bg-[#f0f0f0]"} p-1`}
      onClick={() => {
        setIsClicked((cur) => !cur);
        onClick();
      }}
    >
      {children}
    </button>
  );
}
