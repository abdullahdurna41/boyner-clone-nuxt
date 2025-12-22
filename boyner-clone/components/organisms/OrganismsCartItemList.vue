<template>
  <div class="cart-item-list">
    <div class="list-wrapper">
      <OrganismsCartItem
        v-for="item in items"
        :key="item.id"
        :item="item"
        @increase="$emit('increase-qty', item)"
        @decrease="$emit('decrease-qty', item)"
        @remove="$emit('remove-item', item)"
      />
    </div>
  </div>
</template>

<script setup>


defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

defineEmits(['increase-qty', 'decrease-qty', 'remove-item']);
</script>

<style scoped>
.list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
