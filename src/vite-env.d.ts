/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILDER_ENVIRONMENT?: string;
  readonly VITE_FORM_SUBMIT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
