<template>
  <div class="menu-group">
    <h3 class="group-title" :class="{ 'text-red': isRed }">
      <a :href="link || '#'">{{ title }}</a>
    </h3>
    <ul class="link-list">
      <li v-for="(item, index) in items" :key="index">
        <a :href="item.link || '#'" :class="{ 'text-red': item.isRed }">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  isRed: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped>
.menu-group {
  display: flex;
  flex-direction: column;
}

.group-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2b2b38;
  line-height: 1.4;
}

.group-title a {
  text-decoration: none;
  color: inherit;
}

.group-title.text-red {
  color: #d91c2c;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-list li {
  margin-bottom: 6px;
}

.link-list li a {
  text-decoration: none;
  font-size: 13px;
  color: #595959;
  transition: color 0.2s;
  line-height: 1.3;
  display: block;
}

.link-list li a:hover {
  color: #000;
}

.link-list li a.text-red {
  color: #d91c2c;
}
</style>
