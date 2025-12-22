<template>
  <li @mouseenter="$emit('mouseenter')">
    <a 
      :href="href" 
      class="nav-link" 
      :class="{ 'campaign': isCampaign, 'active': isActive }"
    >
      {{ title }}
    </a>
  </li>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  href: {
    type: String,
    default: '#'
  },
  isCampaign: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

defineEmits(['mouseenter']);
</script>

<style scoped>
.nav-link {
  display: block;
  height: 60px;
  padding: 20px 0;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.2s;
  position: relative;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  color: #000;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #000;
  transform: scaleX(0);
  transition: transform 0.2s;
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.nav-link.campaign {
  color: #d62828;
  font-weight: 600;
}

@media (max-width: 1200px) {
  .nav-link {
    font-size: 11px;
    padding: 18px 10px;
  }
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 14px;
    padding: 15px 8px;
  }
}
</style>
