import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "category_showcase_tag" varchar;
   ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "category_showcase_heading" varchar;
   ALTER TABLE "homepage_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
   ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_category_showcase_tag" varchar;
   ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_category_showcase_heading" varchar;
   ALTER TABLE "_homepage_v_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
   DO $$ BEGIN
    ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null;
   END $$;
   DO $$ BEGIN
    ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null;
   END $$;
   CREATE INDEX IF NOT EXISTS "homepage_rels_categories_id_idx" ON "homepage_rels" USING btree ("categories_id");
   CREATE INDEX IF NOT EXISTS "_homepage_v_rels_categories_id_idx" ON "_homepage_v_rels" USING btree ("categories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_rels" DROP CONSTRAINT "homepage_rels_categories_fk";
  
  ALTER TABLE "_homepage_v_rels" DROP CONSTRAINT "_homepage_v_rels_categories_fk";
  
  DROP INDEX "homepage_rels_categories_id_idx";
  DROP INDEX "_homepage_v_rels_categories_id_idx";
  ALTER TABLE "homepage" DROP COLUMN "category_showcase_tag";
  ALTER TABLE "homepage" DROP COLUMN "category_showcase_heading";
  ALTER TABLE "homepage_rels" DROP COLUMN "categories_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_category_showcase_tag";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_category_showcase_heading";
  ALTER TABLE "_homepage_v_rels" DROP COLUMN "categories_id";`)
}
