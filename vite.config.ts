import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/motionrail.ts"),
      name: "MotionRail",
      fileName: "motionrail",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "style.css",
      },
    },
  },
});
