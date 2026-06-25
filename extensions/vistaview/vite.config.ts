import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/vistaview.ts"),
      name: "MotionRail",
      formats: ["es", "umd"],
      fileName: (format) => `vistaview.${format}.js`,
    },
    rollupOptions: {
      external: ["motionrail", "vistaview"],
      output: {
        globals: {
          motionrail: "MotionRail",
          vistaview: "VistaView",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "style.css";
          }
          return "[name].[ext]";
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
