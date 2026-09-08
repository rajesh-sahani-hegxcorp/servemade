import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "header_primary_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"announcement_text" varchar DEFAULT 'Ships from Nhava Sheva, India — GCC ports in 5–9 days',
  	"quote_button_text" varchar DEFAULT 'My quote',
  	"cta_button_text" varchar DEFAULT 'Get a quote',
  	"mega_menu_banner_text" varchar DEFAULT 'Need custom sizing, shapes, or private-label embossing?',
  	"mega_menu_banner_link_text" varchar DEFAULT 'Explore Custom & Private Label →',
  	"mega_menu_banner_link_url" varchar DEFAULT '/custom-packaging',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_description" varchar DEFAULT 'Serve Made is an India-based B2B exporter of certified compostable food packaging — bagasse tableware, paper cups, takeaway boxes, bags, cutlery and straws — serving importers, distributors and food-service groups across the GCC and beyond.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'header_primary_nav_parent_id_fk') THEN
      ALTER TABLE "header_primary_nav" ADD CONSTRAINT "header_primary_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'footer_columns_links_parent_id_fk') THEN
      ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'footer_columns_parent_id_fk') THEN
      ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'footer_legal_links_parent_id_fk') THEN
      ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'footer_social_links_parent_id_fk') THEN
      ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "header_primary_nav_order_idx" ON "header_primary_nav" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_primary_nav_parent_id_idx" ON "header_primary_nav" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE IF EXISTS "header_primary_nav" CASCADE;
  DROP TABLE IF EXISTS "header" CASCADE;
  DROP TABLE IF EXISTS "footer_columns_links" CASCADE;
  DROP TABLE IF EXISTS "footer_columns" CASCADE;
  DROP TABLE IF EXISTS "footer_legal_links" CASCADE;
  DROP TABLE IF EXISTS "footer_social_links" CASCADE;
  DROP TABLE IF EXISTS "footer" CASCADE;
  `)
}
