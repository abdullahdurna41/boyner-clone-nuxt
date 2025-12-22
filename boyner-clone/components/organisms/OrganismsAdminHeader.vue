<template>
  <header class="admin-header">
    <div class="header-left">
      <MoleculesSearchBar placeholder="Admin panelinde ara..." class="admin-search-bar" />
    </div>

    <div class="header-right">
      <button class="icon-btn">
        <AtomsAppIcon name="shield" :size="22" />
        <div class="badge-pos">
           <AtomsAppBadge variant="cart">3</AtomsAppBadge>
        </div>
      </button>

      <div class="user-area">
        <div class="user-info">
          <span class="name">Admin User</span>
          <span class="role">Süper Yönetici</span>
        </div>
        <AtomsAppButton variant="outline" size="small">Çıkış</AtomsAppButton>
      </div>
    </div>
  </header>
</template>

<script setup>
// Şimdilik script kısmı boş kalabilir veya ileride prop ekleyebiliriz.
</script>

<style scoped>
.admin-header {
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  /* Sidebar genişliği (260px) kadar soldan boşluk bırakıyoruz */
  width: calc(100% - 260px);
  margin-left: 260px;
  position: fixed;
  top: 0;
  z-index: 40;
}

.admin-search-bar {
  max-width: 400px;
  padding: 0 !important; 
}

.header-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.icon-btn {
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  padding: 5px;
  color: #2b2b38;
}

.badge-pos {
  position: absolute;
  top: -5px;
  right: -5px;
}

.user-area {
  display: flex;
  align-items: center;
  gap: 15px;
  border-left: 1px solid #eee;
  padding-left: 25px;
}

.user-info {
  text-align: right;
  line-height: 1.2;
}

.name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2b2b38;
}

.role {
  font-size: 11px;
  color: #999;
}

@media (max-width: 768px) {
  .admin-header {
    width: 100%;
    margin-left: 0;
    padding: 0 20px;
  }
  .user-info {
    display: none;
  }
}
</style>