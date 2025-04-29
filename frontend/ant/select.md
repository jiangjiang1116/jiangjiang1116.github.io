---
title: select
date: 2024-10-24 14:26:05
---

<script setup>
import SpecialSelect from "../../.vitepress/components/select.vue"
import TreeSelect from "../../.vitepress/components/TreeSelect.vue"
</script>

## 同时打印标题和值

:label-in-value="true"
<SpecialSelect/>

## treeSelect 点击文字展开子节点

效果：
<TreeSelect />

```vue
<template>
  <a-tree-select
    style="width: 100%"
    showSearch
    tree-node-filter-prop="label"
    v-model:value="selectValue"
    :tree-data="sysIndList"
    allowClear
    :treeExpandedKeys="treeExpandedKeys"
    @treeExpand="onTreeExpand"
  >
    <template #title="{ title, key }">
      <span @click.stop="toggleExpand(key)">{{ title }}</span>
    </template>
  </a-tree-select>
</template>
```

```js
 methods: {
      toggleExpand(key) {
        // 点击节点标题时，切换展开状态
        const idx = this.treeExpandedKeys.findIndex((item) => item === key);
        if (idx === -1) {
          this.treeExpandedKeys.push(key); // 如果未展开，则添加到展开数组
        } else {
          this.treeExpandedKeys.splice(idx, 1); // 如果已展开，则移除
        }
      },
      onTreeExpand(expandedKeys) {
        // 同步 treeExpandedKeys 的状态
        this.treeExpandedKeys = expandedKeys;
      },
    },
```
