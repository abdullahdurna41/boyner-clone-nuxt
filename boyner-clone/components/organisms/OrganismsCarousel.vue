<template>
  <div class="boyner-carousel-wrapper">
    <div class="main-slider" @mouseenter="pauseAutoPlay" @mouseleave="startAutoPlay">
      <div class="slides-container" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(slide, index) in items" :key="index" class="slide-item">
          <a :href="slide.link || '#'" class="slide-link">
            <img :src="slide.image" :alt="slide.title" class="slide-image" />
          </a>
        </div>
      </div>

      <button class="nav-btn prev" @click="prevSlide" v-show="items.length > 1">
        <AtomsAppIcon name="chevron-left" />
      </button>
      <button class="nav-btn next" @click="nextSlide" v-show="items.length > 1">
        <AtomsAppIcon name="chevron-right" />
      </button>

      <div class="custom-pagination">
        <span class="page-number current">{{ formatNumber(currentIndex + 1) }}</span>
        <AtomsProgressBar :percentage="progressWidth" />
        <span class="page-number total">{{ formatNumber(items.length) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000
  }
});

const currentIndex = ref(0);
let timer = null;

const progressWidth = computed(() => {
  if (props.items.length === 0) return 0;
  return ((currentIndex.value + 1) / props.items.length) * 100;
});

const formatNumber = (num) => {
  return num < 10 ? `0${num}` : num;
};

const nextSlide = () => {
  if (currentIndex.value === props.items.length - 1) {
    currentIndex.value = 0;
  } else {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = props.items.length - 1;
  } else {
    currentIndex.value--;
  }
};

const startAutoPlay = () => {
  if (props.autoPlay && props.items.length > 1) {
    timer = setInterval(nextSlide, props.interval);
  }
};

const pauseAutoPlay = () => {
  if (timer) clearInterval(timer);
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  pauseAutoPlay();
});
</script>

<style scoped>
.boyner-carousel-wrapper {
  width: 100%;
  max-width: 1400px;
  margin: 20px auto;
  padding: 0 20px;
  box-sizing: border-box;
  font-family: 'Inter', system-ui, sans-serif;
}

.main-slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 6;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.slides-container {
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out;
}

.slide-item {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-link {
  display: block;
  width: 100%;
  height: 100%;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  transition: all 0.3s ease;
  z-index: 10;
  opacity: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.main-slider:hover .nav-btn {
  opacity: 1;
}

.nav-btn:hover {
  background: white;
  color: #000;
  transform: translateY(-50%) scale(1.05);
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.custom-pagination {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 20px;
  border-radius: 30px;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.page-number {
  font-size: 13px;
  font-weight: 700;
  color: #111;
  min-width: 18px;
  text-align: center;
}

@media (max-width: 768px) {
  .boyner-carousel-wrapper {
    padding: 0 15px;
    margin: 10px auto;
  }

  .nav-btn {
    opacity: 1;
    width: 36px;
    height: 36px;
  }

  .main-slider {
    aspect-ratio: 4/3;
    border-radius: 6px;
  }
}
</style>
