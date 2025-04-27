---
title: a标签
---

## 链接跳转

```html
<a href="/" target="_blank">首页</a>
```
## target
```
_blank：
含义：在新的浏览器窗口或标签页中打开链接。
用途：通常用于确保用户不会离开当前页面，而是打开一个新的页面。
_self：
含义：在当前窗口或标签页中打开链接（默认行为）。
用途：显式指定链接在当前页面中打开，通常用于覆盖某些默认行为或样式。
_parent：
含义：在父框架中打开链接。
用途：如果当前页面是嵌套在框架（<frame> 或 <iframe>）中的，_parent 会将链接加载到父框架中。
_top：
含义：在最顶层的窗口中打开链接。
用途：如果当前页面是嵌套在多层框架中的，_top 会将链接加载到最外层的窗口中，覆盖所有框架。
```

## rel与跳转

rel="nofollow",防止权重被外泄，但是即使设置也是有一定权重分配

### 开启新窗口页面自动刷新
场景：登录时候弹出新页面，登录后需要原来的主登录页面刷新一下达到登录状态
麻烦做法：visibilitychange/postMessage
HTML 实现：
```HTML
<a href="/frontend/button.html" target="_blank" rel="opener">跳转</a>
```
新页面里设置js,判断旧页面opener存在不存在，存在就刷新，也算一种页面通信方法
```js
window.opener.location.reload()
```

隐患：window权限太高，21年后当target="_blank"，默认rel="noopener"

### 返回主页

在某列表页面，点击任意列表会进入详情页，然后希望再次返回（通过页面内链接，而非浏览器的“后退”按钮）到列表页的时候，页面依然定位在之前的滚动位置，但如果是从其他页面进入的，则滚动置顶。

```html
// 在详情页面
<a href="/list.html?from=detail"/>
// 其他页面
<a href="/list.html/>
```
改为：
```js
if(/detail\.html/.test(document.referer)){
    // 滚动位置还原
}
```

## 消除防盗链
rel="noreferrer"
![经常遇到的场景](/images/markdown/noreferrer.jpg)

## relList

rel属性与class属性写法类似，添加与删除也类似
```
link.classlist.remove('active')
link.relList.remove('noreferrer')
```

## 预览

```js
// 与_blank不同，preview控制了只能出一个窗口
target="_preview"
```

## 下载

<a href="/images/markdown/noreferrer.jpg" download="不吃香菜">下载</a>
```html
<a href="/images/markdown/noreferrer.jpg" download>下载</a>
<a href="/images/markdown/noreferrer.jpg" download="不吃香菜">下载</a>
```

跨域需要处理

## ping


