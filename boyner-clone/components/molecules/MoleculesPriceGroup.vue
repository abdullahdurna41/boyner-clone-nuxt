<template>
  <div class="price-group" :class="[layout, size]">
    <span v-if="oldPrice" class="old-price">{{ formatPrice(oldPrice) }} TL</span>
    <span class="current-price">{{ formatPrice(price) }} TL</span>
    <span v-if="suffix" class="price-suffix" v-html="suffix"></span>
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
  suffix: {
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: 'horizontal', // horizontal, vertical
    validator: (v) => ['horizontal', 'vertical'].includes(v)
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large, hero
    validator: (v) => ['small', 'medium', 'large', 'hero'].includes(v)
  }
});

const formatPrice = (val) => {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(val);
};
</script>

<style scoped>
.price-group {
  display: flex;
  gap: 8px;
  color: #2b2b38;
}

.horizontal {
  flex-direction: row;
  align-items: baseline;
}

.vertical {
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
}

.current-price {
  font-weight: 700;
}

.price-suffix {
  font-size: 10px;
  font-weight: 700;
  text-align: left;
  line-height: 1.2;
}

/* Sizes */
.small .old-price { font-size: 12px; }
.small .current-price { font-size: 14px; }

.medium .old-price { font-size: 14px; }
.medium .current-price { font-size: 18px; }

.large .old-price { font-size: 16px; }
.large .current-price { font-size: 24px; }

.hero .old-price { font-size: 18px; }
.hero .current-price { font-size: 42px; font-weight: 800; letter-spacing: -1px; }
.hero .price-suffix { margin-top: 8px; }
</style>
