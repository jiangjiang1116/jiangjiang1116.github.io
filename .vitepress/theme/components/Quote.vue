<template>
  <div class="quote">
    <div class="page">
      <p>{{ content }}</p>
    </div>
    <div class="margin"></div>
  </div>
</template>

<script>
export default {
  name: 'Quote',
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.page {
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  font-family: cursive;
  font-size: 20px;
  border-radius: 10px;
  background: #fff;
  background-image: linear-gradient(#f5f5f0 1.1rem, #ccc 1.2rem);
  background-size: 100% 1.2rem;
  line-height: 1.2rem;
  padding: 1.4rem 0.5rem 0.3rem 4.5rem;
  margin:1rem; 
}

.page::before,
.page::after {
  position: absolute;
  content: "";
  bottom: 10px;
  width: 40%;
  height: 10px;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.7);
  z-index: -1;
  transition: all 0.3s ease;
}

.page::before {
  left: 15px;
  transform: skew(-5deg) rotate(-5deg);
}

.page::after {
  right: 15px;
  transform: skew(5deg) rotate(5deg);
}

.page:hover::before,
.page:hover::after {
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.4);
}

.margin {
  position: absolute;
  border-left: 1px solid #d88;
  height: 100%;
  left: 3.3rem;
  top: 0;
}

.page p {
  margin: 0;
  text-indent: 1rem;
  padding-bottom: 1.2rem;
  color: black;
  line-height: 20px;
}
</style>