<template>
  <div class="contact-page">
    <div class="container">
      
      <div class="header-section">
        <h1>Bize Ulaşın</h1>
        <p>Sorularınız, önerileriniz veya şikayetleriniz için aşağıdaki formu doldurabilirsiniz.</p>
      </div>

      <div class="content-wrapper">
        <div class="info-card">
          <h3>İletişim Bilgileri</h3>
          <div class="info-item">
            <AtomsAppIcon name="phone" /> <div>
              <strong>Telefon</strong>
              <p>0850 123 45 67</p>
            </div>
          </div>
          <div class="info-item">
            <AtomsAppIcon name="mail" /> <div>
              <strong>E-Posta</strong>
              <p>destek@boyner-clone.com</p>
            </div>
          </div>
          <div class="info-item">
            <AtomsAppIcon name="map-pin" /> <div>
              <strong>Adres</strong>
              <p>Büyükdere Cad. No:123 Şişli / İstanbul</p>
            </div>
          </div>
        </div>

        <div class="form-card">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Adınız Soyadınız</label>
              <input v-model="form.name" type="text" placeholder="Ad Soyad" required />
            </div>

            <div class="form-group">
              <label>E-Posta Adresiniz</label>
              <input v-model="form.email" type="email" placeholder="ornek@mail.com" required />
            </div>

            <div class="form-group">
              <label>Konu</label>
              <input v-model="form.subject" type="text" placeholder="Mesajınız ne hakkında?" required />
            </div>

            <div class="form-group">
              <label>Mesajınız</label>
              <textarea v-model="form.message" rows="5" placeholder="Size nasıl yardımcı olabiliriz?" required></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="contactStore.loading">
              {{ contactStore.loading ? 'GÖNDERİLİYOR...' : 'GÖNDER' }}
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const contactStore = useContactStore()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = async () => {
  const success = await contactStore.sendMessage(form)
  
  if (success) {
    alert('Mesajınız bize ulaştı! En kısa sürede döneceğiz.')
    // Formu temizle
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } else {
    alert('Bir hata oluştu. Lütfen tekrar deneyin.')
  }
}
</script>

<style scoped>
.contact-page { padding: 40px 0; font-family: 'Jost', sans-serif; background: #f9f9f9; min-height: 80vh; }
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

.header-section { text-align: center; margin-bottom: 40px; }
.header-section h1 { font-size: 32px; color: #2b2b38; margin-bottom: 10px; }
.header-section p { color: #666; }

.content-wrapper { display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px; }

/* Bilgi Kartı */
.info-card { background: #2b2b38; color: white; padding: 40px; border-radius: 8px; }
.info-card h3 { font-size: 24px; margin-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 15px; }
.info-item { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 25px; }
.info-item strong { display: block; font-size: 14px; margin-bottom: 5px; opacity: 0.8; }
.info-item p { font-size: 16px; margin: 0; }

/* Form Kartı */
.form-card { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }
.form-group { margin-bottom: 20px; }
label { display: block; font-weight: 600; margin-bottom: 8px; font-size: 14px; color: #333; }
input, textarea { 
  width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; 
  font-family: inherit; transition: border 0.3s;
}
input:focus, textarea:focus { border-color: #2b2b38; outline: none; }

.submit-btn {
  background: #2b2b38; color: white; border: none; padding: 15px 40px;
  font-weight: bold; border-radius: 4px; cursor: pointer; width: 100%;
  transition: background 0.3s;
}
.submit-btn:hover { background: #000; }
.submit-btn:disabled { background: #ccc; cursor: not-allowed; }

@media (max-width: 768px) { .content-wrapper { grid-template-columns: 1fr; } }
</style>