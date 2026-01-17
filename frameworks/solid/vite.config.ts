import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/main.tsx'),
      name: 'MotionRailSolid',
      formats: ['es', 'umd'],
      fileName: (format) => `solid.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js', 'solid-js/web', 'motionrail'],
      output: {
        globals: {
          'solid-js': 'Solid',
          'solid-js/web': 'SolidWeb',
          motionrail: 'MotionRail',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
