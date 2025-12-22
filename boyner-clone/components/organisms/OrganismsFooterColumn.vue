<template>
  <div class="footer-column">
    <h4 class="col-title">{{ column.title }}</h4>

    <ul class="link-list">
      <li v-for="(link, lIndex) in column.links" :key="lIndex">
        <a :href="link.url || '#'">{{ link.text }}</a>
      </li>
    </ul>

    <!-- ETBIS -->
    <div v-if="column.hasEtbis" class="etbis-box">
      <div class="etbis-img-placeholder">
        <img src="https://cdn.dsmcdn.com/web/production/etbis-qr.png" alt="ETBIS" />
      </div>
    </div>

    <!-- Yardım Bölümü -->
    <div v-if="column.isHelp" class="help-extras">
      <div class="phones">
        <a href="tel:4442967">444 29 67</a>
        <a href="tel:08508002967">0850 800 29 67</a>
      </div>

      <div class="quick-links">
        <a href="#">KOLAY İADE</a>
        <a href="#">SİPARİŞ TAKİBİ</a>
      </div>

      <MoleculesSocialIcons />
    </div>

    <!-- Mobil Uygulamalar -->
    <div v-if="column.isApp" class="app-section">
      <MoleculesStoreButtons />
    </div>
  </div>
</template>

<script setup>


defineProps({
  column: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.footer-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.col-title {
  font-size: 13px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 15px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-list li {
  margin-bottom: 8px;
}

.link-list li a {
  font-size: 12px;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.link-list li a:hover {
  color: #000;
}

/* ETBIS */
.etbis-box {
  margin-top: 20px;
}

.etbis-img-placeholder img {
  width: 100px;
  height: auto;
}

/* Yardım Bölümü */
.help-extras {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
}

.phones {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.phones a {
  font-size: 18px;
  font-weight: 700;
  color: #000;
  text-decoration: none;
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.quick-links a {
  font-size: 12px;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  text-transform: uppercase;
}
</style>
