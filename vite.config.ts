import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 8080
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "/index.html"),
        teach: resolve(__dirname, "/teach.html")
      }
    }
  }
})
