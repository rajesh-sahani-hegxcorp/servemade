# Payload CMS Migrations Guide

Payload CMS uses official database migrations backed by Drizzle and the `@payloadcms/db-postgres` adapter.

## Migration Files Location
All migration files and schema snapshots are stored in:
```text
src/migrations/
```

- Each migration consists of a TypeScript file (`YYYYMMDD_HHMMSS_<name>.ts`), a snapshot JSON (`YYYYMMDD_HHMMSS_<name>.json`), and is registered in `src/migrations/index.ts`.
- All migration files are committed to Git.

---

## Commands

| Command | npm script | Description |
| :--- | :--- | :--- |
| **Check status** | `npm run payload:migrate:status` | Shows all migrations and whether they have been applied in the DB |
| **Create migration** | `npm run payload:migrate:create <name>` | Compares current Payload schema against the DB/snapshots and generates a new migration file |
| **Run migrations** | `npm run payload:migrate` | Executes all pending `up` migrations against the database |
| **Rollback migration** | `npm run payload:migrate:down` | Rolls back the latest applied migration |

---

## Workflow for Schema Changes

1. Modify collection configs (in `src/collections/`) or globals (in `src/globals/`).
2. Generate migration:
   ```bash
   npm run payload:migrate:create add_my_feature
   ```
3. Review the generated file in `src/migrations/` to verify safety and non-destructiveness.
4. Apply the migration:
   ```bash
   npm run payload:migrate
   ```
5. Commit the generated files in `src/migrations/` along with your code changes.
