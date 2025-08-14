CREATE TYPE "public"."fonts" AS ENUM('sans', 'serif', 'mono');--> statement-breakpoint
CREATE TYPE "public"."themes" AS ENUM('light', 'dark', 'system');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "theme" "themes" DEFAULT 'system';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "font" "fonts" DEFAULT 'mono';