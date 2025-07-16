"use client";

import { verifyEmailAction } from "@/app/_lib/actions/auth/register";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isVerifying, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    function emailVerifcation() {
      if (!token) {
        toast.error("Invalid token!");
        return;
      }

      startTransition(async () => {
        const response = await verifyEmailAction(token);

        if (response?.success) {
          toast.success(response?.success);
          router.push("/auth/login");
        }
        if (response?.error) {
          toast.error(response?.error);
          router.push("/auth/login");
        }
      });
    }

    emailVerifcation();
  }, [token, router]);

  return (
    <div className="py-8">
      {isVerifying && (
        <div className="flex flex-col items-center gap-4">
          <SyncLoader className="text-sm" size={10} />

          <p className="text-preset-3 text-neutral-950 italic">
            Verifying email address...
          </p>
        </div>
      )}
    </div>
  );
}
