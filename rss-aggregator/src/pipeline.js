import { loadConfig } from './config.js';
import { fetchAllFeeds } from './fetcher.js';
import { filterNewItems, markAsSeen } from './deduper.js';
import { formatDigest } from './formatter.js';
import { writeMarkdown } from './writer.js';

/**
 * @param {import('./config.js').AppConfig} [config]
 */
export async function runPipeline(config = loadConfig()) {
  console.log('[pipeline] Starting RSS aggregation...');
  console.log(`[pipeline] Mode: ${config.mode}, feeds: ${config.feeds.length}`);

  const { items, results } = await fetchAllFeeds(config.feeds);
  const totalFetched = items.length;

  const { newItems, seen } = filterNewItems(items);
  const newCount = newItems.length;

  console.log(`[pipeline] Fetched ${totalFetched} items, ${newCount} new after dedup`);

  if (newCount === 0) {
    console.log('[pipeline] No new items — skipping file write');
    return {
      outputPath: null,
      totalFetched,
      newCount,
      results,
    };
  }

  if (config.mode !== 'digest') {
    throw new Error(`Mode "${config.mode}" is not implemented yet. Use "digest" for MVP.`);
  }

  const doc = formatDigest(newItems, config);
  const outputPath = writeMarkdown(config.outputDir, doc);

  markAsSeen(newItems, seen);

  console.log(`[pipeline] ✓ Wrote digest: ${outputPath}`);
  console.log(`[pipeline] Marked ${newCount} items as seen`);

  return {
    outputPath,
    totalFetched,
    newCount,
    results,
    title: doc.title,
  };
}
