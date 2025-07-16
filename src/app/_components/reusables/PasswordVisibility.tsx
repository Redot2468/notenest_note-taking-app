"use client";

import { Eye, EyeClosed } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface PasswordVisibilityProps {
  isPasswordVisible: boolean;
  setIsPasswordVisible: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordVisibilityBtn({
  isPasswordVisible,
  setIsPasswordVisible,
}: PasswordVisibilityProps) {
  return (
    <button onClick={() => setIsPasswordVisible((cur) => !cur)} type="button">
      {isPasswordVisible ? (
        <EyeClosed className="size-4 text-neutral-500" />
      ) : (
        <Eye className="size-4 text-neutral-500" />
      )}
    </button>
  );
}
