import ResetPasswordForm from "@/app/_components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
}
