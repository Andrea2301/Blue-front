<template>
  <!-- Header solo para usuarios no logueados -->


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
  text-align: center
}

main {
  padding: 0px;
  margin: 0px;
}
</style>
