# 13 · Vite 相关优化

## 一句话

Vite 开发快，但 **生产构建、依赖预构建、大项目冷启动** 仍可能要调：**optimizeDeps、分包、插件、缓存**。

## 和你日常工作的关系

日常 `npm run dev` 已经很快。上线前关心：**build 体积、首屏 chunk、是否重复打 vue**。

## 常见优化点

| 方向 | 说明 |
|------|------|
| `optimizeDeps.include` | 把 CJS 依赖强制预构建，避免首次打开慢 |
| `build.rollupOptions.output.manualChunks` | 拆 vendor |
| `build.chunkSizeWarningLimit` | 调警告阈值 |
| 动态 import | 路由懒加载 |
| SSR / SSR 无关 | 按项目 |
| 插件 | 压缩、CDN、可视化分析 `rollup-plugin-visualizer` |

## 和 02 Webpack 章

Webpack 偏「传统打包全链路」；本章偏 **Vite 特有问题**（esbuild 预构建、依赖发现）。

## 演示

无独立 demo。在自己 Vite 项目加 `visualizer` 看产物。

## 面试

- 说清 dev 为什么快：浏览器原生 ESM + esbuild 预打包 deps。  
- 生产仍是 Rollup 打包，优化思路和 Webpack 类似（拆包、缓存、tree-shaking）。

## 课程资料

`13.Vite相关优化/13-技术讲解.md`
