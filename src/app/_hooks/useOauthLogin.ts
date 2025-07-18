import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";

export function useOAuthLogin() {
  const [isOAuthLoggingIn, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "";
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider"
      : "";

  useEffect(() => {
    if (urlError) {
      toast.error(urlError);
    }
  }, [urlError]);

  function onOAuthLogin() {
    startTransition(() => {
      signIn("google", { redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT });
    });
  }

  return { isOAuthLoggingIn, onOAuthLogin };
}
