<template>
  <div class="gallery">
    <div v-for="(column, index) in columns" :key="index" class="gallery-column">
      <div v-for="(image, imgIndex) in column.images" :key="imgIndex" class="gallery-item">
        <img :src="image" alt="Gallery Image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaterfallGallery",
  props: {
    images: {
      type: Array,
      required: true,
    },
    columnCount: {
      type: Number,
      default: 3, // 默认显示 3 列
    },
  },
  data() {
    return {
      columns: [],
    };
  },
  watch: {
    images: {
      handler() {
        this.layoutImages();
      },
      immediate: true,
    },
  },
  methods: {
    layoutImages() {
      // 初始化列
      this.columns = Array.from({ length: this.columnCount }, () => ({ height: 0, images: [] }));

      // 遍历图片，分配到高度最小的列
      this.images.forEach((image) => {
        let minColumnIndex = 0;
        let minHeight = this.columns[0].height;

        this.columns.forEach((column, index) => {
          if (column.height < minHeight) {
            minHeight = column.height;
            minColumnIndex = index;
          }
        });

        this.columns[minColumnIndex].images.push(image);
        this.columns[minColumnIndex].height += this.getImageHeight(image);
      });

      // 调整列内图片间隔，使得每列高度尽量一致
      this.adjustColumnGaps();
    },
    getImageHeight(image) {
      // 这里可以根据图片的实际高度来计算，这里假设每张图片高度为 300px
      // 你可以根据实际情况调整这个值，或者通过图片的自然尺寸来计算
      return 300;
    },
    adjustColumnGaps() {
      // 计算所有列的平均高度
      const totalHeight = this.columns.reduce((acc, column) => acc + column.height, 0);
      const averageHeight = totalHeight / this.columnCount;

      // 调整每列的高度，使得每列的高度尽量接近平均高度
      this.columns.forEach((column) => {
        const gap = averageHeight - column.height;
        const imageCount = column.images.length;
        if (imageCount > 1) {
          const additionalGap = gap / (imageCount - 1);
          column.gap = additionalGap > 0 ? additionalGap : 0;
        } else {
          column.gap = 0;
        }
      });
    },
  },
};
</script>

<style scoped>
.gallery {
  display: flex;
  gap: 16px; /* 列间距 */
}

.gallery-column {
  display: flex;
  flex-direction: column;
  gap: v-bind('columns[index].gap + "px"'); /* 动态设置列内图片间隔 */
}

.gallery-item img {
  width: 100%; /* 图片宽度自适应 */
  height: auto; /* 保持图片比例 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
</style>