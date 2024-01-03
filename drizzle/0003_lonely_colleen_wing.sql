CREATE TABLE IF NOT EXISTS "scripr_verification_token" (
	"id" uuid PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"email" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "scripr_verification_token_token_unique" UNIQUE("token"),
	CONSTRAINT "scripr_verification_token_token_email_unique" UNIQUE("token","email")
);
