<template>
  <nav class="breadcrumb-wrapper" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <MoleculesBreadcrumbItem
        v-for="(item, index) in paths"
        :key="index"
        :text="item.text"
        :link="item.link"
        :active="item.active"
        :show-separator="index < paths.length - 1"
      />
    </ol>
  </nav>
</template>

<script setup>


defineProps({
  paths: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.breadcrumb-wrapper {
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 1px solid #f0f0f0;
}

.breadcrumb-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 13px;
  color: #666;
  padding: 0;
  margin: 0;
}

@media (max-width: 768px) {
  .breadcrumb-wrapper {
    padding: 15px 0;
    margin-bottom: 20px;
  }

  .breadcrumb-list {
    font-size: 11px;
  }
}
</style>
