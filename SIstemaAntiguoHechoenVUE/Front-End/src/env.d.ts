/// <reference types="vite/client" />

declare module '*.vue'
declare module '*.css'

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string
	readonly VITE_APP_TITLE: string
	readonly VITE_APP_ENV: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
