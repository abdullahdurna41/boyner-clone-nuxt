<template>
  <div class="contact-container">
    <h2 class="form-title">Bize Ulaşın</h2>
    
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label>Adınız Soyadınız</label>
        <AtomsAppInput v-model="form.name" placeholder="Ad Soyad giriniz" />
      </div>

      <div class="form-group">
        <label>E-Posta Adresi</label>
        <AtomsAppInput v-model="form.email" type="email" placeholder="ornek@email.com" />
      </div>

      <div class="form-group">
        <label>Konu</label>
        <AtomsAppSelect 
          v-model="form.subject" 
          :options="subjectOptions"
          placeholder="Seçiniz"
        />
      </div>

      <div class="form-group">
        <label>Mesajınız</label>
        <AtomsAppTextarea v-model="form.message" placeholder="Mesajınızı buraya yazın..." />
      </div>

      <div class="form-group checkbox-group">
        <AtomsAppCheckbox v-model="form.privacy">
          <a href="#">Aydınlatma Metni</a>'ni okudum, kabul ediyorum.
        </AtomsAppCheckbox>
      </div>

      <AtomsAppButton 
        type="submit" 
        variant="primary" 
        size="large" 
        :full-width="true"
        :disabled="!form.privacy"
      >
        GÖNDER
      </AtomsAppButton>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  privacy: false
});

const subjectOptions = [
  { value: 'order', label: 'Sipariş Durumu' },
  { value: 'return', label: 'İade ve Değişim' },
  { value: 'suggestion', label: 'Öneri ve Şikayet' },
  { value: 'other', label: 'Diğer' }
];

const handleSubmit = () => {
  console.log('Form Data:', form);
};
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.form-title {
  font-size: 24px;
  font-weight: 700;
  color: #2b2b38;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #2b2b38;
  margin-bottom: 8px;
}

.checkbox-group {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>