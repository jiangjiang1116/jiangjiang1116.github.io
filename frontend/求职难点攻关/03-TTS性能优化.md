# 03 · TTS / 长任务与请求取消

## 一句话

语音合成、大文件上传等**耗时长**；用户离开或重复操作时要 **AbortController 取消请求**，避免浪费和状态错乱。

## 和你日常工作的关系

不只 TTS：任何 `fetch`、上传、轮询，在组件卸载、路由离开、用户点「取消」时都应 **abort**。

## 核心 API

```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
// 取消：
controller.abort(); // 会抛 AbortError
```

在 React/Vue 里：`onUnmounted` / `useEffect` cleanup 里 `controller.abort()`。

## 演示

[03-abort-fetch.html](/求职难点攻关/demos/03-abort-fetch.html) — 发起请求后点「取消」，输出 `AbortError`。

## 和 TTS 的关系

课件场景：Web Speech API 或后端 TTS 流式返回；切换页面要继续/取消上一次会话。思路同是 **可取消的异步任务**。

## 面试要点

- 为什么取消：防内存泄漏、防旧响应覆盖新状态。  
- `AbortSignal` 可传给 fetch、部分现代 API。  
- 配合防抖/节流处理重复点击。

## 课程代码

`03. TTS性能优化/课堂代码/02.请求取消/` — 直接打开 `index.html` 或本地起静态服务。
