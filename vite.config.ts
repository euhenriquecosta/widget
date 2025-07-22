import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'ChatWidget',
      fileName: 'chat-widget',
      formats: ['umd', 'iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        // Serve para manter o nome do arquivo css no build em style.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return assetInfo.name || 'assets/[name]-[hash][extname]'
        }
      }
    },
    // Serve para não separar o arquivo css em chunks e manter ele em um unico arquivo
    cssCodeSplit: false
  }
})
