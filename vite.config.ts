import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { copyFileSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: {
        motionrail: resolve(__dirname, "src/motionrail.ts"),
        "extensions/arrows": resolve(
          __dirname,
          "src/extensions/arrows/main.ts",
        ),
        "extensions/logger": resolve(__dirname, "src/extensions/logger.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "style.css",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    {
      name: "copy-extension-styles",
      closeBundle() {
        mkdirSync(resolve(__dirname, "dist/extensions/arrows"), {
          recursive: true,
        });
        copyFileSync(
          resolve(__dirname, "src/extensions/arrows/style.css"),
          resolve(__dirname, "dist/extensions/arrows/style.css"),
        );
      },
    },
  ],
});
