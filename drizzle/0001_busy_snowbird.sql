CREATE TABLE "parcels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tree_photos" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "tree_photos" CASCADE;--> statement-breakpoint
ALTER TABLE "trees" ADD COLUMN "parcel_id" uuid;--> statement-breakpoint
ALTER TABLE "parcels" ADD CONSTRAINT "parcels_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "parcels_user_id_idx" ON "parcels" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "parcels_created_at_idx" ON "parcels" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "trees" ADD CONSTRAINT "trees_parcel_id_parcels_id_fk" FOREIGN KEY ("parcel_id") REFERENCES "public"."parcels"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "trees_parcel_id_idx" ON "trees" USING btree ("parcel_id");