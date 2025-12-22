<template>
  <NuxtLayout
    name="auth"
    title="Biz de seni bekliyorduk 😊"
    subtitle="Hemen giriş yap, tarzını yakalamak için alışverişe başla!"
    switch-text="Henüz üye değil misin?"
    switch-link-text="Hemen Üye Ol"
    switch-link="/register"
  >
    <div class="form-container">
      <nav class="auth-tabs">
        <span class="auth-tab active">Giriş Yap</span>
        <NuxtLink to="/register" class="auth-tab">Üye Ol</NuxtLink>
      </nav>

      <div v-if="authStore.error" class="error-message">
        {{ authStore.error }}
      </div>

      <div :class="{ 'opacity-50 pointer-events-none': authStore.loading }">
        <OrganismsLoginForm @submit-login="handleLogin" />
      </div>
      
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: false
});

// Store bağlantısı
const authStore = useAuthStore()

const handleLogin = async (credentials) => {
  // credentials: { email: '...', password: '...', rememberMe: ... }
  console.log('Giriş yapılıyor:', credentials);

  // Store'daki action'ı çağır
  const isSuccess = await authStore.loginUser({
    email: credentials.email,
    password: credentials.password
  })

  if (isSuccess) {
    // Başarılıysa anasayfaya yönlendir
    alert('Giriş Başarılı!')
    return navigateTo('/')
  }
  // Başarısızsa hata mesajı zaten template'de görünecek
};
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 420px;
}

.auth-tabs {
  display: inline-flex;
  align-items: center;
  margin-bottom: 40px;
  gap: 32px;
}

.auth-tab {
  background: none;
  border: none;
  font-size: 24px;
  font-weight: 500;
  color: #999;
  cursor: pointer;
  padding: 0 0 8px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  font-family: 'Jost', sans-serif;
  text-decoration: none;
  display: inline-block;
}

.auth-tab.active,
.auth-tab:hover {
  color: #2b2b38;
  border-bottom-color: #2b2b38;
}

/* Hata Mesajı Stili (Register ile aynı) */
.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #ef9a9a;
}

.opacity-50 { opacity: 0.5; }
.pointer-events-none { pointer-events: none; }
</style>