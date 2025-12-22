<template>
  <li class="breadcrumb-item">
    <a v-if="link && !active" :href="link" class="breadcrumb-link">
      {{ text }}
    </a>
    <span v-else class="current">{{ text }}</span>
    <span v-if="showSeparator" class="separator" aria-hidden="true">/</span>
  </li>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
  showSeparator: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  text-decoration: none;
  color: #666;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #000;
}

.separator {
  margin: 0 8px;
  color: #ccc;
  font-size: 12px;
}

.current {
  font-weight: 500;
  color: #2b2b38;
}
</style>
