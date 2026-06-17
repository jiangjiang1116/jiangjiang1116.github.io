import cron from 'node-cron';
import { loadConfig } from './config.js';
import { runPipeline } from './pipeline.js';

const args = process.argv.slice(2);
const runOnce = args.includes('--once');

async function main() {
  const config = loadConfig();

  if (runOnce) {
    await runPipeline(config);
    return;
  }

  console.log(`[cron] Scheduled: "${config.schedule}" (${config.timezone})`);

  if (!cron.validate(config.schedule)) {
    throw new Error(`Invalid cron expression: ${config.schedule}`);
  }

  cron.schedule(
    config.schedule,
    async () => {
      console.log(`[cron] Triggered at ${new Date().toISOString()}`);
      try {
        await runPipeline(config);
      } catch (err) {
        console.error('[cron] Pipeline failed:', err);
      }
    },
    { timezone: config.timezone },
  );

  console.log('[cron] Waiting for next run... (Ctrl+C to stop)');
}

main().catch((err) => {
  console.error('[fatal]', err);
  process.exit(1);
});
