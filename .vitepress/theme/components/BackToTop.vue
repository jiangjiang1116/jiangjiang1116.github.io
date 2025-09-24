<template>
  <div v-if="isVisible" class="back-to-top" @click="scrollToTop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-chevron-up"
    >
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </div>
</template>

<script>
export default {
  name: "BackToTop",
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 300; // 显示阈值为300px
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.back-to-top:hover {
  opacity: 0.8;
}

.feather-chevron-up {
  width: 24px;
  height: 24px;
}
</style>