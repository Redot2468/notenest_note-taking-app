import EmailVerifyTemp from "@/app/_components/auth/EmailVerifyTemp";
import ResetPassword from "@/app/_components/auth/PasswordResetTemp";
import { cache } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const sendPasswordResetMail = cache(
  async (token: string, email: string) => {
    const resetUrl = `${process.env.APP_URL}/auth/resetpassword?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      //   change this later to user's email
      to: "lawalridwan025@gmail.com",
      subject: "Reset your password",
      react: ResetPassword({ resetUrl }),
    });
  },
);

export const sendEmailVerifcationMail = cache(
  async (token: string, email: string) => {
    const confirmationLink = `${process.env.APP_URL}/auth/verifyemail?token=${token}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      //   change this later to user's email
      to: "lawalridwan025@gmail.com",
      subject: "Verify email",
      react: EmailVerifyTemp({ confirmationLink }),
    });
  },
);
