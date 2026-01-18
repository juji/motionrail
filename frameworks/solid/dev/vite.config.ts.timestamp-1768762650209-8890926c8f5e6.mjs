// dev/vite.config.ts
import { defineConfig } from "file:///Users/juji/play/motionrail/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.0_less@4.5.1_lightningcss@1.30.2_sass@1.97.2_stylus@0.62.0_terser@5.46.0/node_modules/vite/dist/node/index.js";
import path from "node:path";
import solidPlugin from "file:///Users/juji/play/motionrail/node_modules/.pnpm/vite-plugin-solid@2.11.10_solid-js@1.9.10_vite@5.4.21_@types+node@20.19.0_less@4.5.1_li_7b41701c2a6cf6ae8fd15b4852072561/node_modules/vite-plugin-solid/dist/esm/index.mjs";
var __vite_injected_original_dirname = "/Users/juji/play/motionrail/frameworks/solid/dev";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__vite_injected_original_dirname, "../src")
    }
  },
  plugins: [
    solidPlugin(),
    {
      name: "Reaplace env variables",
      transform(code, id) {
        if (id.includes("node_modules")) {
          return code;
        }
        return code.replace(/process\.env\.SSR/g, "false").replace(/process\.env\.DEV/g, "true").replace(/process\.env\.PROD/g, "false").replace(/process\.env\.NODE_ENV/g, '"development"').replace(/import\.meta\.env\.SSR/g, "false").replace(/import\.meta\.env\.DEV/g, "true").replace(/import\.meta\.env\.PROD/g, "false").replace(/import\.meta\.env\.NODE_ENV/g, '"development"');
      }
    }
  ],
  server: {
    port: 3e3
  },
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGV2L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2p1amkvcGxheS9tb3Rpb25yYWlsL2ZyYW1ld29ya3Mvc29saWQvZGV2XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvanVqaS9wbGF5L21vdGlvbnJhaWwvZnJhbWV3b3Jrcy9zb2xpZC9kZXYvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2p1amkvcGxheS9tb3Rpb25yYWlsL2ZyYW1ld29ya3Mvc29saWQvZGV2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBzcmM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgc29saWRQbHVnaW4oKSxcbiAgICB7XG4gICAgICBuYW1lOiAnUmVhcGxhY2UgZW52IHZhcmlhYmxlcycsXG4gICAgICB0cmFuc2Zvcm0oY29kZSwgaWQpIHtcbiAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgIHJldHVybiBjb2RlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvZGVcbiAgICAgICAgICAucmVwbGFjZSgvcHJvY2Vzc1xcLmVudlxcLlNTUi9nLCAnZmFsc2UnKVxuICAgICAgICAgIC5yZXBsYWNlKC9wcm9jZXNzXFwuZW52XFwuREVWL2csICd0cnVlJylcbiAgICAgICAgICAucmVwbGFjZSgvcHJvY2Vzc1xcLmVudlxcLlBST0QvZywgJ2ZhbHNlJylcbiAgICAgICAgICAucmVwbGFjZSgvcHJvY2Vzc1xcLmVudlxcLk5PREVfRU5WL2csICdcImRldmVsb3BtZW50XCInKVxuICAgICAgICAgIC5yZXBsYWNlKC9pbXBvcnRcXC5tZXRhXFwuZW52XFwuU1NSL2csICdmYWxzZScpXG4gICAgICAgICAgLnJlcGxhY2UoL2ltcG9ydFxcLm1ldGFcXC5lbnZcXC5ERVYvZywgJ3RydWUnKVxuICAgICAgICAgIC5yZXBsYWNlKC9pbXBvcnRcXC5tZXRhXFwuZW52XFwuUFJPRC9nLCAnZmFsc2UnKVxuICAgICAgICAgIC5yZXBsYWNlKC9pbXBvcnRcXC5tZXRhXFwuZW52XFwuTk9ERV9FTlYvZywgJ1wiZGV2ZWxvcG1lbnRcIicpXG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sVUFBVTtBQUNqQixPQUFPLGlCQUFpQjtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxRQUFRO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sVUFBVSxNQUFNLElBQUk7QUFDbEIsWUFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU8sS0FDSixRQUFRLHNCQUFzQixPQUFPLEVBQ3JDLFFBQVEsc0JBQXNCLE1BQU0sRUFDcEMsUUFBUSx1QkFBdUIsT0FBTyxFQUN0QyxRQUFRLDJCQUEyQixlQUFlLEVBQ2xELFFBQVEsMkJBQTJCLE9BQU8sRUFDMUMsUUFBUSwyQkFBMkIsTUFBTSxFQUN6QyxRQUFRLDRCQUE0QixPQUFPLEVBQzNDLFFBQVEsZ0NBQWdDLGVBQWU7QUFBQSxNQUM1RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
