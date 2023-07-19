declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MEILISEARCH_HOST: string;
      MEILISEARCH_ADMIN_KEY: string;
    }
  }
}

export {}
