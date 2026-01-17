import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/main.ts'),
      name: 'MotionRailLit',
      formats: ['es', 'umd'],
      fileName: (format) => `lit.${format}.js`,
    },
    rollupOptions: {
      external: ['lit', 'lit/decorators.js', 'motionrail'],
      output: {
        globals: {
          lit: 'Lit',
          'lit/decorators.js': 'LitDecorators',
          motionrail: 'MotionRail',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
