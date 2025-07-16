import { ChildrenType } from "@/app/_utils/types";
import { CircleAlert } from "lucide-react";

interface AuthFormInputProps extends ChildrenType {
  isInputFocus: boolean;
  label: string;
  htmlFor: string;
  error?: string;
}

export default function AuthFormInput({
  children,
  isInputFocus,
  label,
  htmlFor,
  error,
}: AuthFormInputProps) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <div>
        <label
          htmlFor={htmlFor}
          className="text-preset-4 text-neutral-950 capitalize"
        >
          {label}
        </label>
      </div>

      <div
        className={`radius-8 transitions-color flex cursor-pointer items-center gap-2 border border-neutral-300 px-4 hover:bg-neutral-50 ${error && "border-red-500 ring-red-500"} ${isInputFocus && "border-neutral-950 ring-1 ring-neutral-950 ring-offset-2 transition-all duration-300"}`}
      >
        {children}
      </div>

      {/* error */}
      {error && (
        <div className="flex items-center gap-2">
          <CircleAlert className="size-3 text-red-500" />
          <p className="text-preset-6 text-red-500">{error}</p>
        </div>
      )}
    </fieldset>
  );
}
