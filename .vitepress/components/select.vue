<script>
import { theme, message } from 'ant-design-vue';
import { useData } from 'vitepress';
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'SpecialSelect', // 定义组件名称
  setup() {
    const { isDark } = useData();
    const selectedValue = ref(null); // 用于绑定 v-model
    const handleSelectChange = (value) => {
      const selectedLabel = value.label; // 提取 label
      const selectedValue = value.value; // 提取 value

      message.info(`${selectedLabel[0].children}+${selectedValue}`); // 或 message.info(selectedValue);
      console.log('Selected value changed:', selectedLabel, selectedValue);

    }
    return {
      isDark,
      selectedValue,
      theme,
      handleSelectChange
    };
  }
});
</script>

<template>
  <a-config-provider :theme="{
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }">
    <a-select v-model:value="selectedValue" placeholder="同时获取select的value与label" :label-in-value="true" @change="handleSelectChange">
      <a-select-option key="1" value="option1">选项1</a-select-option>
      <a-select-option key="2" value="option2">选项2</a-select-option>
      <a-select-option key="3" value="option3">选项3</a-select-option>
    </a-select>
  </a-config-provider>
</template>

<style scoped>
/* 如果需要，可以在这里添加样式 */
</style>
