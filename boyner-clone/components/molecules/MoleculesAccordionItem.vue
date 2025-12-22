<template>
  <div class="acc-item" @click="$emit('click')">
    <span>{{ title }}</span>
    <span class="arrow">></span>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});

defineEmits(['click']);
</script>

<style scoped>
.acc-item {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.acc-item:hover {
  background-color: #fafafa;
}

.arrow {
  color: #00b9a3;
  font-weight: bold;
}
</style>
