<template>
  <div class="delivery-features">
    <div class="feat-item">
      <AtomsAppIcon name="truck" :size="20" color="#2b2b38" />
      <div>
        <strong>Hızlı Gönderi</strong>
        <span>Tahmini 25 Kasım Salı Kargoda</span>
      </div>
      <span class="free-badge">Kargo Bedava</span>
    </div>
    <div class="feat-item">
      <AtomsAppIcon name="download" :size="20" color="#2b2b38" />
      <span>Dilediğin Zaman, Mağazadan veya Kargo ile İade</span>
    </div>
    <div class="feat-item">
      <AtomsAppIcon name="check" :size="20" color="#2b2b38" />
      <span>Tıkla Gel ile Mağazadan Teslim Alınabilir</span>
    </div>
    <div class="feat-item">
      <AtomsAppIcon name="shield" :size="20" color="#2b2b38" />
      <span>%100 Orijinal Ürün Garantisi</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.delivery-features {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-top: 20px;
}

.feat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
}

.feat-item:last-child {
  border-bottom: none;
}

.feat-item strong {
  display: block;
}

.feat-item span {
  color: #666;
}

.free-badge {
  margin-left: auto;
  font-weight: 700;
  font-size: 11px;
  color: #2b2b38 !important;
}
</style>
