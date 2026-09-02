const { getPayload } = require('payload');
const path = require('path');
const { pathToFileURL } = require('url');

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'status';
  const param = args[1];

  const configUrl = pathToFileURL(path.resolve(__dirname, '../src/payload.config.ts')).href;
  const confModule = await import(configUrl);
  const conf = await (confModule.default.default || confModule.default);
  const payload = await getPayload({ config: conf });

  switch (command) {
    case 'status':
      await payload.db.migrateStatus();
      break;
    case 'create':
      await payload.db.createMigration({
        payload,
        migrationName: param || 'migration',
        forceAcceptWarning: true,
      });
      break;
    case 'migrate':
    case 'up':
      await payload.db.migrate({ forceAcceptWarning: true });
      break;
    case 'down':
      await payload.db.migrateDown();
      break;
    case 'refresh':
      await payload.db.migrateRefresh();
      break;
    default:
      console.log(`Unknown command: ${command}. Available: status, create [name], migrate, down, refresh`);
      break;
  }

  process.exit(0);
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
