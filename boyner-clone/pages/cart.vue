<template>
  <main class="cart-page">
    <div class="cart-container">
      
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <AtomsAppIcon name="bag" size="64" color="#ccc" />
        <h2>Sepetinizde ürün bulunmamaktadır.</h2>
        <NuxtLink to="/" class="start-shopping-btn">Alışverişe Başla</NuxtLink>
      </div>

      <template v-else>
        <div class="left-column">
          <h1 class="page-title">Sepetim <span class="count">({{ cartStore.totalItems }} Ürün)</span></h1>

          <OrganismsCartItemList
            :items="formattedItems"
            @increase-qty="handleIncrease"
            @decrease-qty="handleDecrease"
            @remove-item="handleRemove"
          />

          <OrganismsHopiBox
            text="Harcamaya Hazır Limit'inle Şimdi Al..."
            button-text="LİMİTİNİ ÖĞREN"
          />
        </div>

        <div class="right-column">
          <OrganismsOrderSummary
            :subtotal="cartStore.subTotal"
            :shipping="cartStore.shippingCost"
            :total="cartStore.totalAmount"
            @checkout="handleCheckout"
          />
        </div>
      </template>
      <div>
    <OrganismsSimilarProductsSlider 
      title="Bunları da Beğenebilirsiniz" 
      :products="similarProducts" 
    />
  </div>

    </div>
  </main>
</template>

<script setup>
  const similarProducts = [
  { 
    id: 101, 
    name: 'Slim Fit Gömlek', 
    brand: 'Fabrika', 
    price: 899.99, 
    image: 'https://statics-mp.boyner.com.tr/mnresize/1100/-/Boynerimages/5000036364_200_01.jpg?v=579763', 
    discountText: '%20 İndirim' 
  },
  { 
    id: 102, 
    name: 'Keten Pantolon', 
    brand: 'Network', 
    price: 1200.00, 
    image: 'https://statics-mp.boyner.com.tr/mnresize/1100/-/Boynerimages/5000036364_200_01.jpg?v=579763' 
  },
  // ... diğer ürünler
];
const cartStore = useCartStore()

// Mapping işlemi (Store verisini arayüze uydurma)
const formattedItems = computed(() => {
  return cartStore.items.map(item => ({
    id: item.product.id,
    brand: item.product.brand || 'Marka',
    name: item.product.name,
    image: item.product.images?.[0] || '/placeholder.jpg',
    price: item.product.price,
    oldPrice: item.product.oldPrice,
    quantity: item.quantity,
    variant: 'Standart'
  }))
})

// --- AKSİYONLAR ---
const handleIncrease = (item) => cartStore.updateQuantity(item.id, item.quantity + 1)
const handleDecrease = (item) => {
  if (item.quantity > 1) cartStore.updateQuantity(item.id, item.quantity - 1)
}
const handleRemove = (item) => cartStore.removeItem(item.id)

const handleCheckout = () => {
  cartStore.checkout()
}
</script>

<style scoped>
.cart-page { background: #fff; padding-bottom: 100px; font-family: 'Jost', sans-serif; }
.cart-container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; display: grid; grid-template-columns: 2fr 1fr; gap: 30px; align-items: start; }
.page-title { font-size: 24px; font-weight: 600; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
.page-title .count { font-size: 16px; font-weight: 400; color: #666; }

/* Boş Sepet */
.empty-cart { 
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 80px 20px; grid-column: 1 / -1; background-color: #f9f9f9; border-radius: 8px; 
}
.empty-cart h2 { font-size: 20px; margin: 20px 0; color: #333; }
.start-shopping-btn { 
  background: #2b2b38; color: white; padding: 14px 40px; border-radius: 4px; 
  text-decoration: none; font-weight: 600; transition: background 0.3s; 
}
.start-shopping-btn:hover { background: #000; }

@media (max-width: 992px) { .cart-container { grid-template-columns: 1fr; } }
</style>