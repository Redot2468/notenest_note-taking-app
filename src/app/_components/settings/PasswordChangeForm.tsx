"use client";

import AuthFormInput from "@/src/app/_components/auth/AuthFormInput";
import PasswordVisibilityBtn from "@/src/app/_components/reusables/PasswordVisibility";
import { passwordChangeAction } from "@/src/app/_lib/actions/settings/password-change";
import { ChangePasswordSchema } from "@/src/app/_lib/zod/passwordChange";
import { PasswordChangeSchemaType } from "@/src/app/_utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function PasswordChangeForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(true);

  const [isChangingPassword, startTransition] = useTransition();
  const [isInputFocusState, SetInputFocusState] = useState({
    isOldPasswordInputFocus: false,
    isNewOldPasswordInputFocus: false,
    isConfirmNewPasswordInputFocus: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    subscribe,
  } = useForm<PasswordChangeSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        console.log(values, "values");
        setIsAnyFieldEmpty(
          !values.oldPassword ||
            !values.newPassword ||
            !values.confirmNewPassword,
        );
      },
    });

    return () => callback();
  }, [subscribe]);

  function onSubmit(data: PasswordChangeSchemaType) {
    startTransition(async () => {
      const response = await passwordChangeAction(data);

      if (response?.formErrors) {
        const message = `Form validation error @ input: ${Object.keys(response?.formErrors).join(", ")}, please fix`;

        toast.error(message);
      }

      if (response?.error) {
        toast.error(response.error);
      }

      if (response?.success) {
        toast.success(response.success);
        reset();
      }
    });
  }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AuthFormInput
        error={errors?.newPassword?.message}
        htmlFor="oldPassword"
        label="old password"
        isInputFocus={isInputFocusState?.isOldPasswordInputFocus}
      >
        <input
          {...register("oldPassword")}
          type={isPasswordVisible ? "text" : "password"}
          name="oldPassword"
          id="oldPassword"
          onFocus={() =>
            SetInputFocusState((cur) => ({
              ...cur,
              isOldPasswordInputFocus: true,
            }))
          }
          onBlur={(e) => {
            register("oldPassword")?.onBlur(e);
            SetInputFocusState((cur) => ({
              ...cur,
              isOldPasswordInputFocus: false,
            }));
          }}
          defaultValue=""
          disabled={isChangingPassword}
          aria-disabled={isChangingPassword}
          autoComplete="oldPassword"
          aria-label="old-password"
          aria-live="polite"
          placeholder="*************"
          className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
          aria-invalid={!!errors?.confirmNewPassword?.message}
          maxLength={255}
        />
        <PasswordVisibilityBtn
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
        />
      </AuthFormInput>

      <AuthFormInput
        error={errors?.newPassword?.message}
        htmlFor="newPassword"
        label="new password"
        isInputFocus={isInputFocusState?.isNewOldPasswordInputFocus}
      >
        <input
          {...register("newPassword")}
          type={isPasswordVisible ? "text" : "password"}
          name="newPassword"
          id="newPassword"
          onFocus={() =>
            SetInputFocusState((cur) => ({
              ...cur,
              isNewOldPasswordInputFocus: true,
            }))
          }
          onBlur={(e) => {
            register("newPassword")?.onBlur(e);
            SetInputFocusState((cur) => ({
              ...cur,
              isNewOldPasswordInputFocus: false,
            }));
          }}
          defaultValue=""
          disabled={isChangingPassword}
          aria-disabled={isChangingPassword}
          autoComplete="newPassword"
          aria-label="new-password"
          aria-live="polite"
          placeholder="*************"
          className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
          aria-invalid={!!errors?.confirmNewPassword?.message}
          maxLength={255}
        />
        <PasswordVisibilityBtn
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
        />
      </AuthFormInput>

      <AuthFormInput
        error={errors?.confirmNewPassword?.message}
        htmlFor="confirmNewPassword"
        label="confirm new password"
        isInputFocus={isInputFocusState?.isConfirmNewPasswordInputFocus}
      >
        <input
          {...register("confirmNewPassword")}
          type={isPasswordVisible ? "text" : "password"}
          name="confirmNewPassword"
          id="confirmNewPassword"
          onFocus={() =>
            SetInputFocusState((cur) => ({
              ...cur,
              isConfirmNewPasswordInputFocus: true,
            }))
          }
          onBlur={(e) => {
            register("confirmNewPassword")?.onBlur(e);
            SetInputFocusState((cur) => ({
              ...cur,
              isConfirmNewPasswordInputFocus: false,
            }));
          }}
          defaultValue=""
          disabled={isChangingPassword}
          aria-disabled={isChangingPassword}
          autoComplete="confirmNewPassword"
          aria-label="confirm-new-password"
          aria-live="polite"
          placeholder="*************"
          className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
          aria-invalid={!!errors?.confirmNewPassword?.message}
          maxLength={255}
        />
        <PasswordVisibilityBtn
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
        />
      </AuthFormInput>

      <div className="flex justify-end">
        <button
          disabled={isChangingPassword || isAnyFieldEmpty}
          aria-disabled={isChangingPassword}
          className="btn btn-primary"
        >
          {isChangingPassword ? "Updating Password..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}
