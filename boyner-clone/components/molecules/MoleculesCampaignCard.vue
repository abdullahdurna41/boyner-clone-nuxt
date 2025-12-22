<template>
  <div class="campaign-card">
    <a :href="item.link || '#'" class="card-link">
      <div class="image-wrapper">
        <img :src="item.image" :alt="item.category" class="bg-image" />

        <div class="overlay-content">
          <div class="price-group">
            <span class="price-val">{{ item.price }} TL</span>
            <span class="price-suffix">'DEN<br>BAŞLAYAN</span>
          </div>

          <h3 class="category-name">{{ item.category }}</h3>

          <div class="event-badge">
            <div class="line-1"><span class="green">YILIN</span> <span class="white">OLAYI</span></div>
            <div class="line-2 white">BOYNER'DE!</div>
            <div class="line-3 red">KAÇIRMA!</div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        {{ item.ctaText }}
      </div>
    </a>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
    // { image, price, category, ctaText, link }
  }
});
</script>

<style scoped>
.campaign-card {
  cursor: pointer;
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4.2;
  overflow: hidden;
  border-radius: 2px;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.campaign-card:hover .bg-image {
  transform: scale(1.05);
}

.overlay-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 40px;
  text-align: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.price-group {
  color: #fff;
  line-height: 1;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-start;
  gap: 2px;
}

.price-val {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -1px;
}

.price-suffix {
  font-size: 10px;
  font-weight: 700;
  text-align: left;
  margin-top: 8px;
  line-height: 1.2;
}

.category-name {
  font-size: 24px;
  font-weight: 900;
  color: #e30613;
  text-transform: uppercase;
  margin-bottom: 20px;
  line-height: 1;
  transform: scaleY(1.1);
}

.event-badge {
  font-family: 'Arial Black', sans-serif;
  text-transform: uppercase;
  line-height: 0.9;
}

.line-1 {
  font-size: 18px;
  letter-spacing: -0.5px;
}

.line-1 .green {
  color: #d4ff00;
}

.line-1 .white {
  color: #fff;
}

.line-2 {
  font-size: 18px;
  color: #fff;
  letter-spacing: -0.5px;
}

.line-3 {
  font-size: 14px;
  color: #e30613;
  font-weight: 900;
  margin-top: 2px;
}

.card-footer {
  margin-top: 10px;
  font-size: 13px;
  color: #2b2b38;
  font-weight: 500;
}
</style>
