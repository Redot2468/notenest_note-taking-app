"use client";

import AuthFormInput from "@/app/_components/auth/AuthFormInput";
import PasswordVisibilityBtn from "@/app/_components/reusables/PasswordVisibility";
import { useOAuthLogin } from "@/app/_hooks/useOauthLogin";
import { registerAction } from "@/app/_lib/actions/auth/register";
import { RegisterSchema } from "@/app/_lib/zod/authschema";
import googleIcon from "@/public/icons/icon-google.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [isRegistering, startTransition] = useTransition();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { isOAuthLoggingIn, onOAuthLogin } = useOAuthLogin();

  const [isInputFocusState, SetInputFocusState] = useState({
    isEmailInputFocus: false,
    isPasswordInputFocus: false,
    isConfirmPasswordInputFocus: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log(errors);

  function onSubmitForm(values: RegisterSchemaType) {
    startTransition(async () => {
      const response = await registerAction(values);
      if (response?.success) {
        toast.success(response.success);
        reset();
      }

      if (response?.error) {
        toast.error(response.error);
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* header text */}
      <div className="form-header-texts">
        <h1 className="text-preset-1"> create your account</h1>
        <p className="text-preset-5">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </div>

      <form
        action=""
        autoComplete="on"
        className="flex flex-col gap-4 pt-6"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <AuthFormInput
          error={errors?.email?.message}
          htmlFor="email"
          label="email address"
          isInputFocus={isInputFocusState?.isEmailInputFocus}
        >
          <input
            {...register("email")}
            type="text"
            name="email"
            id="email"
            onFocus={() => {
              SetInputFocusState((cur) => ({
                ...cur,
                isEmailInputFocus: true,
              }));
            }}
            onBlur={(e) => {
              register("email")?.onBlur(e);
              SetInputFocusState((cur) => ({
                ...cur,
                isEmailInputFocus: false,
              }));
            }}
            defaultValue=""
            disabled={isRegistering}
            aria-disabled={isRegistering}
            autoComplete="email"
            aria-label="email"
            aria-live="polite"
            placeholder="email@example.com"
            className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
            aria-describedby="email-error"
            aria-invalid={!!errors?.email?.message}
          />
        </AuthFormInput>

        {/* password */}
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
            {isRegistering ? "Signing up..." : "Sign up"}
          </button>
        </div>
      </form>

      {/* OAuth */}
      <div className="flex flex-col items-center gap-4 border-y border-neutral-200 pt-6 pb-4">
        <p className="text-preset-5 text-neutral-600">Or log in with:</p>
        <button
          className="btn btn-secondary w-full"
          disabled={isRegistering || isOAuthLoggingIn}
          aria-disabled={isRegistering || isOAuthLoggingIn}
          onClick={onOAuthLogin}
        >
          <Image
            src={googleIcon}
            alt="google-icon"
            quality={100}
            priority={true}
          />

          <span className="leading-[100%] font-medium tracking-[0.5px] text-neutral-950">
            {isOAuthLoggingIn ? "Signing in with google..." : "  Google"}
          </span>
        </button>
      </div>

      <div className="flex justify-center">
        <p className="text-preset-5 text-neutral-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-neutral-950 capitalize">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

//  <Eye className="size-4 text-neutral-500" />
