<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mediaService } from '@/services/mediaservice'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const mediaList = ref<any[]>([])

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

onMounted(async () => {
  const { data } = await mediaService.getAll()
  mediaList.value = data
})
</script>

<template>
  <div class="user">
    <h2>🎬 Galería</h2>

    <Button
      label="Cerrar sesión"
      icon="pi pi-sign-out"
      severity="secondary"
      @click="logout"
    />

    <div class="grid">
      <div v-for="item in mediaList" :key="item.id" class="card">
        <img
          v-if="item.contentType?.startsWith('image')"
          :src="item.url"
          class="media"
        />

        <video
          v-else
          controls
          class="media"
        >
          <source :src="item.url" />
        </video>
      </div>
    </div>
  </div>
</template>
