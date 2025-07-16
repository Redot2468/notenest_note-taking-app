import ForgotPassword from "@/app/_components/auth/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function Page() {
  return (
    <div>
      <ForgotPassword />
    </div>
  );
}
