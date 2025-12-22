<template>
  <div class="textarea-wrapper">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      class="app-textarea"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: [String, Number], default: 4 }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.textarea-wrapper { width: 100%; }
.app-textarea {
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #ddd;
  font-size: 15px;
  font-family: 'Jost', sans-serif;
  outline: none;
  transition: border-color 0.2s;
  background: white;
  border-radius: 4px;
  resize: vertical;
}
.app-textarea:focus { border-color: #2b2b38; }
.app-textarea::placeholder { color: #999; }
</style>