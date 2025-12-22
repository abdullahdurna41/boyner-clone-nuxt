<template>
  <div class="seller-row">
    <span>Satıcı: <strong class="seller-name">{{ seller }}</strong></span>
    <span v-if="score" class="seller-rating">{{ score }}</span>
  </div>
</template>

<script setup>
defineProps({
  seller: {
    type: String,
    required: true
  },
  score: {
    type: [String, Number],
    default: ''
  }
});
</script>

<style scoped>
.seller-row {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.seller-name {
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  color: #2b2b38;
}

.seller-rating {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}
</style>
