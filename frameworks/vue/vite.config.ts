import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MotionRailVue",
      formats: ["es", "umd"],
      fileName: (format) => `vue.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "motionrail"],
      output: {
        globals: {
          vue: "Vue",
          motionrail: "MotionRail",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
