<template>
  <div class="admin-products">
    <h1 class="page-title">Ürün Yönetim Paneli (Çoklu Resim)</h1>

    <div class="content-wrapper">
      
      <div class="form-card">
        <h3 :class="{ 'text-blue': isEditing }">
          {{ isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle' }}
        </h3>
        
        <form @submit.prevent="handleSave" class="product-form">
          
          <div class="form-group">
            <label>Ürün Adı</label>
            <input v-model="form.name" type="text" placeholder="Örn: Mavi Gömlek" required />
          </div>

          <div class="form-group">
            <label>Marka</label>
            <input v-model="form.brand" type="text" placeholder="Örn: Mavi" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Fiyat (TL)</label>
              <input v-model.number="form.price" type="number" placeholder="0.00" required />
            </div>
            <div class="form-group">
              <label>Eski Fiyat</label>
              <input v-model.number="form.oldPrice" type="number" placeholder="0.00" />
            </div>
          </div>

          <div class="form-group image-manager">
            <label>Ürün Resimleri ({{ form.images.length }} Adet)</label>
            
            <div class="image-input-group">
              <input 
                v-model="tempImageUrl" 
                type="text" 
                placeholder="https://... (Enter'a bas)" 
                @keyup.enter.prevent="addImage"
              />
              <button type="button" @click="addImage" class="add-img-btn">EKLE (+)</button>
            </div>

            <div v-if="form.images.length > 0" class="image-preview-list">
              <div v-for="(img, index) in form.images" :key="index" class="img-item">
                <img :src="img" />
                <button type="button" @click="removeImage(index)" class="remove-img-btn">X</button>
              </div>
            </div>
            <small v-else class="hint">Henüz resim eklenmedi.</small>
          </div>
          <div class="form-group">
            <label>Kategori</label>
            <select v-model="form.category" required>
              <option value="" disabled>Seçiniz...</option>
              <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Rozet</label>
            <select v-model="form.badge">
              <option value="">Yok</option>
              <option value="Yeni Sezon">Yeni Sezon</option>
              <option value="%20 İndirim">%20 İndirim</option>
              <option value="Hızlı Kargo">Hızlı Kargo</option>
            </select>
          </div>

          <div class="action-buttons">
            <button 
              type="submit" 
              class="save-btn" 
              :class="{ 'update-btn': isEditing }"
              :disabled="productStore.loading"
            >
              {{ productStore.loading ? 'İşleniyor...' : (isEditing ? 'GÜNCELLE' : 'KAYDET') }}
            </button>

            <button v-if="isEditing" type="button" class="cancel-btn" @click="cancelEdit">
              İPTAL
            </button>
          </div>

        </form>
      </div>

      <div class="list-card">
        <div class="list-header">
          <h3>Mevcut Ürünler</h3>
          <span class="badge">{{ productStore.products.length }} Adet</span>
        </div>
        
        <div v-if="productStore.loading && !isEditing" class="loading">Yükleniyor...</div>
        
        <div v-else class="product-list">
          <div v-for="product in productStore.products" :key="product.id" class="product-item">
            <img 
              :src="product.images?.[0] || 'https://via.placeholder.com/50'" 
              class="thumb" 
            />
            
            <div class="info">
              <strong>{{ product.name }}</strong>
              <div class="sub-info">
                <span>{{ product.price }} TL</span>
                <span class="category-tag">{{ product.category }}</span>
              </div>
            </div>

            <div class="item-actions">
              <button @click="startEdit(product)" class="edit-btn">Düzenle</button>
              <button @click="handleDelete(product.id)" class="delete-btn">Sil</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const isEditing = ref(false)
const editingId = ref(null)

// Resim eklemek için geçici değişken
const tempImageUrl = ref('')

const form = reactive({
  name: '',
  brand: '',
  price: null,
  oldPrice: null,
  images: [], // ARTIK ARRAY (DİZİ)
  category: '',
  badge: 'Yeni Sezon'
})

onMounted(() => {
  productStore.fetchProducts()
  categoryStore.fetchCategories()
})

// --- RESİM FONKSİYONLARI ---
const addImage = () => {
  if (tempImageUrl.value.trim()) {
    form.images.push(tempImageUrl.value.trim())
    tempImageUrl.value = '' // Kutuyu temizle
  }
}

const removeImage = (index) => {
  form.images.splice(index, 1)
}
// ---------------------------

const handleSave = async () => {
  // En az 1 resim uyarısı
  if (form.images.length === 0) {
    alert('Lütfen en az bir resim ekleyin.')
    return
  }

  const productData = {
    name: form.name,
    brand: form.brand,
    price: form.price,
    oldPrice: form.oldPrice,
    category: form.category,
    badge: form.badge,
    images: form.images, // Dizi olarak gönderiyoruz
    specs: [],
    isActive: true
  }

  if (isEditing.value) {
    const success = await productStore.updateProduct(editingId.value, productData)
    if (success) {
      alert('Ürün güncellendi!')
      cancelEdit()
    }
  } else {
    const success = await productStore.addProduct(productData)
    if (success) {
      alert('Ürün eklendi!')
      resetForm()
    }
  }
}

const handleDelete = async (id) => {
  if (confirm('Silmek istediğine emin misin?')) {
    await productStore.deleteProduct(id)
    if (editingId.value === id) cancelEdit()
  }
}

const startEdit = (product) => {
  isEditing.value = true
  editingId.value = product.id
  
  form.name = product.name
  form.brand = product.brand
  form.price = product.price
  form.oldPrice = product.oldPrice
  form.category = product.category || ''
  form.badge = product.badge || ''
  
  // Mevcut resimleri al (Yoksa boş dizi)
  form.images = product.images ? [...product.images] : [] 
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  isEditing.value = false
  editingId.value = null
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.brand = ''
  form.price = null
  form.oldPrice = null
  form.images = [] // Listeyi temizle
  form.badge = 'Yeni Sezon'
  tempImageUrl.value = ''
}
</script>

<style scoped>
/* Genel Stiller */
.admin-products { padding: 20px; font-family: 'Jost', sans-serif; }
.content-wrapper { display: grid; grid-template-columns: 1fr 1.2fr; gap: 30px; align-items: start; }
.form-card, .list-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }

h3 { margin-bottom: 20px; border-bottom: 2px solid #f5f5f5; padding-bottom: 10px; }
.text-blue { color: #007bff; border-bottom-color: #007bff; }

/* Inputlar */
.product-form { display: flex; flex-direction: column; gap: 15px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-row { display: flex; gap: 15px; }
.form-row .form-group { flex: 1; }
label { font-size: 13px; font-weight: 600; color: #666; }
input, select { padding: 12px; border: 1px solid #e0e0e0; border-radius: 6px; }
input:focus, select:focus { border-color: #2b2b38; outline: none; }

/* --- YENİ RESİM YÖNETİMİ STİLLERİ --- */
.image-input-group { display: flex; gap: 10px; }
.image-input-group input { flex: 1; }
.add-img-btn { background: #28a745; color: white; border: none; padding: 0 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
.add-img-btn:hover { background: #218838; }

.image-preview-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; padding: 10px; background: #f9f9f9; border-radius: 6px; }
.img-item { position: relative; width: 60px; height: 60px; }
.img-item img { width: 100%; height: 100%; object-fit: cover; border-radius: 4px; border: 1px solid #ddd; }
.remove-img-btn { position: absolute; top: -5px; right: -5px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.hint { font-size: 11px; color: #999; font-style: italic; }
/* ------------------------------------ */

.action-buttons { display: flex; gap: 10px; margin-top: 10px; }
.save-btn { flex: 2; background: #2b2b38; color: white; padding: 14px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
.save-btn:hover { background: #000; }
.update-btn { background: #007bff; }
.cancel-btn { flex: 1; background: #fff; border: 1px solid #ccc; color: #555; border-radius: 6px; font-weight: 600; cursor: pointer; }

/* Liste */
.list-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #f5f5f5; padding-bottom: 10px; }
.badge { background: #eee; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
.product-list { max-height: 600px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.product-item { display: flex; align-items: center; gap: 15px; padding: 12px; background: #fff; border: 1px solid #f0f0f0; border-radius: 8px; }
.thumb { width: 60px; height: 60px; object-fit: cover; border-radius: 6px; }
.info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.sub-info { display: flex; gap: 10px; font-size: 12px; color: #666; }
.item-actions button { margin-left: 5px; padding: 6px 10px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
.edit-btn { background: #e3f2fd; color: #0d47a1; }
.delete-btn { background: #ffebee; color: #c62828; }

@media (max-width: 900px) { .content-wrapper { grid-template-columns: 1fr; } }
</style>