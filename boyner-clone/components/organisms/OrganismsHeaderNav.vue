<template>
  <nav class="navigation" :class="{ 'hidden': isHidden }" @mouseleave="handleCloseMenu">
    <div class="container">
      <ul class="nav-menu">
        <MoleculesNavLink
          v-for="(item, index) in menuItems"
          :key="index"
          :title="item.title"
          :is-campaign="item.isCampaign"
          :is-active="activeMenu === item.title"
          @mouseenter="handleOpenMenu(item.title)"
        />
      </ul>

      <OrganismsMegaMenu
        v-if="isMenuOpen"
        :is-open="isMenuOpen"
        :menu-data="computedActiveMenuData.columns"
        :banners="computedActiveMenuData.banners"
        @keep-open="handleKeepOpen"
        @close="handleCloseMenu"
        @mouseenter="handleKeepOpen"
        @mouseleave="handleCloseMenu"
      />
    </div>
  </nav>
</template>

<script setup>
// Props tanımı: Artık sadece ham veriyi alıyor, state'i değil.
const props = defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  // Mega menü içeriğini layout'tan (veya store'dan) almamız lazım
  megaMenuData: {
    type: Object,
    default: () => ({})
  },
  isHidden: {
    type: Boolean,
    default: false
  }
});

// --- STATE YÖNETİMİ (Eskiden App.vue'de olanlar) ---
// Nuxt'ta ref ve computed otomatik import edilir
const isMenuOpen = ref(false);
const activeMenu = ref(null);

// Seçili olan menünün verisini hesaplayan Computed
const computedActiveMenuData = computed(() => {
  if (activeMenu.value && props.megaMenuData && props.megaMenuData[activeMenu.value]) {
    return props.megaMenuData[activeMenu.value];
  }
  return { columns: [], banners: [] };
});

// --- ACTIONLAR ---

const handleOpenMenu = (title) => {
  // Eğer bu başlığın mega menü datası varsa aç
  if (props.megaMenuData && props.megaMenuData[title]) {
    activeMenu.value = title;
    isMenuOpen.value = true;
  } else {
    // Verisi olmayan bir linke (örn: Kampanyalar) gelirse menüyü kapat
    isMenuOpen.value = false;
    activeMenu.value = title; // Yine de aktif (bold) görünsün diye set edilebilir
  }
};

const handleCloseMenu = () => {
  isMenuOpen.value = false;
  activeMenu.value = null;
};

const handleKeepOpen = () => {
  isMenuOpen.value = true;
};
</script>

<style scoped>
.navigation {
  background: #fff;
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: visible;
  opacity: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.navigation.hidden {
  max-height: 0;
  overflow: hidden;
}

.navigation .container {
  height: 60px;
  width: 1400px;
  font-size: 16px;
  padding: 0 12px;
  position: relative;
  display: flex;
  justify-content: center;
}

.nav-menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: 1200px) {
  .navigation .container {
    padding: 0 20px;
  }

  .nav-menu {
    gap: 5px;
    overflow-x: auto;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 0;
  }
}
</style>