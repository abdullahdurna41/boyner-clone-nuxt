<template>
  <div class="delivery-info">
    <AtomsAppIcon name="truck" :size="16" color="#666" />
    <span>Tahmini {{ deliveryDate }} Kargoda</span>
  </div>
</template>

<script setup>


defineProps({
  deliveryDate: {
    type: String,
    default: '26 Kasım Çarşamba'
  }
});
</script>

<style scoped>
.delivery-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #666;
}
</style>
