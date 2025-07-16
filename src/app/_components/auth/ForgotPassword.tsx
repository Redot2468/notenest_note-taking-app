"use client";

import AuthFormInput from "@/app/_components/auth/AuthFormInput";
import { forgotPasswordAction } from "@/app/_lib/actions/auth/password";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [state, formAction, isSubmitting] = useActionState(
    forgotPasswordAction,
    null,
  );
  const [isInputFocusState, SetInputFocusState] = useState({
    isEmailInputFocus: false,
    isPasswordInputFocus: false,
    isConfirmPasswordInputFocus: false,
  });
  const { formErrors, inputs } = state ?? {};

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.success);
      } else if (state?.error) {
        toast.error(state?.error);
      }
    }
  }, [state]);

  return (
    <div className="space-y-4">
      <div className="form-header-texts">
        <h1 className="text-preset-1">Forgotten your password?</h1>
        <p className="text-preset-5">
          Enter your email below, and we&apos;ll send you a link to reset.
        </p>
      </div>

      <form
        action={formAction}
        autoComplete="on"
        className="flex flex-col gap-4 pt-6"
      >
        <AuthFormInput
          error={formErrors?.email?.errors?.at(0)}
          htmlFor="email"
          label="email address"
          isInputFocus={isInputFocusState?.isEmailInputFocus}
        >
          <input
            type="text"
            name="email"
            id="email"
            onFocus={() => {
              SetInputFocusState((cur) => ({
                ...cur,
                isEmailInputFocus: true,
              }));
            }}
            onBlur={() => {
              SetInputFocusState((cur) => ({
                ...cur,
                isEmailInputFocus: false,
              }));
            }}
            defaultValue={inputs?.email as string}
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            autoComplete="email"
            aria-label="email"
            aria-live="polite"
            placeholder="email@example.com"
            className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
            aria-describedby="email-error"
            aria-invalid={!!formErrors?.email?.errors?.at(0)}
          />
        </AuthFormInput>

        <div>
          <button
            className="btn btn-primary w-full"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
          </button>
        </div>
      </form>
    </div>
  );
}
