import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_homepage_resources_icon" AS ENUM('download', 'file', 'recycle');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
   DO $$ BEGIN
    CREATE TYPE "public"."enum__homepage_v_version_resources_icon" AS ENUM('download', 'file', 'recycle');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
  CREATE TABLE IF NOT EXISTS "homepage_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "homepage_custom_branding_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "homepage_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar,
  	"icon" "enum_homepage_resources_icon"
  );
  
  CREATE TABLE IF NOT EXISTS "homepage_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_custom_branding_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"link_text" varchar,
  	"link_url" varchar,
  	"icon" "enum__homepage_v_version_resources_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_homepage_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "custom_branding_tag" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "custom_branding_heading" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "custom_branding_description" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "custom_branding_cta_text" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "custom_branding_cta_link" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "custom_branding_image_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_custom_branding_tag" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_custom_branding_heading" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_custom_branding_description" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_custom_branding_cta_text" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_custom_branding_cta_link" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_custom_branding_image_id" integer;
  
  DO $$ BEGIN
   ALTER TABLE "homepage_certifications" ADD CONSTRAINT "homepage_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "homepage_custom_branding_bullets" ADD CONSTRAINT "homepage_custom_branding_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "homepage_resources" ADD CONSTRAINT "homepage_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "homepage_faqs" ADD CONSTRAINT "homepage_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_homepage_v_version_certifications" ADD CONSTRAINT "_homepage_v_version_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_homepage_v_version_custom_branding_bullets" ADD CONSTRAINT "_homepage_v_version_custom_branding_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_homepage_v_version_resources" ADD CONSTRAINT "_homepage_v_version_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_homepage_v_version_faqs" ADD CONSTRAINT "_homepage_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "homepage_certifications_order_idx" ON "homepage_certifications" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "homepage_certifications_parent_id_idx" ON "homepage_certifications" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "homepage_custom_branding_bullets_order_idx" ON "homepage_custom_branding_bullets" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "homepage_custom_branding_bullets_parent_id_idx" ON "homepage_custom_branding_bullets" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "homepage_resources_order_idx" ON "homepage_resources" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "homepage_resources_parent_id_idx" ON "homepage_resources" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "homepage_faqs_order_idx" ON "homepage_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "homepage_faqs_parent_id_idx" ON "homepage_faqs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_certifications_order_idx" ON "_homepage_v_version_certifications" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_certifications_parent_id_idx" ON "_homepage_v_version_certifications" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_custom_branding_bullets_order_idx" ON "_homepage_v_version_custom_branding_bullets" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_custom_branding_bullets_parent_id_idx" ON "_homepage_v_version_custom_branding_bullets" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_resources_order_idx" ON "_homepage_v_version_resources" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_resources_parent_id_idx" ON "_homepage_v_version_resources" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_faqs_order_idx" ON "_homepage_v_version_faqs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_faqs_parent_id_idx" ON "_homepage_v_version_faqs" USING btree ("_parent_id");

  DO $$ BEGIN
   ALTER TABLE "homepage" ADD CONSTRAINT "homepage_custom_branding_image_id_media_id_fk" FOREIGN KEY ("custom_branding_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_custom_branding_image_id_media_id_fk" FOREIGN KEY ("version_custom_branding_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "homepage_custom_branding_custom_branding_image_idx" ON "homepage" USING btree ("custom_branding_image_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_custom_branding_version_custom_brand_idx" ON "_homepage_v" USING btree ("version_custom_branding_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_certifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_custom_branding_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "homepage_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_version_certifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_version_custom_branding_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_version_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_homepage_v_version_faqs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "homepage_certifications" CASCADE;
  DROP TABLE "homepage_custom_branding_bullets" CASCADE;
  DROP TABLE "homepage_resources" CASCADE;
  DROP TABLE "homepage_faqs" CASCADE;
  DROP TABLE "_homepage_v_version_certifications" CASCADE;
  DROP TABLE "_homepage_v_version_custom_branding_bullets" CASCADE;
  DROP TABLE "_homepage_v_version_resources" CASCADE;
  DROP TABLE "_homepage_v_version_faqs" CASCADE;
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_custom_branding_image_id_media_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_custom_branding_image_id_media_id_fk";
  
  DROP INDEX "homepage_custom_branding_custom_branding_image_idx";
  DROP INDEX "_homepage_v_version_custom_branding_version_custom_brand_idx";
  ALTER TABLE "homepage" DROP COLUMN "custom_branding_tag";
  ALTER TABLE "homepage" DROP COLUMN "custom_branding_heading";
  ALTER TABLE "homepage" DROP COLUMN "custom_branding_description";
  ALTER TABLE "homepage" DROP COLUMN "custom_branding_cta_text";
  ALTER TABLE "homepage" DROP COLUMN "custom_branding_cta_link";
  ALTER TABLE "homepage" DROP COLUMN "custom_branding_image_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_custom_branding_tag";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_custom_branding_heading";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_custom_branding_description";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_custom_branding_cta_text";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_custom_branding_cta_link";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_custom_branding_image_id";
  DROP TYPE "public"."enum_homepage_resources_icon";
  DROP TYPE "public"."enum__homepage_v_version_resources_icon";`)
}
