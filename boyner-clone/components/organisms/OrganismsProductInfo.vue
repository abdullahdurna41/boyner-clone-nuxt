<template>
  <div class="info-wrapper">
    <!-- Header Section -->
    <div class="header-section">
      <div>
        <h2 class="brand">{{ product.brand }}</h2>
        <h1 class="product-name">{{ product.name }}</h1>
      </div>
      <div class="actions-top">
        <button class="fav-btn">
          <AtomsAppIcon name="heart" />
          <span class="fav-count">8776</span>
        </button>
      </div>
    </div>

    <!-- Seller Info -->
    <MoleculesSellerInfo :seller="product.seller" :score="product.sellerScore" />

    <!-- Discount Badge -->
    <AtomsAppBadge v-if="product.discountRate" variant="discount">
      Sepette %{{ product.discountRate }} İndirim
    </AtomsAppBadge>

    <!-- Price -->
    <MoleculesPriceGroup
      :price="product.price"
      :old-price="product.oldPrice"
      size="large"
    />

    <!-- Rating -->
    <MoleculesRatingStars :rating="product.rating" :review-count="product.reviewCount" />

    <!-- Size Selector -->
    <MoleculesSizeSelector
      stock-alert="Stoklar azalıyor, tükenmeden alın."
      fit-note="Kullanıcıların çoğu kendi bedenini almanı öneriyor."
    />

    <!-- Add to Cart Button -->
    <AtomsAppButton variant="primary" full-width @click="$emit('add-to-cart')">
      SEPETE EKLE
    </AtomsAppButton>

    <!-- Hopi Box -->
    <OrganismsHopiBox />

    <!-- Delivery Features -->
    <OrganismsDeliveryFeatures />

    <!-- Product Specs -->
    <div class="product-specs">
      <div class="specs-header">Ürün Bilgileri</div>
      <div class="specs-grid">
        <MoleculesSpecBox
          v-for="(spec, i) in product.specs"
          :key="i"
          :label="spec.label"
          :value="spec.value"
        />
      </div>
      <div class="desc-text">
        Caterpillar Kahverengi Kadın Deri Bot COLORADO, soğuk kış günlerinde ayağınızı sıcak tutacak...
      </div>
      <button class="read-more">DEVAMINI OKU</button>
    </div>

    <!-- Accordion -->
    <div class="accordion-list">
      <MoleculesAccordionItem title="Tüm Değerlendirmeler (74)" />
      <MoleculesAccordionItem title="Hangi Mağazada Var?" />
      <MoleculesAccordionItem title="Teslimat Bilgileri" />
    </div>
  </div>
</template>

<script setup>




defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['add-to-cart']);
</script>

<style scoped>
.info-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #2b2b38;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.brand {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
}

.product-name {
  font-size: 16px;
  font-weight: 400;
  color: #555;
  max-width: 80%;
}

.fav-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2b2b38;
  gap: 2px;
}

.fav-count {
  font-size: 10px;
  font-weight: 600;
}

.product-specs {
  margin-top: 25px;
}

.specs-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
}

.specs-grid {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.desc-text {
  font-size: 12px;
  line-height: 1.5;
  color: #666;
}

.read-more {
  background: none;
  border: none;
  font-size: 11px;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 5px;
  padding: 0;
}

.accordion-list {
  margin-top: 20px;
  border-top: 1px solid #f0f0f0;
}
</style>
