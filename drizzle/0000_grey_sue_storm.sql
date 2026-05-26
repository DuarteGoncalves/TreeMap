CREATE TYPE "public"."tree_species" AS ENUM('olive', 'pine');--> statement-breakpoint
CREATE TABLE "tree_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tree_id" uuid NOT NULL,
	"filename" text NOT NULL,
	"path" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"lat" double precision,
	"lng" double precision
);
--> statement-breakpoint
CREATE TABLE "trees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"species" "tree_species" NOT NULL,
	"lat" double precision NOT NULL,
	"lng" double precision NOT NULL,
	"accuracy" double precision,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "tree_photos" ADD CONSTRAINT "tree_photos_tree_id_trees_id_fk" FOREIGN KEY ("tree_id") REFERENCES "public"."trees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trees" ADD CONSTRAINT "trees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "tree_photos_tree_id_idx" ON "tree_photos" USING btree ("tree_id");--> statement-breakpoint
CREATE INDEX "tree_photos_created_at_idx" ON "tree_photos" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "trees_user_id_idx" ON "trees" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "trees_species_idx" ON "trees" USING btree ("species");--> statement-breakpoint
CREATE INDEX "trees_created_at_idx" ON "trees" USING btree ("created_at");