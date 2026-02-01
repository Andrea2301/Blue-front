<template>
  <div class="register-container">
    <div class="register-overlay"></div>
    <div class="register-content">
      <h2>Regístrate</h2>
      <div class="form-container">
        <div class="input-group">
          <InputText id="name" v-model="name" placeholder="Nombre" class="netflix-input" />
        </div>
        <div class="input-group">
          <InputText id="email" v-model="email" placeholder="Email" class="netflix-input" />
        </div>
        <div class="input-group">
          <Password id="password" v-model="password" :feedback="false" toggleMask placeholder="Contraseña" inputClass="netflix-input" class="netflix-password" />
        </div>

        <Button label="Registrarse" class="netflix-button" @click="register" />
        
        <div class="login-now">
          ¿Ya tienes cuenta? <router-link to="/login" class="white-link">Inicia sesión.</router-link>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/Authservice'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

// Campos del formulario
const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const register = async () => {
  errorMessage.value = '' // limpiar error
  try {
    const { data } = await authService.register(name.value, email.value, password.value)

    // Guardar token si el backend devuelve uno
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role ?? '')
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  } catch (error: any) {
    console.error('Error al registrarse', error)
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
      console.log("Validation error:", error.response.data);
    } else {
      console.log("Full error response:", error.response);
      errorMessage.value = 'Error al registrarse. Ver consola para más detalles.'
    }
  }
}
</script>

<style scoped>
.register-container {
  position: relative;
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1920&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.register-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to top, rgba(0,0,0,0.8) 0, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%);
}

.register-content {
  position: relative;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  padding: 60px 68px 40px;
  max-width: 450px;
  width: 100%;
  min-height: 550px;
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

.login-now {
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
