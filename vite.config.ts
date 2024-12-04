import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue()],
  
  server: {
    host: '0.0.0.0',
    port: 9001
  },
  build:{
    outDir: 'dist',
    sourcemap: true,
    emptyOutDir: true,
  }
})
