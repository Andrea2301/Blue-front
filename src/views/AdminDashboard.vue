<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mediaService } from '@/services/mediaservice'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'
import Tag from 'primevue/tag'

const router = useRouter()

const mediaList = ref<any[]>([])
const showUpload = ref(false)
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

const uploadMedia = async (event: any) => {
  try {
    const file = event.files[0]
    
    // Check file size (limit to 10MB to be safe, or match server config)
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande (Máx 10MB).')
      showUpload.value = false
      return
    }

    await mediaService.upload(file)
    showUpload.value = false
    await loadMedia()
  } catch (error) {
    console.error('Error uploading media:', error)
    alert('Error al subir archivo. Verifique que el servidor esté funcionando y el archivo no sea demasiado grande.')
  }
}

const deleteMedia = async (id: string) => {
  await mediaService.delete(id)
  loadMedia()
}

onMounted(loadMedia)
</script>

<template>
  <div class="admin-dashboard">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-left">
        <h1 class="brand">NERTFLIXX<span>ADMIN</span></h1>
        <div class="stats">
          <Tag severity="info" :value="`${mediaList.length} Archivos`" />
        </div>
      </div>
      <div class="nav-right">
        <Button 
          label="Subir Contenido" 
          icon="pi pi-plus" 
          class="p-button-danger" 
          @click="showUpload = true" 
        />
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
        <h2>Gestión de Catálogo</h2>
        <p>Administra las imágenes y videos de la plataforma</p>
      </header>

      <!-- Media Grid -->
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
            >
              <source :src="item.url" />
            </video>
            
            <div class="media-overlay">
              <div class="overlay-actions">
                <Button 
                  icon="pi pi-trash" 
                  severity="danger" 
                  rounded 
                  @click="deleteMedia(item.id)" 
                />
              </div>
              <div class="media-info">
                <span class="file-type">{{ item.contentType?.split('/')[1].toUpperCase() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State / Add New Placeholder -->
        <div class="media-card add-new" @click="showUpload = true">
          <div class="add-content">
            <i class="pi pi-cloud-upload"></i>
            <span>Añadir Nuevo</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Upload Modal -->
    <Dialog 
      v-model:visible="showUpload" 
      header="Subir Nuevo Archivo" 
      modal 
      class="netflix-dialog"
      :style="{ width: '400px' }"
    >
      <div class="upload-container">
        <FileUpload
          mode="basic"
          customUpload
          auto
          chooseLabel="Seleccionar de mi equipo"
          class="p-button-danger w-full"
          @uploader="uploadMedia"
        />
        <p class="upload-hint">Formatos soportados: MP4, JPG, PNG</p>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.admin-dashboard {
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

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-right {
  display: flex;
  gap: 1rem;
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
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.media-card:hover .media-overlay {
  opacity: 1;
}

.overlay-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
