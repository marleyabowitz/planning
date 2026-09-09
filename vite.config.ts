import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const root = import.meta.dirname

export default defineConfig({
  base: '/planning/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        notes: resolve(root, 'notes.html'),
      },
    },
  },
})
