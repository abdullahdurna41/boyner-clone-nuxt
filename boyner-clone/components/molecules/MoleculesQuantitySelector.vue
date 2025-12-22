<template>
  <div class="qty-controller">
    <button 
      v-if="quantity === 1" 
      @click="$emit('remove')" 
      class="qty-btn trash"
      aria-label="Ürünü Sil"
    >
      <AtomsAppIcon name="trash" :size="16" />
    </button>
    <button 
      v-else 
      @click="$emit('decrease')" 
      class="qty-btn"
      aria-label="Azalt"
    >
      -
    </button>

    <span class="qty-value">{{ quantity }}</span>

    <button 
      @click="$emit('increase')" 
      class="qty-btn"
      aria-label="Artır"
    >
      +
    </button>
  </div>
</template>

<script setup>


defineProps({
  quantity: {
    type: Number,
    default: 1
  }
});

defineEmits(['increase', 'decrease', 'remove']);
</script>

<style scoped>
.qty-controller {
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  padding: 4px 8px;
  background: #fff;
}

.qty-btn {
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  color: #2b2b38;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.qty-btn:hover {
  color: #000;
}

.qty-btn.trash {
  color: #666;
}

.qty-value {
  margin: 0 10px;
  font-size: 14px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}
</style>
