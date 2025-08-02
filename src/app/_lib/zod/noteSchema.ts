import z from "zod";

export const NoteSchema = z.object({
  title: z.optional(z.string()),
  tags: z.optional(z.string()),
  content: z.optional(z.string()),
});
