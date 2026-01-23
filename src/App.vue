<template>
  <!-- Header solo para usuarios no logueados -->
  <header v-if="!isLoggedIn">
    <h1>Blue Platform</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Computed para determinar si hay token en localStorage
const isLoggedIn = computed(() => !!localStorage.getItem('token'))
</script>

<style scoped>
header {
  background-color: #0077cc;
  color: white;
  padding: 1rem;
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 0.5rem;
}

nav a.router-link-active {
  font-weight: bold;
}

main {
  padding: 2rem;
}
</style>
