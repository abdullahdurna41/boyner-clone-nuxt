<template>
  <div class="banner-card">
    <a :href="banner.link || '#'">
      <img :src="banner.image" :alt="banner.text" />
      <div class="banner-overlay">
        <span v-html="banner.text"></span>
      </div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  banner: {
    type: Object,
    required: true
    // { image, text, link }
  }
});
</script>

<style scoped>
.banner-card {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}

.banner-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.banner-card:hover img {
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}
</style>
