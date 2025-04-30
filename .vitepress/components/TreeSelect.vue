<template>
  <a-tree-select style="width: 100%" showSearch tree-node-filter-prop="label" v-model:value="selectValue"
    :tree-data="sysIndList" allowClear :treeExpandedKeys="treeExpandedKeys" @treeExpand="onTreeExpand"
    placeholder="点击父节点文字展开子节点">
    <template #title="{ title, key }">
      <span @click.stop="toggleExpand(key)">{{ title }}</span>
    </template>
  </a-tree-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  data() {
    return {
      selectValue: null, // 当前选中的值
      treeExpandedKeys: [], // 当前展开的节点 key 数组
      sysIndList: [
        {
          title: 'Node 1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Node 1-1',
              value: '0-0-0',
              key: '0-0-0',
              children: [
                { title: 'Node 1-1-1', value: '0-0-0-0', key: '0-0-0-0' },
                { title: 'Node 1-1-2', value: '0-0-0-1', key: '0-0-0-1' },
              ],
            },
            {
              title: 'Node 1-2',
              value: '0-0-1',
              key: '0-0-1',
              children: [
                { title: 'Node 1-2-1', value: '0-0-1-0', key: '0-0-1-0' },
                { title: 'Node 1-2-2', value: '0-0-1-1', key: '0-0-1-1' },
              ],
            },
          ],
        },
        {
          title: 'Node 2',
          value: '0-1',
          key: '0-1',
          children: [
            { title: 'Node 2-1', value: '0-1-0', key: '0-1-0' },
            { title: 'Node 2-2', value: '0-1-1', key: '0-1-1' },
          ],
        },
      ],
    };
  },
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
};
</script>