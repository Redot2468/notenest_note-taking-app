"use server";

import {
  getPasswordResetTokenByToken,
  getUserByEmail,
} from "@/app/_lib/data-service/auth";
import { sendPasswordResetMail } from "@/app/_lib/data-service/mails";
import { generatePasswordResetToken } from "@/app/_lib/data-service/tokens";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@/app/_lib/zod/authschema";
import { db } from "@/db";
import { resetPasswordToken, users } from "@/db/schema/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import z from "zod";

export async function resetPasswordAction(
  formData: z.infer<typeof ResetPasswordSchema>,
) {
  const validatedPasswords = ResetPasswordSchema.safeParse(formData);
  if (!validatedPasswords?.success) {
    return {
      errors: "Invalid passwords",
    };
  }
  const token = formData?.token;
  console.log(token, "token");
  if (token) {
    const tokenExists = await getPasswordResetTokenByToken(token);
    console.log("yes");
    if (!tokenExists) {
      return { error: "Invalid token" };
    }

    const hasExpired = new Date(tokenExists?.expires) < new Date();
    console.log("ohh");
    if (hasExpired) {
      return { error: "Invalid token" };
    }
    console.log("no");

    const tokenOwner = await getUserByEmail(tokenExists?.email);
    console.log("but");
    if (!tokenOwner) {
      return { error: "Invalid token" };
    }

    try {
      if (tokenOwner?.password) {
        console.log("okay");
        const newPasswordSameWithCurrent = await bcrypt.compare(
          formData?.confirmPassword,
          tokenOwner?.password,
        );

        if (newPasswordSameWithCurrent) {
          return { error: "Please use another password" };
        }
      }

      const hashedPassword = await bcrypt.hash(formData?.confirmPassword, 10);

      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users?.id, tokenOwner?.id));

      await db
        .delete(resetPasswordToken)
        .where(eq(resetPasswordToken?.id, tokenExists?.id));

      return {
        success: "Account password successfully updated, please log in",
      };
    } catch (error) {
      if (error instanceof Error) {
        return { error: `Something went wrong - ${error?.cause}` };
      }
    }
  } else {
    return { error: "Invalid token" };
  }
}

export async function forgotPasswordAction(
  prevState: unknown,
  formData: FormData,
) {
  const credentials = Object.fromEntries(formData.entries());
  const validatedFormData = ForgotPasswordSchema.safeParse(credentials);

  if (!validatedFormData?.success) {
    return {
      formErrors: z.treeifyError(validatedFormData?.error)?.properties,
      inputs: credentials,
    };
  }

  const { email } = validatedFormData?.data ?? {};

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { success: "Reset Link Sent Successfully" };
  } else {
    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken)
      return { error: "Password reset token was not created" };

    await sendPasswordResetMail(passwordResetToken?.token, email);

    return { success: "Reset link sent successfully" };
  }
}
