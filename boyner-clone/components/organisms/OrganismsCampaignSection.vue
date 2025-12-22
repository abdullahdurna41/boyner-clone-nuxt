<template>
  <section class="campaign-section">
    <div class="container">
      <header class="section-header">
        <div class="titles">
          <h3 class="subtitle">
            {{ subtitle }} <span class="icon">❄️</span>
          </h3>
          <h2 class="title">{{ title }}</h2>
        </div>
        <a href="#" class="view-all-btn">
          TÜMÜNÜ İNCELE
          <AtomsAppIcon name="arrow-right" :size="16" />
        </a>
      </header>

      <div class="campaign-grid">
        <MoleculesCampaignCard
          v-for="(item, index) in items"
          :key="index"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.campaign-section {
  padding: 40px 0;
  font-family: 'Jost', sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #2b2b38;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.title {
  font-size: 26px;
  font-weight: 600;
  color: #2b2b38;
}

.view-all-btn {
  font-size: 12px;
  font-weight: 700;
  color: #2b2b38;
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.view-all-btn:hover {
  opacity: 0.7;
}

.campaign-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  .campaign-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .campaign-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
