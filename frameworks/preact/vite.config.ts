import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/main.tsx"),
      name: "MotionRailPreact",
      formats: ["es", "umd"],
      fileName: (format) => `preact.${format}.js`,
    },
    rollupOptions: {
      external: ["preact", "preact/hooks", "preact/jsx-runtime", "motionrail"],
      output: {
        globals: {
          preact: "Preact",
          "preact/hooks": "PreactHooks",
          "preact/jsx-runtime": "PreactJSXRuntime",
          motionrail: "MotionRail",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
