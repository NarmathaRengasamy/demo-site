/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FURNITURE_URL?: string;
  readonly VITE_CAR_URL?: string;
  readonly VITE_ECOMMERCE_URL?: string;
  readonly VITE_TAPE_URL?: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_TELEMETRY_API_KEY?: string;
  readonly VITE_ANALYTICS_WRITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
