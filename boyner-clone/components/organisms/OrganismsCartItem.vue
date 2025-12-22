<template>
  <div class="cart-item-card">
    <div class="item-header">
      <div class="seller-info">
        <span class="label">Satıcı:</span>
        <span class="seller-name">{{ item.seller }}</span>
      </div>
      <div class="shipping-badge">
        <AtomsAppIcon name="check-circle" :size="14" color="#008000" />
        <span>Kargo Bedava</span>
      </div>
    </div>

    <div class="item-body">
      <div class="image-wrapper">
        <img :src="item.image" :alt="item.name" />
      </div>

      <div class="info-wrapper">
        <div class="product-title">
          <span class="brand">{{ item.brand }}</span>
          <span class="name">{{ item.name }}</span>
        </div>

        <MoleculesDeliveryInfo :delivery-date="item.deliveryDate" />

        <div class="variant-select">
          <span>{{ item.color }} / {{ item.size }}</span>
          <AtomsAppIcon name="chevron-down" :size="12" />
        </div>

        <div class="stock-info">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#2b38d1">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
          <span>{{ item.stockInfo }}</span>
        </div>

        <AtomsAppCheckbox v-model="isGift">
          Hediye Paketi İstiyorum
        </AtomsAppCheckbox>
      </div>

      <div class="actions-wrapper">
        <MoleculesPriceGroup
          :price="item.price"
          :old-price="item.oldPrice"
          layout="vertical"
        />

        <div class="controls-row">
          <MoleculesQuantitySelector
            :quantity="item.quantity"
            @increase="$emit('increase')"
            @decrease="$emit('decrease')"
            @remove="$emit('remove')"
          />

          <button class="wishlist-btn">
            <AtomsAppIcon name="heart" :size="20" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


defineProps({
  item: {
    type: Object,
    required: true
  }
});

defineEmits(['increase', 'decrease', 'remove', 'toggle-gift']);

const isGift = ref(false);
</script>

<style scoped>
.cart-item-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  margin-bottom: 15px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.seller-info .label {
  color: #666;
}

.seller-info .seller-name {
  font-weight: 700;
  text-decoration: underline;
  color: #2b2b38;
  margin-left: 5px;
}

.shipping-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #008000;
  font-weight: 600;
  font-size: 12px;
}

.item-body {
  display: flex;
  padding: 20px;
  gap: 20px;
}

.image-wrapper {
  width: 100px;
  height: 120px;
  flex-shrink: 0;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.info-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-title {
  font-size: 15px;
  color: #2b2b38;
  line-height: 1.4;
}

.product-title .brand {
  font-weight: 700;
  margin-right: 5px;
}

.variant-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e5e5;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  color: #2b2b38;
  width: fit-content;
  min-width: 120px;
  cursor: pointer;
  background: #f9f9f9;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #2b2b38;
}

.actions-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 120px;
}

.controls-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.wishlist-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #2b2b38;
}

@media (max-width: 768px) {
  .item-body {
    flex-direction: column;
  }

  .actions-wrapper {
    flex-direction: row;
    width: 100%;
    align-items: center;
  }
}
</style>
