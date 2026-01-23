<template>
  <div class="login">
    <h2>Login</h2>

    <InputText v-model="email" placeholder="Email" />
    <Password v-model="password" toggleMask placeholder="Password" />
    <Button label="Login" @click="loginUser" />

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
    const { data } = await authService.login(email.value, password.value)
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    router.push('/dashboard')
  } catch (err: any) {
    errorMessage.value =
      err.response?.data?.message ?? 'Credenciales inválidas'
  }

  

}
</script>

<style scoped>
.error {
  color: red;
}
</style>
