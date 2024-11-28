// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/arsen/OneDrive/Desktop/Projects/Nomad/WEB/QueueSystem/Queue-System-queue/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/arsen/OneDrive/Desktop/Projects/Nomad/WEB/QueueSystem/Queue-System-queue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///C:/Users/arsen/OneDrive/Desktop/Projects/Nomad/WEB/QueueSystem/Queue-System-queue/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/arsen/OneDrive/Desktop/Projects/Nomad/WEB/QueueSystem/Queue-System-queue/vite.config.ts";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      VueDevTools()
    ],
    define: {
      "process.env.NODE_ENV": `"${mode}"`
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhcnNlblxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXE5vbWFkXFxcXFdFQlxcXFxRdWV1ZVN5c3RlbVxcXFxRdWV1ZS1TeXN0ZW0tcXVldWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFyc2VuXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcUHJvamVjdHNcXFxcTm9tYWRcXFxcV0VCXFxcXFF1ZXVlU3lzdGVtXFxcXFF1ZXVlLVN5c3RlbS1xdWV1ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYXJzZW4vT25lRHJpdmUvRGVza3RvcC9Qcm9qZWN0cy9Ob21hZC9XRUIvUXVldWVTeXN0ZW0vUXVldWUtU3lzdGVtLXF1ZXVlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgVnVlRGV2VG9vbHMoKSxcclxuICAgIF0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogYFwiJHttb2RlfVwiYCxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeWIsU0FBUyxlQUFlLFdBQVc7QUFFNWQsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBSnFRLElBQU0sMkNBQTJDO0FBTzlVLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTix3QkFBd0IsSUFBSSxJQUFJO0FBQUEsSUFDbEM7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFFRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
