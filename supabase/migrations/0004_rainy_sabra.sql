CREATE TABLE "resetPasswordToken" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"expires" timestamp NOT NULL,
	"token" text NOT NULL,
	CONSTRAINT "resetPasswordToken_email_unique" UNIQUE("email")
);
