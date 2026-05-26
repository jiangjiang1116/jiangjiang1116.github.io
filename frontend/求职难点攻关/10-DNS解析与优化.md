# 10 · DNS 解析与优化

## 一句话

访问 **别的域名** 的资源前，浏览器要把域名变成 IP（DNS）；**首次慢** → 用 `dns-prefetch` **提前解析**。

## 和你日常工作的关系

页面引了 CDN、统计、第三方 SDK、外链图，Network 里会看到多个域名的 **DNS** 耗时。首访用户会叠加这些时间。

## 原理

1. 查缓存（浏览器 → hosts → 系统 → 运营商 DNS → 根/顶级/权威）。  
2. 第一次没有缓存，常见 **几十～几百 ms**。  
3. `<link rel="dns-prefetch" href="https://cdn.xxx.com">` 让浏览器**尽早**解析，真正请求资源时 IP 已在缓存。

```html
<link rel="dns-prefetch" href="https://www.example.com" />
```

## 工程化做法

外链散落在打包后的 `js/css` 里 → **build 后**用 Node 扫 `dist`，正则提域名，`Set` 去重，插入各 HTML 的 `<head>`。

课程脚本：`10.DNS解析与优化/DNS解析和优化/scripts/dns-prefetch.js`  
`"build": "vite build && node ./scripts/dns-prefetch.js"`

## 演示

[10-dns-demo.html](/求职难点攻关/demos/10-dns-demo.html) — head 里预解析三个域名，body 里再用到。Network 勾选 Disable cache 对比 DNS 列。

## 和 preconnect / preload

| | 作用 |
|--|------|
| dns-prefetch | 只提前 DNS |
| preconnect | DNS + TCP + TLS，更重 |
| preload | 提前下载指定资源，要 `as` |

## 面试要点

- 从 Network 发现多域名 DNS 慢 → prefetch → build 后自动注入。  
- 效果：首次解析 200ms 级，缓存后接近 0。  
- 钩子：CDN 与 DNS、Webpack 缓存与分包。

## 课程代码

`10.DNS解析与优化/DNS解析和优化/` → `npm run build` 看 `dist/index.html` 是否自动插入 link。
