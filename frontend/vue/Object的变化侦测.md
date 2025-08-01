---
title: Object的变化侦测
date: 2025-03-30 15:13:01
tags:
categories:
---

## 前言

Object 和 Array 的变化 侦测采用不同的处理方式。

## 什么是变化侦测

Vue.js 会自动通过状态生成 DOM，并将其输出到页面上显示出来，这个过程叫渲染。Vue.js 的渲染过程是声明式的，我们通过模板来描述状态与 DOM 之间的映射关系。通常，在运行时应用内部的状态会不断发生变化，此时需要不停地重新渲染这时如何确定状态中发生了什么变化？

::: details 变化侦测就是用来解决这个问题的，它分为两种类型：一种是“推”（push），另一种是“拉”（pull）。Angular 和 React 的变化侦测属于哪种？用什么实现？
Angular 和 React 中的变化侦测都属于“拉”，这就是说当状态发生变化时，它不知道哪个状态变了，只知道状态有可能变了，然后会发送一个信号告诉框架，框架内部收到信号后，会进行一个暴力比对来找出哪些 DOM 节点需要重新渲染。这在 Angular 中是脏检查的流程，在 React 中使用的是虚拟 DOM。
:::

::: details 那么 vue 的变化侦测是怎么样的呢？
所谓更细粒度的更新，就是说：假如有一个状态绑定着好多个依赖，每个依赖表示一个具体的 DOM 节点，那么当这个状态发生变化时，向这个状态的所有依赖发送通知，让它们进行 DOM 更新操作。相比较而言，“拉”的粒度是最粗的。
:::
::: details vue 是'推'，粒度最细，代价是什么？

<p>但是它也有一定的代价，因为粒度越细，每个状态所绑定的依赖就越多，依赖追踪在内存上的开销就会越大。因此，从Vue.js2.0开始，它引入了虚拟DOM，将粒度调整为中等粒度，即一个状态所绑定的依赖不再是具体的DOM节点，而是一个组件。这样状态变化后，会通知到组件，组件内部再使用虚拟DOM进行比对。这可以大大降低依赖数量，从而降低依赖追踪所消耗的内存。</p>
<p>Vue.js之所以能随意调整粒度，本质上还要归功于变化侦测。因为“推”类型的变化侦测可以随意调整粒度。</p>
:::

## 如何追踪变化

::: details 在 js 里怎么侦测一个对象的变化？ES6 有什么新的方法？
Object.defineProperty 和 ES6 的 Proxy。
:::

### 手写 Object.defineProperty（手写双向数据绑定）

```js
function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return val;
    },
    set: function (newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
    },
  });
}
```

::: details 为什么要设置 enumerable: true,configurable: true？

<p> Object.defineProperty(obj, prop, descriptor)</p>
<p> Object.defineProperty() 允许精确地添加或修改对象上的属性。通过赋值添加的普通属性会在枚举属性时（例如 for...in、Object.keys() 等）出现，它们的值可以被更改，也可以被删除。此方法允许更改这些额外细节，以使其不同于默认值。默认情况下，使用 Object.defineProperty() 添加的属性是不可写、不可枚举和不可配置的。此外，Object.defineProperty() 使用 [[DefineOwnProperty]] 内部方法，而不是 [[Set]]，因此即使属性已经存在，它也不会调用 setter。</p>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#%E6%8F%8F%E8%BF%B0">MDN详细资料</a>
:::

## Object.defineProperty 如何收集依赖

在 getter 中收集依赖，在 setter 中触发依赖。

## Object.defineProperty 依赖收集在哪里

## 依赖是谁

watcher！

## 什么是 watcher

太抽象了这块
