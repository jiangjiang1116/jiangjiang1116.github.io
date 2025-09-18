# 去除INFO标题的方法
INFO是vitepress默认内置的一个markdown扩展，[官方文档](https://vitepress.dev/zh/guide/markdown)提供了<sign>修改</sign>的方法

![](https://jiangjiang4869.oss-cn-beijing.aliyuncs.com/20250918110854.png)

以INFO为例，将infoLabel的值设置为空字符串/null/undefined并不会达到<sign>隐藏标题</sign>的效果，我尝试使用换行符，成功消除

```js
container: {
      tipLabel: '\n',
      warningLabel: '\n',
      dangerLabel: '\n',
      infoLabel: '\n',
      detailsLabel: '\n'
    }
```
::: info INFO
带标题的效果展示
:::

::: info
不带标题的效果展示
:::

