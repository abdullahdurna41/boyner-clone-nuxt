<template>
  <button 
    :class="['app-button', variant, size, { 'full-width': fullWidth }]"
    :type="type"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'text', 'icon'].includes(v)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  },
  type: {
    type: String,
    default: 'button'
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// defineEmits(['click']) KISMINI SİLDİK
// Vue'da root elemente gelen click olayını tanımlamaya gerek yoktur.
</script>

<style scoped>
/* CSS'lerin harika, aynen kalsın */
.app-button {
  font-family: 'Jost', sans-serif;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.app-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.small { padding: 8px 12px; font-size: 12px; }
.medium { padding: 14px 20px; font-size: 14px; }
.large { padding: 16px 24px; font-size: 16px; }

.primary { background: #2b2b38; color: #fff; }
.primary:hover:not(:disabled) { background: #1a1a24; }

.secondary { background: #f5f5f5; color: #2b2b38; }
.secondary:hover:not(:disabled) { background: #e5e5e5; }

.outline { background: transparent; border: 1px solid #2b2b38; color: #2b2b38; }
.outline:hover:not(:disabled) { background: #f5f5f5; }

.text { background: none; color: #2b2b38; padding: 4px 8px; }
.text:hover:not(:disabled) { color: #000; }

.icon { background: none; border: none; padding: 4px; color: #2b2b38; }
.icon:hover:not(:disabled) { color: #000; }

.full-width { width: 100%; }
</style>