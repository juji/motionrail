import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/dots.ts"),
      name: "MotionRailDots",
      formats: ["es", "umd"],
      fileName: (format) => `dots.${format}.js`,
    },
    rollupOptions: {
      external: ["motionrail"],
      output: {
        globals: {
          motionrail: "MotionRail",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
