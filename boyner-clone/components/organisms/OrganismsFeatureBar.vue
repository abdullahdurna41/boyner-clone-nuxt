<template>
  <div class="feature-bar">
    <div class="feature-item">
      <AtomsAppIcon name="check-circle" color="#00b894" />
      <span>%100 Orjinal Ürün Garantisi</span>
    </div>
    <div class="feature-item">
      <AtomsAppIcon name="download" color="#00b894" />
      <span>Kolay İade</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.feature-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #f0f0f0;
  padding: 16px 40px;
  display: flex;
  justify-content: center;
  gap: 40px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  z-index: 100;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

@media (max-width: 1200px) {
  .feature-bar {
    flex-wrap: wrap;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .feature-bar {
    padding: 12px 20px;
    gap: 12px;
  }

  .feature-item {
    font-size: 11px;
  }
}
</style>
