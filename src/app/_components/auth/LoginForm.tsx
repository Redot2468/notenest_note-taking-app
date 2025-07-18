"use client";

import AuthFormInput from "@/app/_components/auth/AuthFormInput";
import PasswordVisibilityBtn from "@/app/_components/reusables/PasswordVisibility";
import { loginAction } from "@/app/_lib/actions/auth/login";

import { useOAuthLogin } from "@/app/_hooks/useOauthLogin";
import googleIcon from "@/public/icons/icon-google.svg";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [state, formAction, isLoggingIn] = useActionState(loginAction, null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isInputFocusState, SetInputFocusState] = useState({
    isEmailInputFocus: false,
    isPasswordInputFocus: false,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") ?? "";

  const { formErrors, inputs } = state ?? {};
  const { isOAuthLoggingIn, onOAuthLogin } = useOAuthLogin();

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.success);
        router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
      } else if (state?.error) {
        toast.error(state?.error);
      }
    }
  }, [state, callbackUrl, router]);

  return (
    <div className="space-y-4">
      <div className="form-header-texts">
        <h1 className="text-preset-1">Welcome to Note</h1>
        <p className="text-preset-5">Please log in to continue.</p>
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
            disabled={isLoggingIn}
            aria-disabled={isLoggingIn}
            autoComplete="email"
            aria-label="email"
            aria-live="polite"
            placeholder="email@example.com"
            className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
            aria-describedby="email-error"
            aria-invalid={!!formErrors?.email?.errors?.at(0)}
          />
        </AuthFormInput>

        {/* password */}
        <AuthFormInput
          error={formErrors?.password?.errors?.at(0)}
          htmlFor="password"
          label="Password"
          isInputFocus={isInputFocusState?.isPasswordInputFocus}
        >
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            id="password"
            disabled={isLoggingIn}
            aria-disabled={isLoggingIn}
            onFocus={() =>
              SetInputFocusState((cur) => ({
                ...cur,
                isPasswordInputFocus: true,
              }))
            }
            onBlur={() => {
              SetInputFocusState((cur) => ({
                ...cur,
                isPasswordInputFocus: false,
              }));
            }}
            autoComplete="password"
            aria-label="password"
            aria-live="polite"
            placeholder="*************"
            className="text-preset-4 flex-grow py-3 text-neutral-950 placeholder:text-neutral-500 focus:outline-none"
            max={1000}
            aria-invalid={!!formErrors?.password?.errors?.at(0)}
          />
          <PasswordVisibilityBtn
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
        </AuthFormInput>

        <Link
          href={"/auth/forgotpassword"}
          className="text-right text-xs leading-[140%] text-neutral-600 underline"
        >
          Forgot Password?
        </Link>

        <div>
          <button
            className="btn btn-primary w-full"
            disabled={isLoggingIn}
            aria-disabled={isLoggingIn}
          >
            {isLoggingIn ? "Signing in..." : "Login"}
          </button>
        </div>
      </form>

      {/* OAuth */}
      <div className="flex flex-col items-center gap-4 border-y border-neutral-200 pt-6 pb-4">
        <p className="text-preset-5 text-neutral-600">Or log in with:</p>
        <button
          className="btn btn-secondary w-full"
          disabled={isLoggingIn || isOAuthLoggingIn}
          aria-disabled={isLoggingIn || isOAuthLoggingIn}
          onClick={onOAuthLogin}
        >
          <Image
            src={googleIcon}
            alt="google-icon"
            quality={100}
            priority={true}
          />

          <span className="leading-[100%] font-medium tracking-[0.5px] text-neutral-950">
            {isOAuthLoggingIn ? "Signing in with google..." : "Google"}
          </span>
        </button>
      </div>

      <div className="flex justify-center">
        <p className="text-preset-5 text-neutral-600">
          No account yet?{" "}
          <Link href="/auth/register" className="text-neutral-950 capitalize">
            {" "}
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
