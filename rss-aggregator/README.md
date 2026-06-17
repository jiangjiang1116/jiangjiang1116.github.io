# RSS Aggregator

为 VitePress 博客自动采集 RSS 源，去重后生成 **digest** 模式的 Markdown 草稿。

## 功能

- 通过 `feeds.json` 配置多个 RSS 源、分类、每源条数上限
- 按 cron 定时执行（默认每天 8:00、18:00，Asia/Shanghai）
- 拉取 → 去重（`data/seen.json`）→ 合并为一篇「资讯精选」→ 写入 `posts/draft/`
- 单源失败不影响其他源；只保留摘要 + 原文链接（版权合规）

## 安装

```bash
cd rss-aggregator
npm install
```

## 配置

编辑 `feeds.json`：

| 字段 | 说明 |
|------|------|
| `schedule` | node-cron 表达式，如 `0 8,18 * * *` |
| `timezone` | 时区，默认 `Asia/Shanghai` |
| `outputDir` | 输出目录，相对 `rss-aggregator/`，默认 `../posts/draft` |
| `mode` | `digest`（MVP 仅支持此项）或 `single`（第二期） |
| `digestTitle` | digest 标题前缀 |
| `feeds` | RSS 源数组：`name`、`url`、`category`、`maxItems` |

## 手动运行

```bash
npm run aggregate
```

日志示例：

```
[fetcher] ✓ Hacker News: 5 items
[pipeline] Fetched 23 items, 18 new after dedup
[pipeline] ✓ Wrote digest: ../posts/draft/rss-digest-2026-06-17.md
```

## 定时运行

```bash
npm start
```

进程常驻，按 `feeds.json` 中的 `schedule` 触发。生产环境可用 pm2、systemd 或 Windows 任务计划程序托管。

## 输出格式

生成文件位于 VitePress 项目根目录的 `posts/draft/`，含 frontmatter：

```markdown
---
title: 技术资讯精选 · 2026-06-17
date: 2026-06-17
category: digest
tags: [rss, 资讯]
draft: true
---
```

人工 review 后，可将文件移至 `frontend/` 等正式目录并发布。

## 去重

已处理文章的 `guid` 或链接记录在 `data/seen.json`。重启服务不会重复生成同一篇文章。

如需重新采集某篇，从 `seen.json` 中删除对应 key。

## 目录结构

```
rss-aggregator/
├── feeds.json          # RSS 源与调度配置
├── data/
│   └── seen.json       # 去重记录
├── src/
│   ├── index.js        # 入口 + cron
│   ├── config.js       # 加载配置
│   ├── fetcher.js      # RSS 拉取
│   ├── deduper.js      # 去重
│   ├── formatter.js    # Markdown + frontmatter
│   ├── writer.js       # 写文件
│   └── pipeline.js     # 流程串联
└── package.json
```

## 验证

1. `npm run aggregate`
2. 检查 `posts/draft/rss-digest-YYYY-MM-DD.md` 是否生成
3. 再次运行应显示 `No new items`（去重生效）
4. VitePress 预览：`cd .. && npm run docs:dev`，访问 `/posts/draft/rss-digest-...`

## 第二期规划（未实现）

- `single` 模式：每条 RSS 单独一篇
- AI 摘要 / 自动分类
- 抓原文短摘要（cheerio）
- HTTP API / Web 管理界面
- 自动 git commit
