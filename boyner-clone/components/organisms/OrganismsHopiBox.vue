<template>
  <div class="hopi-box">
    <div class="hopi-content">
      <span class="hopi-logo">hopi</span>
      <p>{{ text }}</p>
    </div>
    <AtomsAppButton variant="outline" size="small" class="hopi-btn">
      {{ buttonText }}
    </AtomsAppButton>
  </div>
</template>

<script setup>


defineProps({
  text: {
    type: String,
    default: "Harcamaya Hazır Limit'inle Şimdi Al, 455,14 TL'den başlayan taksitlerle öde"
  },
  buttonText: {
    type: String,
    default: 'KEŞFET'
  }
});
</script>

<style scoped>
.hopi-box {
  background: #eafcf9;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: 10px;
}

.hopi-content {
  display: flex;
  gap: 10px;
  align-items: center;
}

.hopi-logo {
  font-weight: 800;
  color: #00b9a3;
  font-size: 16px;
}

.hopi-content p {
  font-size: 11px;
  line-height: 1.3;
  margin: 0;
}

.hopi-btn {
  border-color: #00b9a3 !important;
  color: #00b9a3 !important;
  font-size: 11px !important;
  white-space: nowrap;
}
</style>
