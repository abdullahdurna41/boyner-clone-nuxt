<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Gelen Mesajlar</h1>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th class="w-status">Durum</th>
            <th>Gönderen</th>
            <th>Konu</th>
            <th>Tarih</th>
            <th class="w-actions">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="msg in messages" :key="msg.id">
            <td>
              <AtomsAppBadge :variant="msg.status === 'new' ? 'warning' : 'success'">
                {{ msg.status === 'new' ? 'Okunmadı' : 'Okundu' }}
              </AtomsAppBadge>
            </td>
            <td>
              <div class="sender-name">{{ msg.name }}</div>
              <div class="sender-email">{{ msg.email }}</div>
            </td>
            <td>{{ msg.subject }}</td>
            <td>{{ msg.date }}</td>
            <td class="actions-cell">
              <div class="action-buttons">
                <AtomsAppButton size="small" variant="outline">
                  <AtomsAppIcon name="eye" :size="16" />
                  İncele
                </AtomsAppButton>
                <AtomsAppButton size="small" variant="secondary">
                  <AtomsAppIcon name="trash" :size="16" />
                </AtomsAppButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin' // layouts/admin.vue dosyasını kullanır
});

// Örnek veri
const messages = [
  { id: 1, status: 'new', name: 'Ahmet Yılmaz', email: 'ahmet@test.com', subject: 'Kargo Teslimatı', date: '22.12.2025' },
  { id: 2, status: 'read', name: 'Ayşe Kaya', email: 'ayse@test.com', subject: 'İade Talebi', date: '21.12.2025' },
  { id: 3, status: 'read', name: 'Mehmet Demir', email: 'mehmet@test.com', subject: 'Ürün Stok Bilgisi', date: '20.12.2025' },
];
</script>

<style scoped>
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #2b2b38;
  margin-bottom: 25px;
}

.table-container {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #f9f9f9;
  text-align: left;
  padding: 16px 24px;
  font-size: 12px;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  border-bottom: 1px solid #e5e5e5;
}

.data-table td {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  font-size: 14px;
  color: #2b2b38;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.w-status { width: 120px; }
.w-actions { width: 180px; text-align: right; }
.actions-cell { text-align: right; }

.sender-name { font-weight: 600; }
.sender-email { font-size: 12px; color: #999; margin-top: 2px; }

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>