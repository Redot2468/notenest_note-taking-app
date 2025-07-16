import { getUserById } from "@/app/_lib/data-service/auth";
import { authConfig } from "@/authConfig";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (user?.id) {
        const existingUser = await getUserById(user?.id);
        if (!existingUser?.emailVerified) {
          return false;
        }

        return true;
      }

      return false;
    },
    session({ token, session }) {
      if (token?.sub) {
        session.user.id = token?.sub;
      }

      return session;
    },
    jwt({ token }) {
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
});

// email verification on signin
// then handle forgot password
// OAuth.
