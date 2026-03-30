import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/tnt-smile-squad1/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        new_patient: resolve(__dirname, 'new-patient.html'),
        emergency: resolve(__dirname, 'emergency.html'),
        implants: resolve(__dirname, 'implants.html'),
        transformation: resolve(__dirname, 'transformation.html'),
      },
    },
  },
})
