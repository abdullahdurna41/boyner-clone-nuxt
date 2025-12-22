<template>
  <div class="main-footer">
    <div class="container">
      <div class="footer-grid">
        <OrganismsFooterColumn
          v-for="(col, index) in columns"
          :key="index"
          :column="col"
        />
      </div>
    </div>
  </div>
</template>

<script setup>


defineProps({
  columns: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.main-footer {
  background-color: #f9f9f9;
  padding: 50px 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
}

@media (max-width: 1200px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
