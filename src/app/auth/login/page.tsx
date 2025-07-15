import LoginForm from "@/app/_components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
