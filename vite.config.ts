import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: '0.0.0.0', // Allows access from external networks
      // port: 5173,      // Specifies the port to run on
    },
    plugins: [
      vue(),
      VueDevTools(),
    ],
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }

  }
})
