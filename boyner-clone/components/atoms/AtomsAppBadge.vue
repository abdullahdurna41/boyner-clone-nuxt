<template>
  <span :class="['app-badge', variant]">
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default', // default, discount, success, warning, new
    validator: (v) => ['default', 'discount', 'success', 'warning', 'new', 'cart'].includes(v)
  }
});
</script>

<style scoped>
.app-badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 2px;
  text-transform: uppercase;
}

.default {
  background: #f5f5f5;
  color: #2b2b38;
}

.discount {
  background: #d4ff00;
  color: #2b2b38;
}

.success {
  background: #eafcf9;
  color: #00b9a3;
}

.warning {
  background: #fff3e0;
  color: #e87e04;
}

.new {
  background: #fff;
  color: #2b2b38;
  font-size: 12px;
  padding: 6px 12px;
  letter-spacing: 0.5px;
}

.cart {
  background: #e30613;
  color: #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
</style>
