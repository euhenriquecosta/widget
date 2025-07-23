// vite.config.ts
import { defineConfig } from "file:///home/guiaalves/Downloads/widget/node_modules/.pnpm/vite@4.5.14_lightningcss@1.30.1/node_modules/vite/dist/node/index.js";
import preact from "file:///home/guiaalves/Downloads/widget/node_modules/.pnpm/@preact+preset-vite@2.8.0_@babel+core@7.28.0_preact@10.26.9_vite@4.5.14_lightningcss@1.30.1_/node_modules/@preact/preset-vite/dist/esm/index.mjs";
var vite_config_default = defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "ChatWidget",
      fileName: "chat-widget",
      formats: ["umd", "iife"]
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        // Serve para manter o nome do arquivo css no build em style.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "style.css";
          }
          return assetInfo.name || "assets/[name]-[hash][extname]";
        }
      }
    },
    // Serve para não separar o arquivo css em chunks e manter ele em um unico arquivo
    cssCodeSplit: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9ndWlhYWx2ZXMvRG93bmxvYWRzL3dpZGdldFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZ3VpYWFsdmVzL0Rvd25sb2Fkcy93aWRnZXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZ3VpYWFsdmVzL0Rvd25sb2Fkcy93aWRnZXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHByZWFjdCBmcm9tICdAcHJlYWN0L3ByZXNldC12aXRlJ1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtwcmVhY3QoKV0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogJ3NyYy9pbmRleC50c3gnLFxuICAgICAgbmFtZTogJ0NoYXRXaWRnZXQnLFxuICAgICAgZmlsZU5hbWU6ICdjaGF0LXdpZGdldCcsXG4gICAgICBmb3JtYXRzOiBbJ3VtZCcsICdpaWZlJ11cbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7fSxcbiAgICAgICAgLy8gU2VydmUgcGFyYSBtYW50ZXIgbyBub21lIGRvIGFycXVpdm8gY3NzIG5vIGJ1aWxkIGVtIHN0eWxlLmNzc1xuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZSA9PT0gJ3N0eWxlLmNzcycpIHtcbiAgICAgICAgICAgIHJldHVybiAnc3R5bGUuY3NzJ1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWUgfHwgJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBTZXJ2ZSBwYXJhIG5cdTAwRTNvIHNlcGFyYXIgbyBhcnF1aXZvIGNzcyBlbSBjaHVua3MgZSBtYW50ZXIgZWxlIGVtIHVtIHVuaWNvIGFycXVpdm9cbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtSLFNBQVMsb0JBQW9CO0FBQy9TLE9BQU8sWUFBWTtBQUduQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsRUFDbEIsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsU0FBUyxDQUFDLE9BQU8sTUFBTTtBQUFBLElBQ3pCO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUM7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNOLFNBQVMsQ0FBQztBQUFBO0FBQUEsUUFFVixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGNBQUksVUFBVSxTQUFTLGFBQWE7QUFDbEMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU8sVUFBVSxRQUFRO0FBQUEsUUFDM0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxjQUFjO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
