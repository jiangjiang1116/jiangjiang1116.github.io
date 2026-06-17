import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * @param {string} outputDir
 * @param {{ filename: string; content: string }} doc
 */
export function writeMarkdown(outputDir, doc) {
  mkdirSync(outputDir, { recursive: true });

  let filepath = join(outputDir, doc.filename);
  if (existsSync(filepath)) {
    const stamp = Date.now();
    const ext = '.md';
    const base = doc.filename.slice(0, -ext.length);
    filepath = join(outputDir, `${base}-${stamp}${ext}`);
  }

  writeFileSync(filepath, doc.content, 'utf-8');
  return filepath;
}
