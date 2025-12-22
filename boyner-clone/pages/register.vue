<template>
  <NuxtLayout
    name="auth"
    title="Boyner dünyasına hoş geldin 😊"
    subtitle="Hadi gel üye ol, ayrıcalıklı alışverişin keyfini çıkar!"
    switch-text="Zaten üye misin?"
    switch-link-text="Giriş Yap"
    switch-link="/login"
  >
    <div class="form-container">
      <nav class="auth-tabs">
        <NuxtLink to="/login" class="auth-tab">Giriş Yap</NuxtLink>
        <span class="auth-tab active">Üye Ol</span>
      </nav>

      <div v-if="authStore.error" class="error-message">
        {{ authStore.error }}
      </div>

      <div :class="{ 'opacity-50 pointer-events-none': authStore.loading }">
        <OrganismsRegisterForm @submit-register="handleRegister" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Layout'u manuel sardığımız için otomatiği kapatıyoruz
definePageMeta({
  layout: false
})

// Store'u çağırıyoruz
const authStore = useAuthStore()

// --- TEK VE GERÇEK KAYIT FONKSİYONU ---
const handleRegister = async (formData) => {
  console.log('Formdan gelen veri:', formData)

  // Store'daki action'ı çağırıp sonucu bekliyoruz
  const isSuccess = await authStore.registerUser(formData)

  if (isSuccess) {
    // Başarılıysa yönlendir
    // (Alert yerine daha şık bir toast mesajı da kullanabilirsin ileride)
    alert('Kayıt Başarılı! Hoş geldiniz ' + formData.name)
    return navigateTo('/') 
  }
  // Başarısızsa bir şey yapmana gerek yok, authStore.error yukarıda template içinde görünecek
}
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 420px;
}

.auth-tabs {
  display: flex;
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

/* Hata mesajı stili */
.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #ef9a9a;
}

/* Loading sırasında opaklık düşürme */
.opacity-50 {
  opacity: 0.5;
}
.pointer-events-none {
  pointer-events: none;
}
</style>