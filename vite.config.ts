import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    cssInjectedByJsPlugin()
  ],
  
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'ChatWidget',
      fileName: 'chat-widget',
      formats: ['umd', 'iife']
    }
  }
})
