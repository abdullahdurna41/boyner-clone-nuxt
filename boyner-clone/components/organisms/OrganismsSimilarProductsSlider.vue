<template>
  <div class="similar-products-wrapper" v-if="products.length > 0">
    <div class="section-header">
      <h3 class="title">{{ title }}</h3>
    </div>

    <div class="slider-container">
      
      <button 
        v-show="canScrollLeft" 
        class="nav-btn prev" 
        @click="scroll('left')"
        aria-label="Önceki"
      >
        <AtomsAppIcon name="chevron-left" :size="24" color="#2b2b38" />
      </button>

      <div 
        class="products-scroll-area" 
        ref="scrollContainer"
        @scroll="checkScroll"
      >
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-item"
        >
          <MoleculesProductCard 
            :product="product" 
            @click="$emit('product-click', product)"
            @toggle-fav="$emit('toggle-fav', product)"
          />
        </div>
      </div>

      <button 
        v-show="canScrollRight" 
        class="nav-btn next" 
        @click="scroll('right')"
        aria-label="Sonraki"
      >
        <AtomsAppIcon name="chevron-right" :size="24" color="#2b2b38" />
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Buna Benzer Ürünler'
  },
  products: {
    type: Array,
    default: () => []
  }
});

defineEmits(['product-click', 'toggle-fav']);

// --- Scroll Mantığı ---
const scrollContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const checkScroll = () => {
  const el = scrollContainer.value;
  if (!el) return;
  
  // Sol sınırda mıyız?
  canScrollLeft.value = el.scrollLeft > 0;
  
  // Sağ sınırda mıyız? (1px tolerans)
  canScrollRight.value = Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth;
};

const scroll = (direction) => {
  const el = scrollContainer.value;
  if (!el) return;

  // Bir kerede kaydırılacak mesafe (yaklaşık bir kart + boşluk)
  const scrollAmount = 300; 
  
  el.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
};

// Pencere boyutu değişirse okları tekrar kontrol et
let resizeObserver = null;

onMounted(() => {
  checkScroll();
  if (scrollContainer.value) {
    // Resize Observer ile container boyutu değişimini dinle
    resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(scrollContainer.value);
  }
});

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<style scoped>
.similar-products-wrapper {
  margin: 40px 0;
  width: 100%;
}

.section-header {
  margin-bottom: 20px;
  padding: 0 5px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #2b2b38;
}

.slider-container {
  position: relative;
  display: flex;
  align-items: center;
}

.products-scroll-area {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 5px; /* Kart gölgeleri kesilmesin diye padding */
  width: 100%;
  
  /* Scrollbar'ı gizle */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.products-scroll-area::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}

.product-item {
  flex: 0 0 240px; /* Her kartın genişliği sabit */
  /* Mobilde daha dar olabilir */
}

/* Navigasyon Butonları */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
}

.nav-btn:hover {
  border-color: #2b2b38;
  transform: translateY(-50%) scale(1.05);
}

.prev {
  left: -22px;
}

.next {
  right: -22px;
}

/* Responsive Ayarlar */
@media (max-width: 768px) {
  .product-item {
    flex: 0 0 160px; /* Mobilde kartlar daha küçük */
  }

  .nav-btn {
    display: none; /* Mobilde dokunmatik kaydırma yeterli, okları gizle */
  }
  
  .prev, .next {
    display: none;
  }
  
  .similar-products-wrapper {
    margin: 20px 0;
  }
}
</style>