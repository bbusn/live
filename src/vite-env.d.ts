/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NODE_ENV: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_API_URL: string;
    readonly VITE_COLOR_PRIMARY: string;
    readonly VITE_COLOR_SECONDARY: string;
    readonly VITE_COLOR_TERTIARY: string;
    readonly VITE_COLOR_BACKGROUND: string;
    readonly VITE_COLOR_SUCCESS: string;
    readonly VITE_COLOR_FAILURE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
