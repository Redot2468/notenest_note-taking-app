import { getUserByEmail } from "@/app/_lib/data-service/auth";
import { LoginSchema } from "@/app/_lib/zod/authschema";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials);

        if (!validatedCredentials?.success) {
          return null;
        }

        const { email, password } = validatedCredentials?.data ?? {};

        const existingUser = await getUserByEmail(email);
        if (!existingUser || !existingUser?.password) return null;

        const doesPasswordMatch = await bcrypt.compare(
          password,
          existingUser?.password,
        );
        if (!doesPasswordMatch) return null;

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
