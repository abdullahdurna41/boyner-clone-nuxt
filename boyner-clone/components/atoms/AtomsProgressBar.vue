<template>
  <div class="progress-wrapper">
    <div class="progress-track">
      <div class="progress-bar" :style="{ width: percentage + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator: (v) => v >= 0 && v <= 100
  }
});
</script>

<style scoped>
.progress-track {
  width: 140px;
  height: 3px;
  background: #e6e6e6;
  position: relative;
  border-radius: 3px;
}

.progress-bar {
  height: 100%;
  background: #E30613;
  transition: width 0.3s ease;
  border-radius: 3px;
}
</style>
