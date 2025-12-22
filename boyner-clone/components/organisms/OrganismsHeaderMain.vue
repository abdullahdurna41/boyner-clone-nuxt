<template>
  <div class="main-header">
    <div class="container">
      <AtomsLogo />

      <MoleculesSearchBar v-model="searchQuery" @search="handleSearch" />

      <div class="header-actions">
        <ul>
          <li>
            <a href="/login" class="action-icon" aria-label="Hesabım">
              <AtomsAppIcon name="user" />
            </a>
          </li>
          <li>
            <a href="#" class="action-icon" aria-label="Favoriler">
              <AtomsAppIcon name="heart" />
            </a>
          </li>
          <li>
            <a href="/cart" class="action-icon cart-icon" aria-label="Sepet">
              <AtomsAppIcon name="bag" />
              <AtomsAppBadge v-if="cartCount > 0" variant="cart">{{ cartCount }}</AtomsAppBadge>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  cartCount: {
    type: Number,
    default: 1
  }
});

const searchQuery = ref('');

const handleSearch = (query) => {
  console.log('Searching:', query);
};
</script>

<style scoped>
.main-header {
  gap: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-header .container {
  height: 80px;
  width: 1440px;
  max-width: 1376px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-actions {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-shrink: 0;
}

.header-actions ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;
}

.action-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
  padding: 5px;
  position: relative;
}

.action-icon:hover {
  color: #000;
}

.cart-icon :deep(.app-badge) {
  position: absolute;
  top: -5px;
  right: -5px;
}

@media (max-width: 1200px) {
  .main-header .container {
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .main-header .container {
    flex-wrap: wrap;
    gap: 15px;
    height: auto;
    padding: 15px 20px;
  }
}
</style>
