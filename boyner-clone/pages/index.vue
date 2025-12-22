<template>
  <div class="home-page">
    <OrganismsCarousel :items="bannerSlides" :auto-play="true" :interval="5000" />
    <OrganismsCampaignSection
      title="İçini Isıtacak Mont Koleksiyonumuzu Keşfet!"
      subtitle="Soğuk Havalar Kapıdayken..."
      :items="campaignData"
    />
  </div>
</template>

<script setup>


const bannerSlides = ref([
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop',
    title: 'Büyük İndirim',
    link: '/indirim'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    title: 'Yeni Sezon',
    link: '/yeni-sezon'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    title: 'Kozmetik',
    link: '/kozmetik'
  }
]);

const campaignData = ref([
  {
    image: 'https://images.unsplash.com/photo-1551488852-0801464c9960?w=600&q=80',
    price: '799',
    category: 'MEVSİMLİK CEKETLER',
    ctaText: 'Alışverişe Başla'
  },
  {
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80',
    price: '899',
    category: 'PUFFER MONTLAR',
    ctaText: 'İndirimleri Keşfet'
  },
  {
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
    price: '1.649',
    category: 'KABAN VE PALTOLAR',
    ctaText: 'Fırsatları Yakala'
  },
  {
    image: 'https://images.unsplash.com/photo-1551854838-255c971f4973?w=600&q=80',
    price: '1.999',
    category: 'OUTDOOR MONTLAR',
    ctaText: 'Acele Et'
  }
]);
</script>

<style scoped>
.home-page {
  padding: 20px;
  width: 100%;
}
</style>
