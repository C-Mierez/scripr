CREATE TABLE IF NOT EXISTS "scripr_two_factor_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "scripr_two_factor_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "scripr_user" ADD COLUMN "isTwoFactorEnabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "scripr_user" ADD COLUMN "twoFactorTokenId" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scripr_user" ADD CONSTRAINT "scripr_user_twoFactorTokenId_scripr_two_factor_token_id_fk" FOREIGN KEY ("twoFactorTokenId") REFERENCES "scripr_two_factor_token"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
