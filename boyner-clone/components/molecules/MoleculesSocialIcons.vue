<template>
  <div class="social-icons">
    <a 
      v-for="icon in icons" 
      :key="icon.name" 
      :href="icon.url" 
      class="social-icon" 
      :aria-label="icon.name"
    >
      <img v-if="icon.image" :src="icon.image" :alt="icon.name" />
    </a>
  </div>
</template>

<script setup>
defineProps({
  icons: {
    type: Array,
    default: () => [
      { name: 'Facebook', url: '#', image: '/images/facebook-icon.png' },
      { name: 'Instagram', url: '#', image: '/images/instagram-icon.png' },
      { name: 'YouTube', url: '#', image: '/images/youtube-icon.png' },
      { name: 'Twitter', url: '#', image: '/images/x-icon.png' }
    ]
  }
});
</script>

<style scoped>
.social-icons {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: border-color 0.2s;
}

.social-icon:hover {
  border-color: #999;
}

.social-icon img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}
</style>
