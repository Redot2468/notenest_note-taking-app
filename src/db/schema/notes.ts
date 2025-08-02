import { users } from "@/src/db/schema/auth";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  published_at: timestamp("published_at").notNull().defaultNow(),
  title: text("title").notNull(),
  tags: text("tags").array(),
  content: text("content"),
  isArchived: boolean("isArchived").notNull().default(false),
  author: text("author").references(() => users?.id, { onDelete: "cascade" }),
});
