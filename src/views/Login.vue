<template>
  <div class="login-container">
    <div class="login-overlay"></div>
    <div class="login-content">
      <h2>Inicia sesión</h2>
      <div class="form-container">
        <div class="input-group">
          <InputText v-model="email" placeholder="Email o número de teléfono" class="netflix-input" />
        </div>
        <div class="input-group">
          <Password v-model="password" :feedback="false" toggleMask placeholder="Contraseña" inputClass="netflix-input" class="netflix-password" />
        </div>
        <Button label="Iniciar sesión" @click="loginUser" class="netflix-button" />

        <div class="extra-actions">
          <div class="remember-me">
            <input type="checkbox" id="remember" />
            <label for="remember">Recuérdame</label>
          </div>
          <a href="#" class="help-link">¿Necesitas ayuda?</a>
        </div>

        <div class="signup-now">
          ¿Primera vez en Blue? <router-link to="/register" class="white-link">Suscríbete ahora.</router-link>
        </div>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { authService } from '@/services/Authservice'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const loginUser = async () => {
  errorMessage.value = ''
  try {
    await authService.login(email.value, password.value)
    router.push('/user')
  } catch (err: any) {
    errorMessage.value =
      err.response?.data?.message ?? 'Credenciales inválidas'
  }

  

}
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  background-color:#333;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to top, rgba(0,0,0,0.8) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%);
}

.login-content {
  position: relative;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  padding: 60px 68px 40px;
  max-width: 450px;
  width: 100%;
  min-height: 660px;
  box-sizing: border-box;
}

h2 {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 28px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
}

:deep(.netflix-input) {
  width: 100%;
  background: #333 !important;
  border: 0 !important;
  border-radius: 4px !important;
  color: #fff !important;
  height: 50px !important;
  padding: 16px 20px !important;
  font-size: 16px !important;
}

:deep(.netflix-input:focus) {
  background: #454545 !important;
  outline: none !important;
}

:deep(.p-password) {
  width: 100%;
}

:deep(.p-inputtext:enabled:focus) {
    box-shadow: none;
    border-bottom: 2px solid #e50914 !important;
}

.netflix-button {
  background-color: #e50914 !important;
  border: none !important;
  border-radius: 4px !important;
  color: #fff !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  padding: 16px !important;
  margin-top: 24px !important;
  cursor: pointer !important;
  width: 100%;
}

.netflix-button:hover {
  background-color: #f40612 !important;
}

.extra-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #b3b3b3;
  font-size: 13px;
  margin-top: 10px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 5px;
}

.help-link {
  color: #b3b3b3;
  text-decoration: none;
}

.help-link:hover {
  text-decoration: underline;
}

.signup-now {
  color: #737373;
  font-size: 16px;
  margin-top: 40px;
}

.white-link {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

.white-link:hover {
  text-decoration: underline;
}

.error-message {
  color: #e87c03;
  font-size: 14px;
  margin-top: 10px;
}
</style>
