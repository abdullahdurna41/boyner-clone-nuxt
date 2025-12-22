<template>
  <div class="spec-box">
    <span class="spec-label">{{ label }}</span>
    <span class="spec-val">{{ value }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.spec-box {
  border: 1px solid #e0e0e0;
  padding: 8px;
  border-radius: 4px;
  flex: 1;
  text-align: center;
}

.spec-label {
  display: block;
  font-size: 10px;
  color: #666;
  margin-bottom: 2px;
}

.spec-val {
  font-size: 12px;
  font-weight: 600;
}
</style>
