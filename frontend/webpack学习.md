---
title: webpack学习
date: 2025-04-08 10:29:31
tags: webpack
categories: 前端
---

# vue-cli 与 webpack

## 基础概念与配置方式

- `vue-cli`是基于 `webpack`的，同样支持 `plugins/module/resolve` 等配置项
- 在 vue 里除了自带的 `vue.config.j`s 里设置，可以安装 webpack，在 `webpack.config.js`里配置
- vue.config.js 与 webpack.config.js 冲突，合并时优先会选择 vue.config.js 的，Vue CLI 内部最终会调用 [webpack-merge](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fsurvivejs%2Fwebpack-merge) 将 `configureWebpack` 值与其它上下文配置合并，生成最终的 Webpack 配置信息。
- Vue CLI 底层依赖于 Webpack 实现编译打包等工程化能力，开发者可通过 `configureWebpack` 与 `chainWebpack` 配置项修改 Webpack 配置信息。
  可使用 `inspect` 命令**生成完整的 Webpack 配置信息**：

  ```
  vue inspect > output.js
  ```

  以 `configureWebpack` 为例，使用时需要在 `vue.config.js` 文件中写入配置：

  ```js
  // vue.config.js
  module.exports = {
    configureWebpack: {
      plugins: [new MyAwesomeWebpackPlugin()],
    },
  };
  ```

  **语法区别**： 区别 `chainWebpack` 的用法与 `configureWebpack` 一致，区别仅在于此处支持 [webpack-chain](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fneutrinojs%2Fwebpack-chain) 语法 —— 即以函数方式链式修改 Webpack 配置：

  ```js
  // vue.config.js
  module.exports = {
    chainWebpack: (config) => {
      config.module
        .rule("vue")
        .use("vue-loader")
        .tap((options) => {
          // modify the options...
          return options;
        });
    },
  };
  ```
