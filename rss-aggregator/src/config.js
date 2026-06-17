import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/**
 * @typedef {Object} FeedConfig
 * @property {string} name
 * @property {string} url
 * @property {string} [category]
 * @property {number} [maxItems]
 */

/**
 * @typedef {Object} AppConfig
 * @property {string} schedule
 * @property {string} timezone
 * @property {string} outputDir
 * @property {'digest' | 'single'} mode
 * @property {string} digestTitle
 * @property {FeedConfig[]} feeds
 */

/**
 * @returns {AppConfig}
 */
export function loadConfig(configPath = resolve(ROOT, 'feeds.json')) {
  const raw = readFileSync(configPath, 'utf-8');
  const config = JSON.parse(raw);

  if (!config.feeds?.length) {
    throw new Error('feeds.json must contain at least one feed');
  }

  return {
    schedule: config.schedule ?? '0 8,18 * * *',
    timezone: config.timezone ?? 'Asia/Shanghai',
    outputDir: resolveOutputDir(config.outputDir),
    mode: config.mode ?? 'digest',
    digestTitle: config.digestTitle ?? '技术资讯精选',
    feeds: config.feeds,
  };
}

/**
 * @param {string} outputDir
 */
function resolveOutputDir(outputDir) {
  if (!outputDir) {
    return resolve(ROOT, '../posts/draft');
  }
  return resolve(ROOT, outputDir);
}

export { ROOT };
