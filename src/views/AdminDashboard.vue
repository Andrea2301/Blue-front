<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mediaService } from '@/services/mediaservice'
import { useRouter } from 'vue-router'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import FileUpload from 'primevue/fileupload'

const router = useRouter()

const mediaList = ref<any[]>([])
const showUpload = ref(false)

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

const loadMedia = async () => {
  const { data } = await mediaService.getAll()
  mediaList.value = data
}

const uploadMedia = async (event: any) => {
  const file = event.files[0]

  const formData = new FormData()
  formData.append('File', file)

  await mediaService.upload(formData)
  showUpload.value = false
  loadMedia()
}

const deleteMedia = async (id: string) => {
  await mediaService.delete(id)
  loadMedia()
}

onMounted(loadMedia)
</script>

<template>
  <div class="admin">
    <h2>👑 Bienvenida Administradora</h2>

    <div class="actions">
      <Button label="Agregar imagen / video" icon="pi pi-upload" @click="showUpload = true" />
      <Button label="Cerrar sesión" icon="pi pi-sign-out" severity="secondary" @click="logout" />
    </div>

    <!-- GALERÍA -->
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

        <Button
          label="Eliminar"
          icon="pi pi-trash"
          severity="danger"
          class="mt-2"
          @click="deleteMedia(item.id)"
        />
      </div>
    </div>

    <!-- MODAL -->
    <Dialog v-model:visible="showUpload" header="Subir archivo" modal>
      <FileUpload
        mode="basic"
        customUpload
        auto
        chooseLabel="Seleccionar archivo"
        @uploader="uploadMedia"
      />
    </Dialog>
  </div>
</template>
