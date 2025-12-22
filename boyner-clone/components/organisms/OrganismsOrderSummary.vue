<template>
  <div class="summary-wrapper">
    <h3 class="summary-title">Sipariş Özeti</h3>

    <div class="line-item">
      <span>Sepet Tutarı</span>
      <span>{{ formatPrice(subtotal) }} TL</span>
    </div>

    <div class="line-item">
      <span>Kargo Ücreti</span>
      <div class="shipping-cost">
        <span class="striked" v-if="shipping === 0">69,99 TL</span>
        <span class="free-text">{{ shipping === 0 ? 'Ücretsiz' : shipping + ' TL' }}</span>
      </div>
    </div>

    <hr class="divider" />

    <div class="line-item total-row">
      <span>Toplam</span>
      <span class="total-amount">{{ formatPrice(total) }} TL</span>
    </div>

    <AtomsAppButton variant="primary" full-width @click="$emit('checkout')">
      SEPETİ ONAYLA
      <AtomsAppIcon name="arrow-right" :size="18" color="#fff" />
    </AtomsAppButton>
  </div>
</template>

<script setup>


defineProps({
  subtotal: {
    type: Number,
    default: 0
  },
  shipping: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
});

defineEmits(['checkout']);

const formatPrice = (val) => {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(val);
};
</script>

<style scoped>
.summary-wrapper {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 25px;
}

.summary-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2b2b38;
}

.line-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
}

.shipping-cost {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.striked {
  text-decoration: line-through;
  font-size: 12px;
  color: #999;
}

.free-text {
  color: #008000;
  font-weight: 600;
}

.divider {
  border: 0;
  border-top: 1px solid #f0f0f0;
  margin: 15px 0;
}

.total-row {
  margin-bottom: 25px;
  color: #2b2b38;
}

.total-row span:first-child {
  font-weight: 600;
  font-size: 16px;
}

.total-amount {
  font-size: 22px;
  font-weight: 700;
}
</style>
