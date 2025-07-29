import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// 当前脚本目录：假设项目结构是 <docs>/.vitepress/make-sidebar.js
const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT   = resolve(__dirname, '..'); 
const SCAN_BASE   = join(DOCS_ROOT, 'frontend');    // 要扫描的目录
const OUTPUT_FILE = join(DOCS_ROOT, '.vitepress', 'sidebar-auto.json');

function scan(dir, base = '') {
  const items = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, name.name);
    const relPath  = join(base, name.name);
    if (name.isDirectory()) {
      items.push({ text: name.name, items: scan(fullPath, relPath) });
    } else if (extname(name.name) === '.md') {
      const link = '/frontend/' + relPath.replace(/\\/g, '/').replace(/\.md$/, '');
      items.push({ text: name.name.replace(/\.md$/, ''), link });
    }
  }
  return items.sort((a, b) => {
    // 目录放前面，文件放后面；可按需要自行排序
    return (a.items ? -1 : 1) - (b.items ? -1 : 1);
  });
}

const sidebar = scan(SCAN_BASE);
writeFileSync(OUTPUT_FILE, JSON.stringify(sidebar, null, 2));
console.log('✅ sidebar-auto.json 已生成');