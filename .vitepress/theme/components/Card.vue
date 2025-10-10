<template>
  <div class="card" :style="cardStyle" @click="toggleModal">
    <div class="card__content">
      <h2 class="card__title">{{ title }}</h2>
      <p class="card__description">{{ content }}</p>
      <!-- <button class="card__button">了解更多</button> -->
    </div>
    <!-- <svg viewBox="0 0 24 24" class="card__icon">
      <path d="M12 2L1 21h22L12 2zm0 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
    </svg> -->
  </div>

  <!-- Modal for full-screen image view -->
  <div v-if="isModalOpen" class="modal" @click="toggleModal">
    <div class="modal__content" @click.stop>
      <img :src="image" alt="Full-size image" class="modal__image" />
      <button class="modal__close" @click="toggleModal">关闭</button>
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
      isModalOpen: false
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    }
  },
  computed: {
    cardStyle() {
      return {
        backgroundImage: `url(${this.image})`,
        aspectRatio: this.aspectRatio
      };
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  width: 350px;
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
  cursor: pointer;
  margin: 20px auto; /* 水平居中 */
}

.card svg {
  width: 48px;
  fill: #333;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover {
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

.card:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-size: 20px;
  color: #333;
  font-weight: 700;
}

.card:hover svg {
  scale: 0;
}

.card__description {
  margin: 10px 0 10px;
  font-size: 12px;
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
  align-items: center;
  z-index: 1000;
}

.modal__content {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal__image {
  width: 100%;
  height: auto;
  display: block;
  max-width: 100%;
  max-height: 80%; /* 限制图片高度，避免超出屏幕 */
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

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    width: 90%; /* 在小屏幕上宽度占满屏幕 */
    margin: 20px auto; /* 保持水平居中 */
  }
}
</style>