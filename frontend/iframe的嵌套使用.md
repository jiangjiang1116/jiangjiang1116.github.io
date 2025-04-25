---
title: iframe的嵌套使用
date: 2024-10-11 13:42:48
tags: 量子前端
categories: 量子前端
---
什么是iframe，火爆的微前端解决方案方案，教你快速看懂使用
===============================

非原创 作者:赵要上天 公号:量子前端 发布时间:2024-10-06 16:37 发表于江苏

原文地址：[什么是iframe，火爆的微前端解决方案方案，教你快速看懂使用](https://mp.weixin.qq.com/s/Au5g3YOrpPDk0oXnGJAfWg)

iframe（Inline Frame） 是一种 HTML 标签，它允许在一个网页内部嵌套加载另一个网页，从而实现在主页面中展示外部网页内容的功能。iframe 创建了一个独立的浏览上下文，拥有自己的文档对象模型（DOM）和执行环境，这意味着它不会与主页面共享JavaScript变量或CSS样式，提供了较好的隔离性。一、简单使用案列，网站中嵌套 Chatgpt

#### 一、简单使用案列，网站中嵌套 Chatgpt

![](images/cat.svg)

###### 1.它允许你在当前页面中嵌入另一个HTML文档。下面是如何在Vue中使用的基本步骤

基本用法
直接在模板中使用 标签：在Vue组件的模板部分，你可以直接插入标签，并设置src属性指向你想要嵌入的页面URL。html\`\`\`

2.设置 src 属性：src属性应该包含你希望加载的外部网页的URL。你可以直接硬编码这个URL，或者像上面的例子那样，使用数据属性动态绑定。3.CSS样式：通常，你需要为设置宽度和高度，以确保它能够正确填充其父容器。你可以使用CSS来设置这些样式。

```
   .app-container {
     width: 100%;
     height: 100%; /* 或者具体的像素值 */
   }    iframe {
     width: 100%;
     height: 100%;
   }
```

3.CSS样式：

通常，你需要为设置宽度和高度，以确保它能够正确填充其父容器。你可以使用CSS来设置这些样式。

```
   .app-container {
     width: 100%;
     height: 100%; /* 或者具体的像素值 */
   }    iframe {
     width: 100%;
     height: 100%;
   }
```

##### 完整vue代码如下

```
<template>
  <div class="app-container">
    <iframe
        src="https://app.nextchat.dev/"
        frameborder="0"
    ></iframe>
  </div>
</template>
<style lang="scss" scoped>
/** 关闭tag标签  */
.app-container {
  /* 50px = navbar = 50px */
  height: calc(100vh - 50px);
} /** 开启tag标签  */
.hasTagsView {
  .app-container {
    /* 84px = navbar + tags-view = 50px + 34px */
    height: calc(100vh - 84px);
  }
} iframe {
  width: 100%;
  height: 100%;
}
</style>
<script setup lang="ts">
</script>
```

注意事项 1.同源策略：由于浏览器的同源策略限制，只有当嵌入的页面与当前页面具有相同的协议、域名和端口时，才能访问到内的DOM。2.CORS：如果需要与内部的页面进行交互（例如，发送请求或修改内容），则需要确保3.目标页面支持跨源资源共享(CORS)。4.安全性：确保你嵌入的是可信的站点，因为恶意内容可能会危害到你的用户或网站。5.性能：嵌入大型或复杂的页面可能会影响你的网站性能，因此要谨慎选择嵌入的内容。

#### 二、轻松找到界面嵌套网址

###### 1.打开F12找到iframe标签中的src路径

![](img/1.other)

###### 2.右键点击跳转找到嵌套内容界面，微前端内跳转子界面同理

![](img/2.other)

#### 三、接下来我们看以下iframe常用的属性

###### 1.src：这是最基本的属性，用于指定要加载的文档的URL。

```
ini
 代码解读
复制代码
 <iframe src="https://app.nextchat.dev/"></iframe>
```

###### 2.width 和 height：这两个属性用于定义的宽度和高度，可以是像素值或百分比。

```
  <iframe src="https://app.nextchat.dev/"width="800" height="600"></iframe>
```

###### 3.frameborder：此属性用于设置周围的边框。默认情况下，边框是存在的，但是可以将其设置为0来移除边框。

```
  <iframe src="https://app.nextchat.dev/"  frameborder="0"></iframe>
```

###### 4.name：用于给命名，可以用于表单提交的目标。

```
   <iframe src="https://app.nextchat.dev/" name="myFrame"></iframe>  
```

###### 5.allowtransparency：布尔属性，用于指定背景是否透明。

```
   <iframe src="https://app.nextchat.dev/" allowtransparency="true"></iframe>  
```

###### 6.scrolling：用于控制内部页面是否显示滚动条。可以设置为auto（自动）、yes（总是显示滚动条）或no（不显示滚动条）。

```
   <iframe  src="https://app.nextchat.dev/" allowtransparency="true"></iframe>         
```

###### 7.sandbox：增强的安全性选项，可以限制的内容，如不允许形成弹窗、不允许提交表单等。

```
 <iframe src="https://app.nextchat.dev/" sandbox="allow-scripts allow-same-origin"></iframe>   
```

###### 8、loading：指示浏览器何时开始加载的内容。可以是eager（立即加载）或lazy（延迟加载）

```
 <iframe src="https://app.nextchat.dev/" loading="lazy"></iframe>
```

###### 9.referrerpolicy：定义了当请求的src时，应该发送什么样的referrer头。

```
   <iframe src="https://app.nextchat.dev/" referrerpolicy="no-referrer"></iframe>    
```

###### 10.allow：用于指定内容可以使用的特定API，例如allow="camera; microphone"。

```
<iframe  src="https://app.nextchat.dev/" allow="camera; microphone"></iframe>
```

#### 四、使用实现微前端解决方案

微前端架构允许将一个大的应用程序拆分成多个小的子应用，每个子应用可以独立开发、部署和维护。使用作为微前端解决方案是一种简单有效的方法，尤其是在需要隔离子应用的情况下。下面详细介绍如何使用实现微前端解决方案。

###### 1\. 还不清除微前端的LOOK基本概念主应用：负责管理和渲染各个子应用。

###### 子应用：独立的小应用，可以是不同的技术栈或框架。

###### 通信机制：主应用和子应用之间需要一种通信机制来传递消息。

###### 2\. 接下来我们LOOK实现步骤

步骤 1: 创建主应用

主应用负责加载和渲染各个子应用。首先创建一个主应用，开发中一般将系统管理平台设置为主。

```
<template>
  <div class="app-container">
    <h1>主应用</h1>
    <div v-for="(subApp, index) in subApps" :key="index" class="sub-app-container">
      <iframe
        :src="subApp.src"
        frameborder="0"
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template> <script setup lang="ts">
import { ref } from 'vue'; // 子应用列表
const subApps = ref([
  { src: 'https://subapp1.example.com' },
  { src: 'https://subapp2.example.com' }
]);</script> <style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
} .sub-app-container {
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
} iframe {
  width: 100%;
  height: 100%;
}</style>
```

步骤 2: 创建两个子应用

子应用可以是任何技术栈的应用，例如React、Vue或Angular。每个子应用需要能够在中正常运行。

子应用代码示例
假设你有两个子应用：subapp1和subapp2。
子应用1 (subapp1)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>子应用1</title>
</head>
<body>
  <div id="root"></div>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const rootDiv = document.getElementById('root');
      const app = document.createElement('div');
      app.innerHTML = '<h1>子应用1</h1>';
      rootDiv.appendChild(app);       // 添加监听器以接收主应用的消息
      window.addEventListener('message', function(event) {
        if (event.origin !== 'https://mainapp.example.com') return;
        console.log('接收到的消息:', event.data);
      });       // 发送消息给主应用
      window.parent.postMessage({ type: 'hello', data: '子应用1' }, 'https://mainapp.example.com');
    });</script>
</body>
</html>
```

