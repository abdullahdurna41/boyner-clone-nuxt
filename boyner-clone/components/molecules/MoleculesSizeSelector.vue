<template>
  <div class="size-area">
    <div class="size-header">
      <span>Beden</span>
      <a href="#" class="size-guide">Beden Tablosu</a>
    </div>
    <div class="size-dropdown" @click="$emit('open-sizes')">
      <span>{{ selectedSize || 'Seç' }}</span>
      <AtomsAppIcon name="chevron-down" :size="12" />
    </div>
    <p v-if="stockAlert" class="stock-alert">{{ stockAlert }}</p>
    <div v-if="fitNote" class="fit-note">
      <AtomsAppIcon name="user" :size="16" />
      {{ fitNote }}
    </div>
  </div>
</template>

<script setup>
import AppIcon from '~/components/atoms/AtomsAppIcon.vue';

defineProps({
  selectedSize: {
    type: String,
    default: ''
  },
  stockAlert: {
    type: String,
    default: ''
  },
  fitNote: {
    type: String,
    default: ''
  }
});

defineEmits(['open-sizes']);
</script>

<style scoped>
.size-header {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
}

.size-guide {
  color: #666;
  text-decoration: underline;
  font-weight: 400;
}

.size-dropdown {
  border: 1px solid #e0e0e0;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: #999;
  font-size: 14px;
  transition: border-color 0.2s;
}

.size-dropdown:hover {
  border-color: #2b2b38;
}

.stock-alert {
  color: #e30613;
  font-size: 11px;
  margin-top: 5px;
}

.fit-note {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  margin-top: 10px;
  color: #2b2b38;
}
</style>
