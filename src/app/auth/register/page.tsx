import RegisterForm from "@/app/_components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
