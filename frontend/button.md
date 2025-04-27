---
title: 使用自定义按钮组件
---

# 使用自定义按钮组件

以下是如何在 VitePress 中使用自定义按钮组件的示例：

<script setup>
import { theme } from 'ant-design-vue';
import { useData } from 'vitepress'
const { isDark } = useData()
</script>
<br/>
<a-config-provider
    :theme="{
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
>
</a-config-provider>
<a-card title="内容摘要" :bordered="true" :hoverable="true">
    <p>这个卡片就是使用 Ant Card 实现的内容。(适配暗黑模式)</p>
    <p>是否暗黑模式：{{isDark}}</p>
</a-card>

```vue
// 开头包裹
<a-config-provider
  :theme="{
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }"
>
</a-config-provider>
<a-card title="内容摘要" :bordered="true" :hoverable="true">
    <p>这个卡片就是使用 Ant Card 实现的内容。(适配暗黑模式)</p>
    <p>是否暗黑模式：{{isDark}}</p>
</a-card>
```
