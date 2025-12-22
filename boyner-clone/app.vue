<script setup>
import { onMounted } from 'vue'

const cartStore = useCartStore()
const authStore = useAuthStore() // <-- Auth Store'u çağır

onMounted(() => {
  // 1. Sepeti yükle
  cartStore.loadFromLocalStorage()
  
  // 2. Kullanıcıyı kontrol et (Firebase ile senkronize ol)
  authStore.initAuth() 
})
</script>


<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>