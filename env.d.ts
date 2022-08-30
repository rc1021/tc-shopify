/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_NAME: string
    readonly VUE_APP_API: string
    readonly VITE_API_SERVER: string
    readonly BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
