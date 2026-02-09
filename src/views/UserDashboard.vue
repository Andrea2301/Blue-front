<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mediaService } from '@/services/mediaservice'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const mediaList = ref<any[]>([])
const loading = ref(false)

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

const loadMedia = async () => {
  loading.value = true
  try {
    const { data } = await mediaService.getAll()
    mediaList.value = data
  } catch (error) {
    console.error('Error loading media:', error)
  } finally {
    loading.value = false
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x200?text=No+Preview'
}

onMounted(loadMedia)
</script>

<template>
  <div class="user-dashboard">
    <nav class="navbar">
      <div class="nav-left">
        <h1 class="brand">NERFLIXX<span>USER</span></h1>
      </div>
      <div class="nav-right">
        <Button 
          icon="pi pi-sign-out" 
          severity="secondary" 
          text 
          @click="logout" 
          v-tooltip.bottom="'Cerrar Sesión'"
        />
      </div>
    </nav>

    <main class="content">
      <header class="content-header">
        <h2>Galería de Contenidos</h2>
        <p>Disfruta de la colección de imágenes y videos</p>
      </header>

      <div class="media-grid">
        <div v-for="item in mediaList" :key="item.id" class="media-card">
          <div class="media-wrapper">
            <img
              v-if="item.contentType?.startsWith('image')"
              :src="item.url"
              class="media-preview"
              referrerpolicy="no-referrer"
              @error="handleImageError"
            />
            <video
              v-else
              class="media-preview"
              controls
            >
              <source :src="item.url" />
            </video>
            
            <div class="media-overlay" v-if="item.contentType?.startsWith('image')">
              <div class="media-info">
                <span class="file-type">{{ item.contentType?.split('/')[1].toUpperCase() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.user-dashboard {
  min-height: 100vh;
  background-color: #141414;
  color: #fff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand {
  color: #e50914;
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: -1px;
}

.brand span {
  color: #fff;
  font-weight: 300;
  margin-left: 4px;
}

.content {
  padding: 2rem 4%;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.content-header p {
  color: #808080;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.media-card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  aspect-ratio: 16/9;
  background: #2f2f2f;
}

.media-card:hover {
  transform: scale(1.05);
  z-index: 10;
}

.media-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.media-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

.media-card:hover .media-overlay {
  opacity: 1;
}

.file-type {
  background: rgba(0,0,0,0.8);
  padding: 2px 6px;
  border-radius: 2px;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
