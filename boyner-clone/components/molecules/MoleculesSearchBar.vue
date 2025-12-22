<template>
  <div class="search-bar">
    <div class="search-bar-inside">
      <button class="search-icon">
        <AtomsAppIcon name="search" :size="20" color="#999" />
      </button>
      <input 
        type="text" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('search', modelValue)"
      />
    </div>
  </div>
</template>

<script setup>


defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Hadi gel aradığını hızlıca bulalım...'
  }
});

defineEmits(['update:modelValue', 'search']);
</script>

<style scoped>
.search-bar {
  padding: 12px 16px;
  flex: 1;
  position: relative;
  height: 48px;
  max-width: 676px;
  display: flex;
  align-items: center;
}

.search-bar-inside {
  width: 100%;
  position: relative;
  color: rgb(43, 43, 56);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #999;
  z-index: 1;
}

.search-bar input {
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: 1px solid #aeaeae;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
  font-family: 'Jost', sans-serif;
  background: #ffffff;
}

.search-bar input:hover {
  border-color: #000;
  background: white;
}

.search-bar input::placeholder {
  color: #2b2b38;
  font-weight: 400;
}
</style>
