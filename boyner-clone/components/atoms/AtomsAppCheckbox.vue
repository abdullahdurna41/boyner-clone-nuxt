<template>
  <label class="checkbox-wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark"></span>
    <span class="label-text">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  cursor: pointer;
}

.checkbox-wrapper input[type="checkbox"] {
  margin-top: 2px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.label-text {
  flex: 1;
}

.label-text :deep(a) {
  color: rgb(43, 43, 56);
  text-decoration: underline;
  font-weight: 500;
}
</style>
