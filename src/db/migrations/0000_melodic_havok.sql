CREATE TABLE IF NOT EXISTS "category" (
	"id" text PRIMARY KEY GENERATED ALWAYS AS (replace(lower("category"."en_name"), ' ', '-')) STORED NOT NULL,
	"el_name" varchar NOT NULL,
	"en_name" varchar NOT NULL,
	"el_notes" varchar[],
	"en_notes" varchar[],
	CONSTRAINT "category_el_name_unique" UNIQUE("el_name"),
	CONSTRAINT "category_en_name_unique" UNIQUE("en_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" text NOT NULL,
	"el_name" varchar NOT NULL,
	"en_name" varchar NOT NULL,
	"el_description" varchar[],
	"en_description" varchar[],
	"price" real NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
