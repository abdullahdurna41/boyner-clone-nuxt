<template>
  <select
    :value="modelValue"
    class="app-select"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
    <option 
      v-for="option in options" 
      :key="option.value" 
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
    // [{ value: 'kadın', label: 'Kadın' }]
  },
  placeholder: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.app-select {
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #ddd;
  font-size: 15px;
  font-family: 'Jost', sans-serif;
  outline: none;
  transition: border-color 0.2s;
  background: white;
  border-radius: 4px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  color: #999;
  cursor: pointer;
}

.app-select:focus {
  border-color: #2b2b38;
}

.app-select option {
  color: #2b2b38;
}
</style>
