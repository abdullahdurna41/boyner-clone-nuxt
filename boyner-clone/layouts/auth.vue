<template>
  <div class="auth-layout">
    <aside class="auth-left">
      <AtomsLogo variant="text" />
      <div class="welcome-text">
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
      <div class="switch-area">
        <span>{{ switchText }}</span>
        <router-link :to="switchLink" class="switch-link">{{ switchLinkText }}</router-link>
      </div>
    </aside>

    <section class="auth-right">
      <slot></slot>
    </section>
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  switchText: {
    type: String,
    default: ''
  },
  switchLinkText: {
    type: String,
    default: ''
  },
  switchLink: {
    type: String,
    default: '/'
  }
});
</script>

<style scoped>
.auth-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
}

.auth-left {
  flex: 1;
  background: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #eee;
}

.auth-right {
  flex: 1;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 65px;
}

.welcome-text {
  margin: 40px 0 30px;
}

.welcome-text h2 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #2b2b38;
}

.welcome-text p {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
}

.switch-area {
  font-size: 15px;
  color: #666;
}

.switch-link {
  color: #2b2b38;
  font-weight: bold;
  margin-left: 5px;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-layout {
    flex-direction: column;
  }

  .auth-left {
    display: none;
  }

  .auth-right {
    padding: 30px 20px;
  }
}
</style>
