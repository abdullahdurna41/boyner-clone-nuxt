// stores/auth.js
import { defineStore } from 'pinia'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile,onAuthStateChanged } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Giriş yapmış kullanıcı bilgisi
    loading: false, // Yükleniyor mu?
    error: null // Hata mesajı
  }),

  actions: {
initAuth() {
      const auth = getAuth()
      // Firebase'i dinle: Kullanıcı durumu değişirse State'i güncelle
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
          console.log("Auth Store: Kullanıcı geri yüklendi ->", user.email)
        } else {
          this.user = null
          console.log("Auth Store: Kullanıcı çıkış yaptı.")
        }
      })},

    // --- YENİ EKLENECEK KISIM: LOGIN ---
    async loginUser(payload) {
      // payload: { email, password }
      this.loading = true
      this.error = null
      
      const auth = getAuth()

      try {
        // Firebase ile giriş yap
        const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password)
        
        // Başarılı olursa kullanıcıyı state'e at
        this.user = userCredential.user
        return true

      } catch (err) {
        console.error("Giriş Hatası:", err)
        
        // Hataları Türkçeleştir
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            this.error = 'E-posta veya şifre hatalı.'
            break
          case 'auth/too-many-requests':
            this.error = 'Çok fazla deneme yaptınız. Lütfen biraz bekleyin.'
            break
          default:
            this.error = 'Giriş yapılamadı: ' + err.message
        }
        
        return false
      } finally {
        this.loading = false
      }
    },
    async registerUser(payload) {
      // payload: { email, password, name, phone, gender, ... } formdan gelen veri
      this.loading = true
      this.error = null
      
      const auth = getAuth() // Firebase yetkilendirmeyi başlat

      try {
        // 1. KULLANICIYI OLUŞTUR (Email & Şifre ile)
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          payload.email, 
          payload.password
        )

        // 2. PROFİLİ GÜNCELLE (İsim bilgisini ekle)
        // Firebase Auth standart olarak sadece Email/Şifre alır, ismi sonradan ekleriz.
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: payload.name
          })
        }

        // 3. (OPSİYONEL) DİĞER BİLGİLERİ KAYDETME
        // Firebase Auth; telefon, cinsiyet, sözleşme onayı gibi verileri tutmaz.
        // Bunları "Firestore" veritabanına kaydetmek gerekir.
        // Şimdilik sadece Auth işlemini tamamlıyoruz.
        console.log('Ekstra Bilgiler:', {
            phone: payload.phone,
            gender: payload.gender,
            marketing: payload.marketing
        })

        // 4. BAŞARILI DURUMU
        this.user = userCredential.user
        return true // Sayfaya "İşlem Tamam" sinyali dönüyoruz

      } catch (err) {
        // 5. HATA YAKALAMA
        console.error("Kayıt Hatası:", err)
        
        // Kullanıcıya dostça hata mesajları gösterelim
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.error = 'Bu e-posta adresi zaten kullanımda.'
            break
          case 'auth/weak-password':
            this.error = 'Şifreniz çok zayıf.'
            break
          default:
            this.error = 'Bir hata oluştu: ' + err.message
        }
        
        return false // Sayfaya "İşlem Başarısız" sinyali dönüyoruz
      } finally {
        this.loading = false
      }
    }
  }
})