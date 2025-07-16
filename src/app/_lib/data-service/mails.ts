import EmailVerifyTemp from "@/app/_components/auth/EmailVerifyTemp";
import { cache } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const sendEmailVerifcationToken = cache(
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
