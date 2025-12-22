<template>
  <main class="product-page">
    <div class="container">
      
      <div v-if="productStore.loading" class="loading-state">
        <p>Ürün bilgileri getiriliyor...</p>
      </div>

      <div v-else-if="!productStore.currentProduct && !productStore.loading" class="error-state">
        <h2>Ürün Bulunamadı</h2>
        <p>Aradığınız ürün silinmiş veya yayından kaldırılmış olabilir.</p>
        <NuxtLink to="/" class="back-btn">Anasayfaya Dön</NuxtLink>
      </div>

      <div v-else class="content-wrapper">
        <OrganismsBreadcrumb :paths="breadcrumbPaths" />

        <div class="product-grid">
          <OrganismsProductGallery 
            :images="formattedProduct.images" 
            :badge="formattedProduct.badge" 
          />
          
          <OrganismsProductInfo 
            :product="formattedProduct" 
            @add-to-cart="handleAddToCart" 
          />
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

// URL'deki ID'yi al (Örn: /product/abc12345 -> 'abc12345')
const productId = route.params.id

// Sayfa açılınca Firebase'den veriyi çek
onMounted(async () => {
  await productStore.fetchProductById(productId)
})

// Store'dan gelen ham veriyi, bileşenlerin istediği formata çevir (Mapping)
const formattedProduct = computed(() => {
  const p = productStore.currentProduct
  
  if (!p) return {} // Veri henüz gelmediyse boş obje dön

  return {
    id: p.id,
    brand: p.brand || 'Marka Belirtilmedi',
    name: p.name || 'İsimsiz Ürün',
    seller: 'BOYNER', // Firebase'de yoksa sabit yazabilirsin
    sellerScore: '9.8',
    price: p.price,
    oldPrice: p.oldPrice || (p.price * 1.2), // Yoksa %20 fazlasını uydur
    discountRate: p.discountRate || 0,
    badge: p.badge || 'Yeni Sezon',
    reviewCount: 0,
    rating: 0,
    // Resim yoksa placeholder koy
    images: (p.images && p.images.length > 0) 
      ? p.images 
      : ['https://via.placeholder.com/600x800?text=Resim+Yok'],
    
    // Özellikler (Firebase'de specs dizisi varsa al, yoksa standart yaz)
    specs: p.specs || [
      { label: 'Kumaş Bilgisi', value: '%100 Pamuk' },
      { label: 'Menşei', value: 'Türkiye' }
    ],
    
    description: p.description || 'Ürün açıklaması bulunmuyor.'
  }
})

// Breadcrumb (Yol Haritası) Dinamik Yapımı
const breadcrumbPaths = computed(() => [
  { text: 'Anasayfa', link: '/' },
  { text: 'Ürünler', link: '/' },
  { text: formattedProduct.value.name || 'Ürün Detayı', active: true }
])

// Sepete Ekleme Fonksiyonu
const handleAddToCart = () => {
  if (formattedProduct.value.id) {
    cartStore.addToCart(formattedProduct.value)
  }
}
</script>

<style scoped>
.product-page {
  background: #fff;
  padding-bottom: 100px;
  font-family: 'Jost', sans-serif;
  min-height: 60vh; /* Sayfa çok boş durmasın */
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* Yükleniyor ve Hata Alanları */
.loading-state, .error-state {
  text-align: center;
  padding: 100px 0;
}

.error-state h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.back-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #2b2b38;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

@media (max-width: 992px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>