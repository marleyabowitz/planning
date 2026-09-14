import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const root = import.meta.dirname

export default defineConfig({
  base: '/planning/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        algos: resolve(root, 'algos.html'),
        probability: resolve(root, 'probability.html'),
        ai: resolve(root, 'ai.html'),
        languages: resolve(root, 'languages.html'),
        bc1014: resolve(root, 'bc1014.html'),
        cantor: resolve(root, 'cantor.html'),
        career: resolve(root, 'career.html'),
      },
    },
  },
})
