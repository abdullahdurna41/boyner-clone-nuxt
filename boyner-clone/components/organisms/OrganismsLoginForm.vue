<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <AtomsAppInput
      v-model="email"
      type="email"
      placeholder="E-posta"
      autocomplete="email"
      required
    />

    <div class="password-field">
      <AtomsAppInput
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Şifre"
        autocomplete="current-password"
        required
      />
      <button type="button" class="password-toggle" @click="showPassword = !showPassword">
        <AtomsAppIcon :name="showPassword ? 'eye-off' : 'eye'" :size="20" />
      </button>
    </div>

    <div class="options">
      <AtomsAppCheckbox v-model="rememberMe">Beni Hatırla</AtomsAppCheckbox>
      <a href="#" class="forgot-link">Şifremi Unuttum</a>
    </div>

    <AtomsAppButton type="submit" variant="primary" full-width>
      GİRİŞ YAP
    </AtomsAppButton>
  </form>
</template>

<script setup>


const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);

const emit = defineEmits(['submit-login']);

const onSubmit = () => {
  emit('submit-login', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  });
};
</script>

<style scoped>
.login-form {
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

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.forgot-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #2b2b38;
}
</style>
