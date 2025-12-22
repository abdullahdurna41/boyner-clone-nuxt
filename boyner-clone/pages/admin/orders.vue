<template>
  <div class="admin-orders">
    <h1 class="page-title">Sipariş Yönetimi</h1>

    <div v-if="orderStore.loading" class="loading">
      Siparişler yükleniyor...
    </div>

    <div v-else-if="orderStore.error" class="error">
      {{ orderStore.error }}
    </div>

    <div v-else class="table-container">
      <table class="order-table">
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Müşteri</th>
            <th>Tutar</th>
            <th>Tarih</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderStore.orders" :key="order.id">
            <td>#{{ order.id?.slice(-6) }}</td>
            
            <td>
              <div class="user-info">
                <span>{{ order.userEmail }}</span>
                <small>{{ order.items.length }} Ürün</small>
              </div>
            </td>
            
            <td class="price">{{ order.totalAmount.toLocaleString('tr-TR') }} TL</td>
            
            <td>{{ formatDate(order.createdAt) }}</td>
            
            <td>
              <span :class="['badge', order.status]">
                {{ getStatusLabel(order.status) }}
              </span>
            </td>
            
            <td>
              <select 
                :value="order.status" 
                @change="(e) => handleStatusChange(order.id, e.target.value)"
                class="status-select"
              >
                <option value="hazirlaniyor">Hazırlanıyor</option>
                <option value="kargoda">Kargoda</option>
                <option value="teslim-edildi">Teslim Edildi</option>
                <option value="iptal">İptal</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Admin layout kullan
definePageMeta({
  layout: 'admin'
})

const orderStore = useOrderStore()

// Sayfa açılınca tüm siparişleri çek
onMounted(() => {
  orderStore.fetchAllOrders()
})

// Durum güncelleme işlemi
const handleStatusChange = async (orderId, newStatus) => {
  const success = await orderStore.updateOrderStatus(orderId, newStatus)
  if (success) {
    // İstersen toast mesajı ekle
    console.log('Durum güncellendi')
  }
}

// Tarih Formatlama Yardımcısı
const formatDate = (date) => {
  if (!date) return '-'
  // Firebase Timestamp gelirse Date'e çevirmek gerekebilir ama Store'da halletmiştik
  return new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long', 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

// Durum Yazılarını Türkçeleştirme
const getStatusLabel = (status) => {
  const map = {
    'hazirlaniyor': 'Hazırlanıyor',
    'kargoda': 'Kargoda',
    'teslim-edildi': 'Teslim Edildi',
    'iptal': 'İptal Edildi'
  }
  return map[status] || status
}
</script>

<style scoped>
.admin-orders {
  padding: 20px;
  font-family: 'Jost', sans-serif;
}

.page-title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  color: #2b2b38;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow-x: auto;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.order-table th {
  background: #f8f9fa;
  padding: 16px;
  font-weight: 600;
  color: #666;
  border-bottom: 2px solid #eee;
}

.order-table td {
  padding: 16px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info small {
  color: #999;
  font-size: 12px;
}

.price {
  font-weight: 600;
}

/* Durum Rozetleri */
.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.badge.hazirlaniyor { background: #fff3cd; color: #856404; }
.badge.kargoda { background: #cce5ff; color: #004085; }
.badge.teslim-edildi { background: #d4edda; color: #155724; }
.badge.iptal { background: #f8d7da; color: #721c24; }

/* Select Box */
.status-select {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.loading, .error {
  padding: 20px;
  text-align: center;
  font-size: 16px;
}
.error { color: red; }
</style>