import { getUserById } from "@/app/_lib/data-service/auth";
import { authConfig } from "@/src/authConfig";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth, { DefaultSession } from "next-auth";

type Font = "sans" | "serif" | "mono";
type Theme = "light" | "dark" | "system";
declare module "next-auth" {
  interface Session {
    user: {
      font: Font;
      theme: Theme;
    } & DefaultSession["user"];
  }
}

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
    async signIn({ user, account }) {
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

      if (token?.font && token?.theme) {
        session.user.font = token?.font as Font;
        session.user.theme = token?.theme as Theme;
      }

      return session;
    },
    async jwt({ token }) {
      const userId = token?.sub;

      if (userId) {
        const user = await getUserById(userId);
        token.font = user?.font;
        token.theme = user?.theme;
      }

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
});

// email verification on signin
// then handle forgot password
// OAuth.
