CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"tags" text[],
	"content" text,
	"isArchived" boolean NOT NULL,
	"author" text
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;