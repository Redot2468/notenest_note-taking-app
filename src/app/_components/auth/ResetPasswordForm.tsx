"use client";

import AuthFormInput from "@/app/_components/auth/AuthFormInput";
import PasswordVisibilityBtn from "@/app/_components/reusables/PasswordVisibility";
import { resetPasswordAction } from "@/app/_lib/actions/auth/password";
import { ResetPasswordSchema } from "@/app/_lib/zod/authschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const [isRegistering, startTransition] = useTransition();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const router = useRouter();

  const [isInputFocusState, SetInputFocusState] = useState({
    isPasswordInputFocus: false,
    isConfirmPasswordInputFocus: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  console.log(errors);

  function onSubmitForm(values: ResetPasswordSchemaType) {
    startTransition(async () => {
      const response = await resetPasswordAction({ ...values, token });
      if (response?.success) {
        toast.success(response.success);
        reset();
        router.push("/auth/login");
      }

      if (response?.error) {
        console.log("okay");
        toast.error(response.error);
      }
    });
  }
  return (
    <div className="space-y-4">
      <div className="form-header-texts">
        <h1 className="text-preset-1 capitalize">Reset your password?</h1>
        <p className="text-preset-5">
          Choose a new password to secure your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="on"
        className="flex flex-col gap-4 pt-6"
      >
        <AuthFormInput
          error={errors?.password?.message}
          htmlFor="password"
          label="Password"
          isInputFocus={isInputFocusState?.isPasswordInputFocus}
        >
          <input
            {...register("password")}
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            id="password"
            onFocus={() =>
              SetInputFocusState((cur) => ({
                ...cur,
                isPasswordInputFocus: true,
              }))
            }
            onBlur={(e) => {
              register("password")?.onBlur(e);
              SetInputFocusState((cur) => ({
                ...cur,
                isPasswordInputFocus: false,
              }));
            }}
            defaultValue=""
            disabled={isRegistering}
            aria-disabled={isRegistering}
            autoComplete="password"
            aria-label="password"
            aria-live="polite"
            placeholder="*************"
            className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
            aria-invalid={!!errors?.password?.message}
          />
          <PasswordVisibilityBtn
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
        </AuthFormInput>

        <AuthFormInput
          error={errors?.confirmPassword?.message}
          htmlFor="confirmPassword"
          label="confirm password"
          isInputFocus={isInputFocusState?.isConfirmPasswordInputFocus}
        >
          <input
            {...register("confirmPassword")}
            type={isPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            onFocus={() =>
              SetInputFocusState((cur) => ({
                ...cur,
                isConfirmPasswordInputFocus: true,
              }))
            }
            onBlur={(e) => {
              register("confirmPassword")?.onBlur(e);
              SetInputFocusState((cur) => ({
                ...cur,
                isConfirmPasswordInputFocus: false,
              }));
            }}
            defaultValue=""
            disabled={isRegistering}
            aria-disabled={isRegistering}
            autoComplete="confirmPassword"
            aria-label="confirm-password"
            aria-live="polite"
            placeholder="*************"
            className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
            aria-invalid={!!errors?.confirmPassword?.message}
          />
          <PasswordVisibilityBtn
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
        </AuthFormInput>

        <div>
          <button
            disabled={isRegistering}
            aria-disabled={isRegistering}
            className="btn btn-primary w-full"
          >
            {isRegistering ? "Resetting Password..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
