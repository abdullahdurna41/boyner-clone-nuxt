<template>
  <div class="app-container">
    
    <div class="header-wrapper">
      
      <OrganismsHeaderMain :cart-count="cartCount" />
      
      <OrganismsHeaderNav 
        :menu-items="headerLinks" 
        :mega-menu-data="megaMenuData" 
        :is-hidden="isNavHidden"
      />
    </div>

    <div class="main-content">
      <slot />
    </div>
    
    <OrganismsFooterMain :columns="footerData" />
    <OrganismsFooterBottom :links="bottomLinks" :copyright="copyrightText" />
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Sepet sayısı (İleride Pinia store'dan gelecek, şimdilik sabit)
const cartCount = ref(0);

// --- HEADER MENÜ VERİLERİ ---
const headerLinks = [
  { title: 'KADIN' },
  { title: 'ERKEK' },
  { title: 'AYAKKABI & ÇANTA' },
  { title: 'SPOR & OUTDOOR' },
  { title: 'ÇOCUK' },
  { title: 'KOZMETİK' },
  { title: 'SAAT & AKSESUAR' },
  { title: 'EV & YAŞAM & ELEKTRONİK' },
  { title: 'MARKALAR' },
  { title: 'OUTLET' },
  { title: 'KAMPANYALAR', isCampaign: true }
];

// --- MEGA MENÜ VERİLERİ ---
const megaMenuData = {
  'KADIN': {
    columns: [
      [
        { title: 'Olay Ürünler', isRed: true, items: [] },
        { title: 'Olay Sürprizler', isRed: true, items: [{ text: 'İndirim Balonu' }, { text: 'Eşle Kazan' }] }
      ],
      [{ title: 'Giyim', items: [{ text: 'Elbise' }, { text: 'Gömlek' }] }]
    ],
    banners: [
      { image: 'https://images.unsplash.com/photo-1550614000-4b9519e02139?w=400', text: '% 50 İndirim' }
    ]
  }
};

// --- FOOTER VERİLERİ ---
const footerData = [
  {
    title: 'BOYNER',
    hasEtbis: true,
    links: [
      { text: 'Kurumsal', url: '#' },
      { text: 'Mağazalar', url: '#' },
      { text: 'Sosyal Sorumluluk', url: '#' },
      { text: 'Kariyer', url: '#' },
      { text: 'Kurumsal Satış', url: '#' },
      { text: 'Toplu Satış', url: '#' },
      { text: 'Satıcılar', url: '#' },
      { text: 'Bilgi Güvenliği Politikası', url: '#' }
    ]
  },
  {
    title: 'KATEGORİLER',
    links: [
      { text: 'Kadın', url: '#' },
      { text: 'Erkek', url: '#' },
      { text: 'Çocuk', url: '#' },
      { text: 'Spor & Outdoor', url: '#' },
      { text: 'Kozmetik', url: '#' },
      { text: 'Ev & Yaşam & Elektronik', url: '#' },
      { text: 'Erkek Ayakkabı', url: '#' },
      { text: 'Erkek Parfüm', url: '#' },
      { text: 'Çocuk Ayakkabı', url: '#' },
      { text: 'Kadın Parfüm', url: '#' },
      { text: 'Kadın Çanta', url: '#' },
      { text: 'Kadın Spor Ayakkabı', url: '#' },
      { text: 'Ayakkabı & Çanta', url: '#' },
      { text: 'Kadın Topuklu Ayakkabı', url: '#' },
      { text: 'Erkek Pantolon', url: '#' }
    ]
  },
  {
    title: 'MARKALAR',
    links: [
      { text: 'Adidas', url: '#' },
      { text: 'Tommy Hilfiger', url: '#' },
      { text: 'Skechers', url: '#' },
      { text: 'Calvin Klein', url: '#' },
      { text: 'Nike', url: '#' },
      { text: 'Fabrika', url: '#' },
      { text: 'New Balance', url: '#' },
      { text: 'Converse', url: '#' },
      { text: 'Guess', url: '#' },
      { text: 'Helly Hansen', url: '#' },
      { text: 'Asics', url: '#' },
      { text: 'Puma', url: '#' },
      { text: 'Vans', url: '#' },
      { text: 'Mavi', url: '#' },
      { text: 'Ugg', url: '#' }
    ]
  },
  {
    title: 'ÖZEL SAYFALAR',
    links: [
      { text: 'Babalar Günü', url: '#' },
      { text: 'Sevgililer Günü', url: '#' },
      { text: 'Boyner NOW', url: '#' },
      { text: 'Outlet', url: '#' },
      { text: 'Anneler Günü', url: '#' },
      { text: 'Kelebek', url: '#' },
      { text: '11.11', url: '#' },
      { text: 'Black Friday', url: '#' },
      { text: 'Yılbaşı', url: '#' },
      { text: 'Okula Dönüş', url: '#' },
      { text: 'Hediye Önerileri', url: '#' },
      { text: 'Öğretmenler Günü', url: '#' },
      { text: 'Doğum Günü', url: '#' },
      { text: 'Ev Hediyeleri', url: '#' },
      { text: 'Düğün & Abiye Elbise', url: '#' }
    ]
  },
  {
    title: 'YARDIM',
    isHelp: true,
    links: [
      { text: 'Bize Ulaşın', url: '#' },
      { text: 'İşlem Rehberi Ve Sıkça Sorulan Sorular', url: '#' },
      { text: 'Müşteri Hizmetleri', url: '#' },
      { text: 'Kampanyalar', url: '#' }
    ]
  },
  {
    title: 'MOBİL UYGULAMALAR',
    isApp: true,
    links: []
  }
];

const copyrightText = '© 2025 Boyner Büyük Mağazacılık A.Ş. Tüm Hakları Saklıdır.';

const bottomLinks = [
  { text: 'Gizlilik Politikası', url: '#' },
  { text: 'Çerez Politikası', url: '#' },
  { text: 'Kullanım Koşulları', url: '#' },
  { text: 'KVKK', url: '#' }
];

// --- SCROLL MANTIĞI (Navbar Gizleme) ---
const isNavHidden = ref(false);
let lastScrollTop = 0;

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Aşağı kaydırıyorsa ve 50px'den fazla indiyse Nav'ı gizle
  if (scrollTop > lastScrollTop && scrollTop > 50) {
    isNavHidden.value = true;
  } 
  // Yukarı kaydırıyorsa Nav'ı geri aç
  else if (scrollTop < lastScrollTop) {
    isNavHidden.value = false;
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* --- İŞTE SİHİRLİ KISIM --- */
.header-wrapper {
  position: sticky; /* Yapışkan özellik */
  top: 0;           /* En tepeye yapış */
  z-index: 1000;    /* Diğer her şeyin üstünde olsun */
  background-color: white; /* Sayfa kayarken arkası şeffaf olmasın */
  width: 100%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05); /* Hafif gölge */
}

.main-content {
  flex: 1;
}
</style>