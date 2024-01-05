ALTER TABLE "scripr_user" DROP CONSTRAINT "scripr_user_twoFactorTokenId_scripr_two_factor_token_id_fk";
--> statement-breakpoint
ALTER TABLE "scripr_two_factor_token" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scripr_two_factor_token" ADD CONSTRAINT "scripr_two_factor_token_userId_scripr_user_id_fk" FOREIGN KEY ("userId") REFERENCES "scripr_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "scripr_user" DROP COLUMN IF EXISTS "twoFactorTokenId";--> statement-breakpoint
ALTER TABLE "scripr_user" ADD CONSTRAINT "scripr_user_email_unique" UNIQUE("email");