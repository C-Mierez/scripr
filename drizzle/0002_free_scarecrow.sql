ALTER TABLE "scripr_account" ALTER COLUMN "userId" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "scripr_user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "scripr_user" ALTER COLUMN "id" DROP DEFAULT;