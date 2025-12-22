<template>
  <div class="mega-menu-wrapper" v-show="isOpen" @mouseenter="$emit('keep-open')" @mouseleave="$emit('close')">
    <div class="container">
      <div class="menu-layout">
        <div class="links-section">
          <div class="menu-column" v-for="(column, colIndex) in menuData" :key="colIndex">
            <MoleculesMenuGroup
              v-for="(group, grpIndex) in column"
              :key="grpIndex"
              :title="group.title"
              :link="group.link"
              :is-red="group.isRed"
              :items="group.items"
            />
          </div>
        </div>

        <div class="banners-section">
          <MoleculesBannerCard
            v-for="(banner, bIndex) in banners"
            :key="bIndex"
            :banner="banner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>


defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  menuData: {
    type: Array,
    default: () => []
  },
  banners: {
    type: Array,
    default: () => []
  }
});

defineEmits(['close', 'keep-open']);
</script>

<style scoped>
.mega-menu-wrapper {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 30px 0 50px 0;
  font-family: 'Jost', 'Inter', sans-serif;
}

.container {
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 20px;
}

.menu-layout {
  display: flex;
  gap: 40px;
}

.links-section {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.menu-column {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.banners-section {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
