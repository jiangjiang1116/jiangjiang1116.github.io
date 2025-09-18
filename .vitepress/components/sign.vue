<template>
  <div ref="markRef" class="custom-mark">
    <slot></slot>
  </div>
</template>

<script>
import { annotate } from "rough-notation";

export default {
  name: "sign",
  props: {
    type: {
      type: String,
      default: "circle", //underline box circle highlight strike-through crossed-off bracket 
    },
    color: {
      type: String,
      default: "#ffff00", 
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    padding: {
      type: Number,
      default: 5,
    },
    strokeWidth: {
      type: Number,
      default: 1,
    },
    animate: {
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      default: 800,
    },
    iterations: {
      type: Number,
      default: 1,
    },
    multiline: {
      type: Boolean,
      default: true,
    },
    brackets: {
      type: Array,
      default: ["left", "right"],
    },
  },
  mounted() {
    this.addAnnotation();
  },
  methods: {
    addAnnotation() {
      const element = this.$refs.markRef;
      if (element) {
        this.annotation = annotate(element, {
          type: this.type, // 使用传入的 type 属性
          color: this.color, // 固定为黄色
          strokeWidth: this.strokeWidth, // 固定线条粗细
          padding: this.padding, // 固定内边距
          animate: this.animate, // 不启用动画
          iterations: this.iterations,
          animationDuration: this.animationDuration,
        });

        this.annotation.show(); // 显示标注效果
      }
    },
  },
  beforeUnmount() {
    // 在组件销毁前移除标注
    if (this.annotation) {
      this.annotation.remove();
    }
  },
};
</script>

<style scoped>
.custom-mark {
  display: inline; /* 保持行内显示 */
}
</style>