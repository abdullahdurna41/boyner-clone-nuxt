<template>
  <div class="product-card" @click="$emit('click', product)">
    <div class="image-container">
      <img :src="product.image" :alt="product.name" class="product-img" />
    </div>

    <div class="info-container">
      <div class="name-row">
        <div class="text-part">
          <span class="brand">{{ product.brand }}</span>
          <span class="name">{{ product.name }}</span>
        </div>
        <button 
          class="fav-btn" 
          aria-label="Favorilere Ekle"
          @click.stop="$emit('toggle-fav', product)"
        >
          <AtomsAppIcon name="heart" :size="20" />
        </button>
      </div>

      <AtomsAppBadge v-if="product.discountText" variant="discount">
        {{ product.discountText }}
      </AtomsAppBadge>

      <MoleculesPriceGroup 
        :price="product.price" 
        :old-price="product.oldPrice"
        size="small"
      />
    </div>
  </div>
</template>

<script setup>


defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['click', 'toggle-fav']);
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.image-container {
  width: 100%;
  aspect-ratio: 1 / 1.1;
  background-color: #f7f7f7;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  transition: transform 0.3s;
}

.product-card:hover .product-img {
  transform: scale(1.03);
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.name-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.text-part {
  font-size: 13px;
  line-height: 1.4;
  color: #2b2b38;
  max-width: 85%;
}

.brand {
  font-weight: 700;
  margin-right: 4px;
}

.name {
  font-weight: 400;
  color: #555;
}

.fav-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #2b2b38;
  padding: 0;
}

.fav-btn:hover {
  color: #000;
}
</style>
