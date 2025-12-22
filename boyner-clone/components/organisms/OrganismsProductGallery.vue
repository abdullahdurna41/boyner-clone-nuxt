<template>
  <div class="gallery-wrapper">
    <div class="main-image-box">
      <AtomsAppBadge v-if="badge" variant="new" class="badge">{{ badge }}</AtomsAppBadge>
      <img :src="activeImage" alt="Ürün Detay" />
    </div>

    <div class="sub-images-grid">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="sub-image-item"
        :class="{ active: activeImage === img }"
        @click="activeImage = img"
      >
        <img :src="img" alt="Ürün Açısı" />
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  badge: {
    type: String,
    default: ''
  }
});

const activeImage = ref(props.images[0]);

watch(() => props.images, (newVal) => {
  if (newVal && newVal.length) activeImage.value = newVal[0];
});
</script>

<style scoped>
.gallery-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 20px;
}

.main-image-box {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background-color: #f5f5f5;
  overflow: hidden;
  cursor: crosshair;
}

.main-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
}

.sub-images-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.sub-image-item {
  width: 100%;
  aspect-ratio: 2 / 3;
  cursor: pointer;
  position: relative;
  opacity: 0.9;
  transition: opacity 0.2s, border-color 0.2s;
  border: 1px solid transparent;
}

.sub-image-item.active {
  opacity: 1;
  border: 1px solid #000;
}

.sub-image-item:hover {
  opacity: 1;
}

.sub-image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .sub-images-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  }
}
</style>
