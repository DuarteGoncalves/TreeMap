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
ALTER TABLE "tree_photos" ADD CONSTRAINT "tree_photos_tree_id_trees_id_fk" FOREIGN KEY ("tree_id") REFERENCES "public"."trees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "tree_photos_tree_id_idx" ON "tree_photos" USING btree ("tree_id");--> statement-breakpoint
CREATE INDEX "tree_photos_created_at_idx" ON "tree_photos" USING btree ("created_at");