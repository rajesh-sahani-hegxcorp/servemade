import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    ALTER TABLE "homepage_stats" DISABLE ROW LEVEL SECURITY;
   EXCEPTION WHEN undefined_table THEN null;
   END $$;
   DO $$ BEGIN
    ALTER TABLE "_homepage_v_version_stats" DISABLE ROW LEVEL SECURITY;
   EXCEPTION WHEN undefined_table THEN null;
   END $$;
   DROP TABLE IF EXISTS "homepage_stats" CASCADE;
   DROP TABLE IF EXISTS "_homepage_v_version_stats" CASCADE;
   ALTER TABLE "_categories_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
   ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
   ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
   CREATE INDEX IF NOT EXISTS "_categories_v_autosave_idx" ON "_categories_v" USING btree ("autosave");
   CREATE INDEX IF NOT EXISTS "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
   CREATE INDEX IF NOT EXISTS "_homepage_v_autosave_idx" ON "_homepage_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "_homepage_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  DROP INDEX "_categories_v_autosave_idx";
  DROP INDEX "_products_v_autosave_idx";
  DROP INDEX "_homepage_v_autosave_idx";
  ALTER TABLE "homepage_stats" ADD CONSTRAINT "homepage_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_stats" ADD CONSTRAINT "_homepage_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_stats_order_idx" ON "homepage_stats" USING btree ("_order");
  CREATE INDEX "homepage_stats_parent_id_idx" ON "homepage_stats" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_stats_order_idx" ON "_homepage_v_version_stats" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_stats_parent_id_idx" ON "_homepage_v_version_stats" USING btree ("_parent_id");
  ALTER TABLE "_categories_v" DROP COLUMN "autosave";
  ALTER TABLE "_products_v" DROP COLUMN "autosave";
  ALTER TABLE "_homepage_v" DROP COLUMN "autosave";`)
}
