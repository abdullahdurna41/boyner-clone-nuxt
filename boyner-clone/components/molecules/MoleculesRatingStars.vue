<template>
  <div class="rating-row">
    <div class="stars">{{ displayStars }}</div>
    <a v-if="showReviewCount" href="#" class="review-link">
      {{ reviewCount }} Değerlendirme
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  showReviewCount: {
    type: Boolean,
    default: true
  }
});

const displayStars = computed(() => {
  const fullStars = Math.floor(props.rating);
  const hasHalf = props.rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  
  return '★'.repeat(fullStars) + (hasHalf ? '★' : '') + '☆'.repeat(emptyStars);
});
</script>

<style scoped>
.rating-row {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
}

.stars {
  color: #1e1e96;
  letter-spacing: 2px;
  font-size: 16px;
}

.review-link {
  color: #2b2b38;
  text-decoration: underline;
}
</style>
