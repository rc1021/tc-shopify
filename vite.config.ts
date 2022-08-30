import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default (({ mode }) => {

  const VITE_API_SERVER: string = loadEnv(mode, process.cwd()).VITE_API_SERVER;

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 3000,
      proxy: {
        '/tc/auth': {
          target: VITE_API_SERVER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tc\/auth/, '')
        },
        '/tc': {
          target: VITE_API_SERVER + '/api/shopify',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tc/, '')
        },
      }
    }
  })
})
