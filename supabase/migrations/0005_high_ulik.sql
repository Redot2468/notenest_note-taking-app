ALTER TABLE "user" DROP CONSTRAINT "user_password_unique";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;