子应用2 (subapp2)

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>子应用2</title>
</head>
<body>
  <div id="root"></div>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const rootDiv = document.getElementById('root');
      const app = document.createElement('div');
      app.innerHTML = '<h1>子应用2</h1>';
      rootDiv.appendChild(app);       // 添加监听器以接收主应用的消息
      window.addEventListener('message', function(event) {
        if (event.origin !== 'https://mainapp.example.com') return;
        console.log('接收到的消息:', event.data);
      });       // 发送消息给主应用
      window.parent.postMessage({ type: 'hello', data: '子应用2' }, 'https://mainapp.example.com');
    });</script>
</body>
</html>
```

步骤 3: 实现通信机制

主应用和子应用之间需要一种通信机制来传递消息。通常使用window.postMessage来实现跨域通信。

主应用通信代码

```
import { onMounted } from 'vue'; onMounted(() => {
  // 监听子应用发来的消息
  window.addEventListener('message', function(event) {
    if (event.origin !== 'https://subapp1.example.com' && event.origin !== 'https://subapp2.example.com') return;
    console.log('接收到的消息:', event.data);
  });   // 向子应用发送消息
  setTimeout(() => {
    window.frames[0].contentWindow.postMessage({ type: 'ping', data: '主应用' }, 'https://subapp1.example.com');
    window.frames[1].contentWindow.postMessage({ type: 'ping', data: '主应用' }, 'https://subapp2.example.com');
  }, 3000);
});
```

使用实现微前端解决方案是一种简单有效的方法，特别适用于需要隔离子应用的情况。通过，你可以轻松地将不同的子应用嵌入到主应用中，并通过window.postMessage实现跨域通信。这种方法不仅提高了开发效率，还增强了应用的可维护性和扩展性。





往期推荐

[

深入探讨 React 中的 Context API：状态管理的灵活解决方案



](https://mp.weixin.qq.com/s?__biz=Mzg4NTk4MjI3NA==&mid=2247491597&idx=1&sn=65956f9e8af6d50db257e7132647a778&chksm=cfa23520f8d5bc3699c584ae5ae6315944017206d037f75682ae5d630e3157fae6c07aee5f2f&scene=21#wechat_redirect)

[

Web性能优化之回流重绘 - CSS3硬件加速篇



](https://mp.weixin.qq.com/s?__biz=Mzg4NTk4MjI3NA==&mid=2247491587&idx=1&sn=3a27027cd4f6963f5f647ec60491b17d&chksm=cfa2352ef8d5bc383c220cba0a24ee7664c27e2343cf5032b327125b4712174e46788ea3feab&scene=21#wechat_redirect)

[

极速 JavaScript 打包器：esbuild



](https://mp.weixin.qq.com/s?__biz=Mzg4NTk4MjI3NA==&mid=2247491573&idx=1&sn=3a8a698e8c9a8e04a3a04544d3435e82&chksm=cfa1cad8f8d643ced9c32562d9e8608f0a6fabd4134da2c44bc790af7228321bc1a380d9dca5&scene=21#wechat_redirect)