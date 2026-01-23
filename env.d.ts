/// <reference types="vite/client" />

// Esto permite importar archivos .vue sin que TypeScript marque error
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // agrega aquí más variables de entorno jajaj 
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
