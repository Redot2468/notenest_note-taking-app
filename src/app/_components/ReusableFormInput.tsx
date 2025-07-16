"use client";

import { CircleAlert, Eye } from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [isInputFocus, setIsInputFocus] = useState(false);

  return (
    <div>
      {/* header text */}
      <div className="form-header-texts">
        <h1 className="text-preset-1"> create your account</h1>
        <p className="text-preset-5">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </div>

      <form action="" autoComplete="on">
        <fieldset className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-preset-4 text-neutral-950 capitalize"
          >
            email address
          </label>
          <div
            className={`radius-8 transitions-color flex cursor-pointer items-center gap-2 border border-neutral-300 px-4 py-3 hover:bg-neutral-50 ${isInputFocus && "border-neutral-950 ring-1 ring-neutral-950 ring-offset-2 transition-all duration-300"}`}
          >
            <Eye className="size-4 text-neutral-500" />
            <input
              type="text"
              name="email"
              id="email"
              onFocus={() => setIsInputFocus(true)}
              onBlur={() => setIsInputFocus(false)}
              defaultValue=""
              autoComplete="email"
              aria-label="email-field"
              aria-live="polite"
              placeholder="email@example.com"
              className="text-preset-4 flex-grow text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
            />

            <Eye className="size-4 text-neutral-500" />
          </div>

          {/* error */}
          <div className="flex items-center gap-2">
            <CircleAlert className="size-3 text-red-500" />
            <p className="text-preset-6 text-red-500">
              This is a hint text to help user.
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
