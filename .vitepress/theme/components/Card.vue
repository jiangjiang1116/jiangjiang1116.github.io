<template>
  <div
    class="card"
    :style="cardStyle"
    ref="cardRef"
    :class="{ 'card--hover': isHovered }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="card__content">
      <h2 class="card__title">{{ title }}</h2>
      <p class="card__description">{{ content }}</p>
    </div>
  </div>

  <!-- Modal for half-screen content view -->
  <div v-if="isModalOpen" class="modal" @click="toggleModal">
    <div class="modal__content" @click.stop>
      <button class="modal__close" @click="toggleModal">关闭</button>
      <div class="modal__text-content">
        <h2 class="modal__title">{{ title }}</h2>
        <p class="modal__description">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    aspectRatio: {
      type: String,
      default: '16/9' // 默认比例
    }
  },
  data() {
    return {
      isModalOpen: false,
      isHovered: false,
      isManuallyHovered: false
    };
  },
  computed: {
    cardStyle() {
      return {
        backgroundImage: `url(${this.image})`,
        aspectRatio: this.aspectRatio
      };
    }
  },
  mounted() {
    this.setupIntersectionObserver();
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        root: null, // 视窗
        rootMargin: '0px',
        threshold: 0.5 // 至少50%可见
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isManuallyHovered) {
            this.isHovered = true;
            observer.unobserve(entry.target); // 停止观察
          } else if (!entry.isIntersecting) {
            this.isHovered = false;
          }
        });
      }, options);

      observer.observe(this.$refs.cardRef);
    },
    handleMouseEnter() {
      this.isManuallyHovered = true;
      this.isHovered = false;
    },
    handleMouseLeave() {
      this.isManuallyHovered = false;
      this.isHovered = false;
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
      if (this.isModalOpen) {
        document.body.style.overflow = 'hidden'; // 防止滚动
      } else {
        document.body.style.overflow = 'auto'; // 恢复滚动
      }
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  width: 80%;
  background-color: #f2f2f2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;
  box-shadow: 0 0 0 5px #ffffff80;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-size: cover;
  background-position: center;
  margin: 20px auto; /* 水平居中 */
}

.card svg {
  width: 48px;
  fill: #333;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover,
.card.card--hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}

.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(242, 242, 242, 0.9);
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover .card__content,
.card.card--hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 30px;
  color: #333;
  font-weight: 700;
}

.card:hover svg,
.card.card--hover svg {
  scale: 0;
}

.card__description {
  margin: 10px 0 10px;
  font-size: 24px;
  color: #777;
  line-height: 1.4;
}

.card__button {
  padding: 15px;
  border-radius: 8px;
  background: #777;
  border: none;
  color: white;
  cursor: pointer;
}

.card__button:hover {
  background: #666;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  backdrop-filter: blur(5px); /* 模糊背景 */
}

.modal__content {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  height: 50%; /* 半屏高度 */
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; /* 距离顶部的间距 */
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #777;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.modal__close:hover {
  background: #666;
}

.modal__text-content {
  text-align: center;
  width: 100%;
}

.modal__title {
  margin: 0 0 10px;
  font-size: 24px;
  color: #333;
  font-weight: 700;
}

.modal__description {
  margin: 0 0 20px;
  font-size: 14px;
  color: #777;
  line-height: 1.6;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    width: 90%; /* 在小屏幕上宽度占满屏幕 */
    margin: 20px auto; /* 保持水平居中 */
  }
}
</style>