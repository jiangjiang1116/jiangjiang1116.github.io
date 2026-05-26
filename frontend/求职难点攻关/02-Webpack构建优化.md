# 02 · Webpack 构建优化

## 一句话

项目变大后 **`npm run build` 慢、产物大、首屏 JS 多** → 从 **缓存、并行、缩小搜索范围、拆包、分析体积** 几方面优化。

## 和你日常工作的关系

两年经验多半用过 Webpack 或 Vite。面试/项目常问：**为什么 build 慢？怎么让二次构建快？怎么拆 vendor？**

## 常见手段（理解即可）

| 方向 | 做法 |
|------|------|
| 持久缓存 | `cache: { type: 'filesystem' }` |
| 缩小解析 | `resolve.modules`、`alias`、少写相对路径地狱 |
| 并行 | `thread-loader`、`TerserPlugin` 多进程 |
| 拆包 | `splitChunks`：vendor / 公共 / 异步路由 |
| 分析 | `webpack-bundle-analyzer` 看谁胖 |
| 外部化 | `externals` 把 vue 等走 CDN（看场景） |
| DLL | 老方案，预编译第三方（现在 filesystem cache 更常用） |

## 和 Vite 的对比（面试）

- **Webpack**：打包时打包，配置灵活，大项目成熟。  
- **Vite**：开发用 ESM 原生模块快，生产仍 Rollup 打包。

## 演示

本章无独立 HTML 演示。建议在**自己项目**里加 analyzer 跑一遍 `build --report`。

## 面试怎么说

- 先 **分析**（体积、构建 profile）再优化，别空喊「用了 cache」。  
- 举 1～2 个具体：例如把 `node_modules` 拆成单独 chunk + contenthash 利用 HTTP 缓存。

## 课程资料

`02. Webpack构建优化/课件资料/02-技术讲解.md`
