/**
 * @param {Date} [date]
 */
export function formatDate(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

/**
 * @param {string} pubDate
 */
export function formatPubDate(pubDate) {
  if (!pubDate) return '';

  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return pubDate;

  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsed);
}

/**
 * @param {import('./fetcher.js').FeedItem[]} items
 * @param {import('./config.js').AppConfig} config
 */
export function formatDigest(items, config) {
  const dateStr = formatDate();
  const title = `${config.digestTitle} · ${dateStr}`;

  const grouped = groupByFeed(items);
  const bodyParts = [`# ${title}`, ''];

  for (const [feedName, feedItems] of grouped) {
    bodyParts.push(`## ${feedName}`, '');

    for (const item of feedItems) {
      const pub = formatPubDate(item.pubDate);
      const sourceLine = pub ? `来源：${feedName} · ${pub}` : `来源：${feedName}`;

      bodyParts.push(`### [${item.title}](${item.link})`, '');
      bodyParts.push(`> ${sourceLine}`, '');

      if (item.summary) {
        bodyParts.push(item.summary, '');
      }

      bodyParts.push('---', '');
    }
  }

  const frontmatter = [
    '---',
    `title: ${title}`,
    `date: ${dateStr}`,
    'category: digest',
    'tags: [rss, 资讯]',
    'draft: true',
    '---',
    '',
  ].join('\n');

  const filename = `rss-digest-${dateStr}.md`;

  return {
    filename,
    content: frontmatter + bodyParts.join('\n').trimEnd() + '\n',
    title,
    dateStr,
  };
}

/**
 * @param {import('./fetcher.js').FeedItem[]} items
 */
function groupByFeed(items) {
  /** @type {Map<string, import('./fetcher.js').FeedItem[]>} */
  const map = new Map();

  for (const item of items) {
    const key = item.feedName || '未知来源';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
  }

  return map;
}
