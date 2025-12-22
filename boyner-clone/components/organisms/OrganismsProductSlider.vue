<template>
  <section class="similar-products-section">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>

      <div class="slider-wrapper">
        <div class="product-track" ref="trackRef">
          <MoleculesProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @toggle-fav="$emit('toggle-fav', product)"
            @click="$emit('product-click', product)"
          />
        </div>

        <button class="nav-btn next" @click="scrollNext" aria-label="Sonraki">
          <AtomsAppIcon name="chevron-right" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: 'Beğenebileceğin Ürünler'
  },
  products: {
    type: Array,
    default: () => []
  }
});

defineEmits(['toggle-fav', 'product-click']);

const trackRef = ref(null);

const scrollNext = () => {
  if (trackRef.value) {
    trackRef.value.scrollBy({ left: 300, behavior: 'smooth' });
  }
};
</script>

<style scoped>
.similar-products-section {
  padding: 40px 0;
  background-color: #fff;
  font-family: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 22px;
  font-weight: 500;
  color: #2b2b38;
  margin-bottom: 25px;
}

.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.product-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
}

.product-track::-webkit-scrollbar {
  display: none;
}

.product-track :deep(.product-card) {
  flex: 0 0 calc(25% - 15px);
  min-width: 250px;
}

.nav-btn {
  position: absolute;
  right: -15px;
  top: 40%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 2;
  transition: all 0.2s;
}

.nav-btn:hover {
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1024px) {
  .product-track :deep(.product-card) {
    flex: 0 0 calc(33.33% - 15px);
  }
}

@media (max-width: 768px) {
  .product-track :deep(.product-card) {
    flex: 0 0 calc(50% - 10px);
  }

  .nav-btn {
    display: none;
  }
}
</style>
