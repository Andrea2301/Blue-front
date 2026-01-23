<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  //  Si no hay sesión - login
  if (!token || !role) {
    router.replace('/login')
    return
  }

  // Redirección por rol
  if (role === 'Admin') {
    router.replace('/admin')
  } else if (role === 'User') {
    router.replace('/user')
  } else {
    // fallback de seguridad
    router.replace('/login')
  }
})
</script>

<template>
  <div>Cargando dashboard...</div>
</template>
