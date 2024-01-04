CREATE TABLE IF NOT EXISTS "scripr_password_reset_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"email" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "scripr_password_reset_token_token_unique" UNIQUE("token"),
	CONSTRAINT "scripr_password_reset_token_token_email_unique" UNIQUE("token","email")
);
