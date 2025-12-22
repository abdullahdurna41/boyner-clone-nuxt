<template>
  <div :class="['price-display', size]">
    <span v-if="oldPrice" class="old-price">{{ formatPrice(oldPrice) }} TL</span>
    <span class="current-price">{{ formatPrice(price) }} TL</span>
  </div>
</template>

<script setup>
defineProps({
  price: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    default: null
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  }
});

const formatPrice = (val) => {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(val);
};
</script>

<style scoped>
.price-display {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
}

.current-price {
  font-weight: 700;
  color: #2b2b38;
}

/* Sizes */
.small .old-price {
  font-size: 12px;
}
.small .current-price {
  font-size: 14px;
}

.medium .old-price {
  font-size: 14px;
}
.medium .current-price {
  font-size: 18px;
}

.large .old-price {
  font-size: 16px;
}
.large .current-price {
  font-size: 24px;
}
</style>
