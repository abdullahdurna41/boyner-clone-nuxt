<template>
  <div class="bottom-footer">
    <div class="container">
      <div class="bottom-flex">
        <p class="copyright">{{ copyrightText }}</p>
        <div class="legal-links">
          <template v-for="(link, index) in links" :key="index">
            <a :href="link.url">{{ link.text }}</a>
            <span v-if="index < links.length - 1" class="separator">|</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  copyrightText: {
    type: String,
    default: '© 2025 Boyner Büyük Mağazacılık A.Ş. Tüm Hakları Saklıdır.'
  },
  links: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.bottom-footer {
  background-color: #2c2c2c;
  padding: 25px 0;
  color: #999;
  font-size: 12px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.bottom-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-weight: 400;
}

.legal-links a {
  color: #999;
  text-decoration: none;
  transition: color 0.2s;
}

.legal-links a:hover {
  color: #fff;
}

.separator {
  margin: 0 10px;
  color: #555;
}

@media (max-width: 768px) {
  .bottom-flex {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
