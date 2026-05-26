# 06 · Vite 插件

## 一句话

Vite 用 **Rollup 插件体系**扩展构建：自动生成路由 meta、注入脚本、压缩、分析等——写插件 = 在 **构建生命周期钩子里改模块/产物**。

## 和你日常工作的关系

用过 `@vitejs/plugin-vue` 就算用过插件。进阶：公司要「根据 `*.meta.js` 自动生成路由配置」这类需求，就要**自己写插件**。

## 插件基本形状

```js
export default function myPlugin() {
  return {
    name: 'my-plugin',
    // 开发：configureServer、transform
    // 构建：buildStart、transform、generateBundle、closeBundle
    transform(code, id) { /* 改源码 */ },
  };
}
```

## 课程场景（概括）

- 读取 `views` 下 `*.meta.js`  
- 汇总成路由/菜单配置  
- 在 `transform` 或虚拟模块里注入  

## 演示

需本地跑：`06. Vite插件/课堂代码/vite-plugin/` → `npm i && npm run dev`

## 和 Webpack loader 的区别

| | Vite 插件 | Webpack loader |
|--|-----------|----------------|
| 粒度 | 整模块 / 构建阶段 | 单文件转换 |
| 开发 | 也用 esbuild 预构建 | 全走 loader 链 |

## 面试

- 为什么用插件：重复劳动自动化、统一团队规范。  
- 说一个钩子：`transform` 改代码、`generateBundle` 改输出文件。

## 课程资料

`06. Vite插件/课件资料/06-技术讲解.md`
