# 16 · defer 分帧渲染与白屏优化

## 一句话

首屏要挂载的 DOM/组件太多，**主线程一次干完会卡**；用 **`requestAnimationFrame` 每帧只挂载一部分**（Vue 里用 `useDefer`）。

## 和你日常工作的关系

写后台列表、大屏、表单页时，若 `v-for` 几百个复杂子组件同时渲染，用户会感觉「白屏很久」。这不一定是接口慢，而是 **渲染把主线程占满了**。

## 原理（2 年经验版）

- 浏览器约 **60fps**，一帧 ~16ms。
- **RAF** 在下一帧绘制前执行回调。
- `useDefer`：每帧 `count++`，`defer(n)` 为真时才 `v-if` 挂载第 n 块 → 分帧放开。

## 演示（必玩）

| 页面 | 说明 |
|------|------|
| [16-defer-render-1](/求职难点攻关/demos/16-defer-render-1.html) | `?mode=sync` 卡死 vs `?mode=raf` 渐显 |
| [16-defer-render-2](/求职难点攻关/demos/16-defer-render-2.html) | `requestIdleCallback` 空闲时分片 |

打开 Performance 录制刷新，对比 **Long Task**。

## 和 DNS、虚拟列表的区别

| 章节 | 优化的是 |
|------|----------|
| 本章 | **渲染 / 主线程** |
| 10 DNS | 网络域名解析 |
| 08 虚拟列表 | **DOM 数量**（只画可见区） |

## 面试 STAR

- **S**：首屏 DOM 多，FCP/LCP 差。  
- **T**：不能上大改、SSR 预算不够。  
- **A**：RAF + `useDefer` 分帧挂载。  
- **R**：长任务减少、指标改善（用真实数据）。

## 易混

- 本章 **useDefer** ≠ HTML `<script defer>` → 见 [defer与async](/frontend/HTML/defer与async)

## 课程代码

`16.defer优化白屏时间/使用defer优化白屏时间/` → `npm i && npm run dev`
