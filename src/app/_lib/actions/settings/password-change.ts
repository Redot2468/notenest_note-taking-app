"use server";

import { getUserById } from "@/src/app/_lib/data-service/auth";
import { ChangePasswordSchema } from "@/src/app/_lib/zod/passwordChange";
import { getAuthSession } from "@/src/app/_utils/getSession";
import { PasswordChangeSchemaType } from "@/src/app/_utils/types";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { redirect } from "next/navigation";
import z from "zod";

export async function passwordChangeAction(data: PasswordChangeSchemaType) {
  const user = await getAuthSession();
  if (!user || !user?.id) redirect("/auth/login");

  const validatingData = ChangePasswordSchema.safeParse(data);

  if (!validatingData?.success) {
    return {
      formErrors: z.treeifyError(validatingData?.error)?.properties,
    };
  }

  const validatedData = validatingData?.data ?? {};

  try {
    // create a function for this.
    const userData = await getUserById(user.id);

    if (!userData?.password && userData?.emailVerified) {
      return {
        error:
          "You are logged in using an OAuth provider, hence you can't update password.",
      };
    }

    if (userData?.password) {
      const isOldPasswordMatch = await bcrypt.compare(
        validatedData?.oldPassword,
        userData?.password,
      );

      if (!isOldPasswordMatch)
        return {
          error: "You entered an invalid password as your old password!",
        };

      const isNewPasswordSameAsOld = await bcrypt.compare(
        validatedData?.confirmNewPassword,
        userData.password,
      );

      if (isNewPasswordSameAsOld) {
        return {
          error: "Please enter a different password",
        };
      }
    }

    const newHashedPassword = await bcrypt.hash(
      validatedData?.confirmNewPassword,
      10,
    );

    await db
      .update(users)
      .set({ password: newHashedPassword })
      .where(eq(users?.id, user.id));

    return { success: "Password successfully updated" };
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (process.env.NODE_ENV === "development") {
        return {
          error: `Something went wrong: ${error?.message}. ${error?.cause} `,
        };
      }
      return {
        error: `Something went wrong: ${error?.cause} `,
      };
    }
  }
}
