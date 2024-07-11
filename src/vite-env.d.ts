/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}


declare global {
  interface Window {
    $message: any
  }
}

declare global {
  interface Navigator {
    msSaveBlob?: (blob: any, defaultName?: string) => boolean
  }
}
declare namespace NodeJS {
  type Timer = any;
  type Timeout = any;
}


declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.scss'
declare module '*.js'
declare module '*.vue'
declare module '*.jsx'

declare module '*.tsx'
declare module '*.ts'