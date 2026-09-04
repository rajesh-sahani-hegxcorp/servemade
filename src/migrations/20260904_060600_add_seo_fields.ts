import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
  ALTER TABLE "_categories_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
  ALTER TABLE "_categories_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
  ALTER TABLE "_categories_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'categories_meta_image_id_media_id_fk') THEN
      ALTER TABLE "categories" ADD CONSTRAINT "categories_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_categories_v_version_meta_image_id_media_id_fk') THEN
      ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_meta_image_id_media_id_fk') THEN
      ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_products_v_version_meta_image_id_media_id_fk') THEN
      ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'homepage_meta_image_id_media_id_fk') THEN
      ALTER TABLE "homepage" ADD CONSTRAINT "homepage_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_homepage_v_version_meta_image_id_media_id_fk') THEN
      ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "categories_meta_meta_image_idx" ON "categories" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_categories_v_version_meta_version_meta_image_idx" ON "_categories_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_meta_version_meta_image_idx" ON "_products_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "homepage_meta_meta_image_idx" ON "homepage" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_homepage_v_version_meta_version_meta_image_idx" ON "_homepage_v" USING btree ("version_meta_image_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP CONSTRAINT "categories_meta_image_id_media_id_fk";
  
  ALTER TABLE "_categories_v" DROP CONSTRAINT "_categories_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_meta_image_id_media_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "homepage" DROP CONSTRAINT "homepage_meta_image_id_media_id_fk";
  
  ALTER TABLE "_homepage_v" DROP CONSTRAINT "_homepage_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX "categories_meta_meta_image_idx";
  DROP INDEX "_categories_v_version_meta_version_meta_image_idx";
  DROP INDEX "products_meta_meta_image_idx";
  DROP INDEX "_products_v_version_meta_version_meta_image_idx";
  DROP INDEX "homepage_meta_meta_image_idx";
  DROP INDEX "_homepage_v_version_meta_version_meta_image_idx";
  ALTER TABLE "categories" DROP COLUMN "meta_title";
  ALTER TABLE "categories" DROP COLUMN "meta_description";
  ALTER TABLE "categories" DROP COLUMN "meta_image_id";
  ALTER TABLE "_categories_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_categories_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_categories_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "products" DROP COLUMN "meta_title";
  ALTER TABLE "products" DROP COLUMN "meta_description";
  ALTER TABLE "products" DROP COLUMN "meta_image_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_products_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_products_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "homepage" DROP COLUMN "meta_title";
  ALTER TABLE "homepage" DROP COLUMN "meta_description";
  ALTER TABLE "homepage" DROP COLUMN "meta_image_id";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_meta_image_id";`)
}
