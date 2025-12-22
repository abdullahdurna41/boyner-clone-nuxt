<template>
  <form @submit.prevent="onSubmit" class="auth-form">
    <AtomsAppInput
      v-model="formData.name"
      type="text"
      placeholder="Ad Soyad"
      autocomplete="name"
      required
    />

    <AtomsAppInput
      v-model="formData.email"
      type="email"
      placeholder="E-posta"
      autocomplete="email"
      required
    />

    <div class="password-field">
      <AtomsAppInput
        v-model="formData.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Şifre"
        autocomplete="new-password"
        required
      />
      <button type="button" class="password-toggle" @click="showPassword = !showPassword">
        <AtomsAppIcon :name="showPassword ? 'eye-off' : 'eye'" :size="20" />
      </button>
    </div>

    <p class="password-hint">
      En az 6 karakter olmalı<br />
      1 harf, rakam veya özel karakter içermeli
    </p>

    <AtomsAppInput
      v-model="formData.phone"
      type="tel"
      placeholder="Cep Telefonu"
      autocomplete="tel"
      required
    />

    <AtomsAppSelect
      v-model="formData.gender"
      placeholder="Cinsiyet (İsteğe bağlı)"
      :options="genderOptions"
    />

    <p class="consent-text">
      Üye olmadan önce lütfen <a href="#" class="auth-link">Aydınlatma Metni</a>'ni okuyunuz...
    </p>

    <div class="checkbox-group">
      <AtomsAppCheckbox v-model="formData.membershipAgreement" required>
        <a href="#" class="auth-link">Üyelik Sözleşmesi</a>'ni okudum, onaylıyorum.
      </AtomsAppCheckbox>
      <AtomsAppCheckbox v-model="formData.privacyPolicy">
        <a href="#" class="auth-link">Kişisel Verilerin Korunması</a> hakkında bilgilendirildim.
      </AtomsAppCheckbox>
      <AtomsAppCheckbox v-model="formData.marketing">
        Kampanyalardan haberdar olmak istiyorum.
      </AtomsAppCheckbox>
    </div>

    <AtomsAppButton type="submit" variant="primary" full-width>
      ÜYE OL
    </AtomsAppButton>
  </form>
</template>

<script setup>

const emit = defineEmits(['submit-register']);

const showPassword = ref(false);

const genderOptions = [
  { value: 'kadın', label: 'Kadın' },
  { value: 'erkek', label: 'Erkek' }
];

const formData = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  gender: '',
  membershipAgreement: false,
  privacyPolicy: false,
  marketing: false
});

const onSubmit = () => {
  emit('submit-register', { ...formData });
};
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.password-field {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.password-toggle:hover {
  color: #2b2b38;
}

.password-hint {
  font-size: 12px;
  color: #666;
  margin: -12px 0 0 0;
  line-height: 1.5;
}

.consent-text {
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  margin: 4px 0;
}

.auth-link {
  color: rgb(43, 43, 56);
  text-decoration: underline;
  font-weight: 500;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0;
}
</style>
