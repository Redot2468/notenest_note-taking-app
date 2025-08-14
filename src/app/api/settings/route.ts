import { getAuthSession } from "@/src/app/_utils/getSession";
import { db } from "@/src/db";
import { users } from "@/src/db/schema/auth";
import { eq } from "drizzle-orm";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { redirect } from "next/navigation";

export async function GET() {
  const session = await getAuthSession();
  if (!session || !session?.id) redirect("/auth/login");

  try {
    const settings = await db
      .select({ id: users?.id, font: users?.font, theme: users?.theme })
      .from(users)
      .where(eq(users?.id, session?.id));

    return new Response(JSON.stringify(settings?.at(0)), { status: 200 });
  } catch (error) {
    if (error instanceof DrizzleQueryError) {
      if (process.env.NODE_ENV === "development") {
        return new Response(
          `Error fetching settings.${error?.cause}. ${error.message}`,
          {
            status: 500,
          },
        );
      }

      return new Response(`Error fetching settings.${error?.cause}.`, {
        status: 500,
      });
    }
  }
}
