import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            const source = assetInfo.source?.toString() || "";
            // Arrows extension CSS
            if (source.includes("motionrail-arrow")) {
              return "extensions/arrows/style.css";
            }
            // Main library CSS
            return "style.css";
          }
          return "[name][extname]";
        },
        entryFileNames: "[name].js",
      },
    },
  },
});
