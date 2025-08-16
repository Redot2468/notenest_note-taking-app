import { ChangePasswordSchema } from "@/src/app/_lib/zod/passwordChange";
import { notes } from "@/src/db/schema/notes";
import { InferSelectModel } from "drizzle-orm";
import z from "zod";

export type PasswordChangeSchemaType = z.infer<typeof ChangePasswordSchema>;

export interface ChildrenType {
  children: React.ReactNode;
}

export type NoteFormStateType = {
  noteContent: string;
  title: string;
  tags: string;
};

export type NoteFromDbType = InferSelectModel<typeof notes> | undefined;

export type Theme = "light" | "dark" | "system";

export type Font = "sans" | "serif" | "mono";

export interface Settings {
  id: string;
  font: Font;
  theme: Theme;
}
