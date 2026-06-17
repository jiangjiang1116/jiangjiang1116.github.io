import Parser from 'rss-parser';
import TurndownService from 'turndown';

const parser = new Parser({
  timeout: 15000,
  headers: {
    'User-Agent': 'rss-aggregator/1.0 (VitePress blog digest)',
    Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml',
  },
});

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});
turndown.remove('script');
turndown.remove('style');

/**
 * @typedef {Object} FeedItem
 * @property {string} id
 * @property {string} title
 * @property {string} link
 * @property {string} [pubDate]
 * @property {string} [summary]
 * @property {string} feedName
 * @property {string} [category]
 */

/**
 * @param {import('./config.js').FeedConfig} feed
 * @returns {Promise<{ items: FeedItem[]; error?: string }>}
 */
export async function fetchFeed(feed) {
  const maxItems = feed.maxItems ?? 10;

  try {
    const result = await parser.parseURL(feed.url);
    const items = (result.items ?? []).slice(0, maxItems).map((item) => normalizeItem(item, feed));

    return { items };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { items: [], error: message };
  }
}

/**
 * @param {import('rss-parser').Item} item
 * @param {import('./config.js').FeedConfig} feed
 * @returns {FeedItem}
 */
function normalizeItem(item, feed) {
  const link = (item.link || item.guid || '').trim();
  const id = (item.guid || item.id || link).trim();
  const rawSummary = item.contentSnippet || item.summary || item.content || item.description || '';
  const summary = htmlToPlainSummary(rawSummary);

  return {
    id: id || link,
    title: stripHtml(item.title || '无标题').trim(),
    link,
    pubDate: item.pubDate || item.isoDate || '',
    summary,
    feedName: feed.name,
    category: feed.category,
  };
}

/**
 * @param {string} html
 */
function htmlToPlainSummary(html) {
  if (!html) return '';

  const markdown = turndown.turndown(html);
  return markdown
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 500);
}

/**
 * @param {string} text
 */
function stripHtml(text) {
  return text.replace(/<[^>]*>/g, '');
}

/**
 * @param {import('./config.js').FeedConfig[]} feeds
 */
export async function fetchAllFeeds(feeds) {
  const results = [];
  const allItems = [];

  for (const feed of feeds) {
    const { items, error } = await fetchFeed(feed);

    results.push({
      feedName: feed.name,
      url: feed.url,
      fetched: items.length,
      error,
    });

    if (error) {
      console.error(`[fetcher] ✗ ${feed.name}: ${error}`);
    } else {
      console.log(`[fetcher] ✓ ${feed.name}: ${items.length} items`);
    }

    allItems.push(...items);
  }

  return { items: allItems, results };
}
