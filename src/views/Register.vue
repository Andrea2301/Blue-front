<template>
  <div class="register">
    <h2>Register</h2>

    <div class="form-group">
      <label for="name">Name</label>
      <InputText id="name" v-model="name" placeholder="Name" />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <InputText id="email" v-model="email" placeholder="Email" />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <Password id="password" v-model="password" toggleMask placeholder="Password" />
    </div>

    <Button label="Register" class="p-button-success" @click="register" />

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'


import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

// Campos del formulario
const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

// URL del backend desde .env
const API_URL = import.meta.env.VITE_API_URL

const register = async () => {
  errorMessage.value = '' // limpiar error
  try {
    const { data } = await axios.post(`${API_URL}/auth/register`, {
      name: name.value,
      email: email.value,
      password: password.value
    })

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
    } else {
      errorMessage.value = 'Error al registrarse. Intenta nuevamente.'
    }
  }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
