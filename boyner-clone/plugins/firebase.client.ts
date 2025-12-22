import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }

  // Firebase'i başlat
  const app = initializeApp(firebaseConfig)
  
  // Servisleri başlat
  const db = getFirestore(app)
  const auth = getAuth(app)

  return {
    provide: {
      db,
      auth
    }
  }
})