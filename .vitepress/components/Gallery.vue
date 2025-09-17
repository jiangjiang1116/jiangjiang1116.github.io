<!-- todo -->
<template>
  <div class="gallery">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="gallery-item"
      :class="getItemClass(images.length, index)"
    >
      <img :src="image" alt="Gallery Image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  methods: {
    getItemClass(totalImages, index) {
      if (totalImages === 1) {
        return 'one-image';
      } else if (totalImages === 2) {
        return 'two-images';
      } else if (totalImages === 3) {
        return 'three-images';
      } else if (totalImages === 4) {
        return 'four-images';
      } else if (totalImages === 5) {
        return 'five-images';
      } else if (totalImages === 6) {
        return 'six-images';
      } else if (totalImages === 7) {
        return 'seven-images';
      } else if (totalImages === 8) {
        return 'eight-images';
      } else if (totalImages === 9) {
        return 'nine-images';
      } else if (totalImages === 10) {
        return 'ten-images';
      } else {
        return '';
      }
    }
  }
};
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.gallery-item img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: block;
  transition: transform 0.2s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

/* 1张图片 */
.one-image {
  flex: 1 1 100%;
  max-width: 100%;
}

/* 2张图片 */
.two-images {
  flex: 1 1 48%;
  max-width: 48%;
}

/* 3张图片 */
.three-images {
  flex: 1 1 31%;
  width:auto;
  height:auto;
  object-fit: contain;
}

/* 4张图片 */
.four-images {
  flex: 1 1 48%;
  max-width: 48%;
}

@media (min-width: 768px) {
  .four-images:nth-child(2n+1) {
    flex: 1 1 100%;
    max-width: 100%;
  }
}

/* 5张图片 */
.five-images {
  flex: 1 1 31%;
  max-width: 31%;
}

@media (min-width: 768px) {
  .five-images:nth-child(3n+1) {
    flex: 1 1 68%;
    max-width: 68%;
  }
}

/* 6张图片 */
.six-images {
  flex: 1 1 31%;
  max-width: 31%;
}

@media (min-width: 768px) {
  .six-images:nth-child(3n+1) {
    flex: 1 1 68%;
    max-width: 68%;
  }
}

/* 7张图片 */
.seven-images {
  flex: 1 1 31%;
  max-width: 31%;
}

@media (min-width: 768px) {
  .seven-images:nth-child(3n+1) {
    flex: 1 1 68%;
    max-width: 68%;
  }
}

/* 8张图片 */
.eight-images {
  flex: 1 1 23%;
  max-width: 23%;
}

@media (min-width: 768px) {
  .eight-images:nth-child(4n+1) {
    flex: 1 1 48%;
    max-width: 48%;
  }
}

/* 9张图片 */
.nine-images {
  flex: 1 1 31%;
  max-width: 31%;
}

@media (min-width: 768px) {
  .nine-images:nth-child(3n+1) {
    flex: 1 1 68%;
    max-width: 68%;
  }
}

/* 10张图片 */
.ten-images {
  flex: 1 1 23%;
  max-width: 23%;
}

@media (min-width: 768px) {
  .ten-images:nth-child(4n+1) {
    flex: 1 1 48%;
    max-width: 48%;
  }
}
</style>