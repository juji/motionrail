import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/arrows.ts"),
      name: "MotionRailArrows",
      formats: ["es", "umd"],
      fileName: (format) => `arrows.${format}.js`,
    },
    rollupOptions: {
      external: ["motionrail"],
      output: {
        globals: {
          motionrail: "MotionRail",
        },        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css';
          }
          return '[name].[ext]';
        },      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
