<template>
  <aside class="admin-sidebar">
    <div class="sidebar-header">
      <AtomsLogo variant="full" style="transform: scale(0.8);" />
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="(item, index) in menuItems" :key="index">
          <NuxtLink :to="item.link" class="nav-item" active-class="active">
            <AtomsAppIcon :name="item.icon" :size="20" />
            <span>{{ item.text }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
const menuItems = [
  { text: 'Dashboard', link: '/admin', icon: 'check-circle' }, // Örnek icon
  { text: 'Ürünler', link: '/admin/products', icon: 'bag' },
  { text: 'Siparişler', link: '/admin/orders', icon: 'truck' },
  { text: 'Mesajlar', link: '/admin/contact', icon: 'user' }, // Contact sayfası linki
  { text: "Kategoriler", link: '/admin/categories', icon: 'bag' } // Örnek icon
];
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  background: #fff;
  border-right: 1px solid #e5e5e5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
}

.sidebar-header {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f0f0f0;
}

.nav-list {
  list-style: none;
  padding: 20px;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
}

.nav-item:hover, .nav-item.active {
  background: #f5f5f5;
  color: #2b2b38;
}

.nav-item.active {
  font-weight: 700;
  background: #eafcf9; /* Hopi rengi gibi soft bir ton */
  color: #00b9a3;
}
</style>