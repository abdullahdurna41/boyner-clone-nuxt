<template>
  <div class="input-wrapper" :class="{ 'has-icon': hasIcon }">
    <slot name="icon-left"></slot>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      class="app-input"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <slot name="icon-right"></slot>
  </div>
</template>

<script setup>
import { useSlots } from 'vue';

const slots = useSlots();
const hasIcon = !!slots['icon-left'] || !!slots['icon-right'];

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  }
});

defineEmits(['update:modelValue', 'focus', 'blur']);
</script>

<style scoped>
.input-wrapper {
  position: relative;
  width: 100%;
}

.app-input {
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #ddd;
  font-size: 15px;
  font-family: 'Jost', sans-serif;
  outline: none;
  transition: border-color 0.2s;
  background: white;
  border-radius: 4px;
}

.app-input:focus {
  border-color: #2b2b38;
}

.app-input:hover {
  border-color: #999;
}

.app-input::placeholder {
  color: #999;
}

.app-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.has-icon .app-input {
  padding-left: 50px;
}
</style>
