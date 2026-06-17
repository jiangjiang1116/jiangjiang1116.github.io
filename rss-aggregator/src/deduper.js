import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEEN_PATH = resolve(__dirname, '../data/seen.json');

/**
 * @returns {Record<string, { title: string; seenAt: string }>}
 */
export function loadSeen() {
  try {
    const raw = readFileSync(SEEN_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * @param {Record<string, { title: string; seenAt: string }>} seen
 */
export function saveSeen(seen) {
  mkdirSync(dirname(SEEN_PATH), { recursive: true });
  writeFileSync(SEEN_PATH, JSON.stringify(seen, null, 2), 'utf-8');
}

/**
 * @param {import('./fetcher.js').FeedItem[]} items
 */
export function filterNewItems(items) {
  const seen = loadSeen();
  const newItems = [];

  for (const item of items) {
    const key = getDedupeKey(item);
    if (!key) continue;
    if (seen[key]) continue;
    newItems.push(item);
  }

  return { newItems, seen };
}

/**
 * @param {import('./fetcher.js').FeedItem[]} items
 * @param {Record<string, { title: string; seenAt: string }>} seen
 */
export function markAsSeen(items, seen) {
  const now = new Date().toISOString();

  for (const item of items) {
    const key = getDedupeKey(item);
    if (!key) continue;
    seen[key] = {
      title: item.title,
      seenAt: now,
    };
  }

  saveSeen(seen);
}

/**
 * @param {import('./fetcher.js').FeedItem} item
 */
function getDedupeKey(item) {
  return (item.id || item.link || '').trim();
}
