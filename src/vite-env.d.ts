/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEILISEARCH_HOST: string
  readonly VITE_MEILISEARCH_SEARCH_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
