<template>
  <div>
    <h1 class="page-title">Dashboard</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="icon-box blue-bg">
          <AtomsAppIcon name="bag" :size="24" color="#2b38d1" />
        </div>
        <div class="stat-info">
          <span class="stat-label">Toplam Ciro</span>
          <AtomsPriceDisplay :price="452950.00" size="medium" />
        </div>
      </div>

      <div class="stat-card">
        <div class="icon-box orange-bg">
          <AtomsAppIcon name="truck" :size="24" color="#e87e04" />
        </div>
        <div class="stat-info">
          <span class="stat-label">Toplam Sipariş</span>
          <span class="stat-value">1,245</span>
        </div>
      </div>

      <div class="stat-card clickable" @click="$router.push('/admin/contact')">
        <div class="icon-box green-bg">
          <AtomsAppIcon name="user" :size="24" color="#00b9a3" />
        </div>
        <div class="stat-info">
          <span class="stat-label">Okunmamış Mesaj</span>
          <span class="stat-value">3</span>
        </div>
        <div class="hover-arrow">
           <AtomsAppIcon name="chevron-right" :size="16" color="#999" />
        </div>
      </div>
    </div>

    <div class="dashboard-bottom">
      
      <div class="section-card">
        <h3 class="section-title">Hızlı İşlemler</h3>
        <div class="actions-flex">
          <AtomsAppButton variant="primary" size="medium">
            <template #default>
              <AtomsAppIcon name="plus" :size="18" />
              Yeni Ürün Ekle
            </template>
          </AtomsAppButton>

          <AtomsAppButton variant="outline" size="medium">
            <template #default>
              <AtomsAppIcon name="search" :size="18" />
              Sipariş Sorgula
            </template>
          </AtomsAppButton>
        </div>
      </div>

      <div class="section-card">
        <h3 class="section-title">Sistem Durumu</h3>
        <div class="system-status">
          <div class="status-item">
            <AtomsAppIcon name="check-circle" :size="16" color="#00b9a3" />
            <span>Veritabanı Bağlantısı Aktif</span>
          </div>
          <div class="status-item">
            <AtomsAppIcon name="check-circle" :size="16" color="#00b9a3" />
            <span>Ödeme Sistemleri Çalışıyor</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin' // layouts/admin.vue dosyasını kullanır
});
</script>

<style scoped>
.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #2b2b38;
  margin-bottom: 30px;
}

/* KARTLARIN GRID YAPISI */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.stat-card.clickable {
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.icon-box {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* İkon Arka Plan Renkleri (Opaklık azaltılmış) */
.blue-bg { background-color: rgba(43, 56, 209, 0.1); }
.orange-bg { background-color: rgba(232, 126, 4, 0.1); }
.green-bg { background-color: rgba(0, 185, 163, 0.1); }

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #2b2b38;
}

.hover-arrow {
  position: absolute;
  right: 20px;
  opacity: 0.5;
}

/* ALT BÖLÜM */
.dashboard-bottom {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.section-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #2b2b38;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.actions-flex {
  display: flex;
  gap: 15px;
}

.system-status {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #2b2b38;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard-bottom {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .actions-flex {
    flex-direction: column;
  }
}
</style>