import { getUserById } from "@/app/_lib/data-service/auth";
import { authConfig } from "@/authConfig";
import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async linkAccount({ user }) {
      if (user?.id) {
        await db
          .update(users)
          .set({ emailVerified: new Date() })
          .where(eq(users?.id, user?.id));
      }
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") return true;

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
