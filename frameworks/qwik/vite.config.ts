import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [],
  // plugins: [qwikVite()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/main.tsx'),
      name: 'MotionRailQwik',
      formats: ['es'],
      fileName: (format) => `qwik.${format}.js`,
    },
    rollupOptions: {
      external: ['@builder.io/qwik', '@builder.io/qwik-city', '@qwik-city-plan', '@qwik-city-sw-register', 'motionrail'],
      output: {
        globals: {
          '@builder.io/qwik': 'Qwik',
          motionrail: 'MotionRail',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
