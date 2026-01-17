import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import solidPlugin from "vite-plugin-solid";
import vuePlugin from "@vitejs/plugin-vue";
import { svelte as sveltePlugin } from "@sveltejs/vite-plugin-svelte";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isUMD = process.env.BUILD_UMD === "true";

export default defineConfig({
  plugins: [
    solidPlugin({
      include: /packages\/solid\/.*\.tsx$/,
    }),
    vuePlugin({
      include: /vue\.vue$/,
    }),
    sveltePlugin(),
    !isUMD &&
      dts({
        include: ["packages/**/*.ts", "packages/**/*.tsx", "packages/**/*.vue"],
        exclude: ["packages/**/*.svelte", "packages/**/*.d.ts"],
        rollupTypes: true,
        outDir: "dist",
        copyDtsFiles: false,
        strictOutput: true,
        logLevel: "silent",
      }),
  ],
  build: {
    emptyOutDir: !isUMD,
    lib: isUMD
      ? {
          entry: resolve(
            __dirname,
            process.env.ENTRY_PATH || "src/motionrail.ts",
          ),
          name: process.env.LIB_NAME || "MotionRail",
          formats: ["umd"],
        }
      : {
          entry: {
            motionrail: resolve(__dirname, "packages/main/src/motionrail.ts"),
            react: resolve(__dirname, "packages/react/src/index.tsx"),
            solid: resolve(__dirname, "packages/solid/src/index.tsx"),
            vue: resolve(__dirname, "packages/vue/src/index.ts"),
            // svelte: resolve(__dirname, "src/svelte.svelte"),
            // svelte5: resolve(__dirname, "src/svelte5.svelte"),
            "extensions/arrows": resolve(
              __dirname,
              "packages/main/src/extensions/arrows/main.ts",
            ),
            "extensions/arrows/style": resolve(
              __dirname,
              "packages/main/src/extensions/arrows/style.css",
            ),
            "extensions/dots": resolve(
              __dirname,
              "packages/main/src/extensions/dots/main.ts",
            ),
            "extensions/dots/style": resolve(
              __dirname,
              "packages/main/src/extensions/dots/style.css",
            ),
            "extensions/thumbnails": resolve(
              __dirname,
              "packages/main/src/extensions/thumbnails/main.ts",
            ),
            "extensions/thumbnails/style": resolve(
              __dirname,
              "packages/main/src/extensions/thumbnails/style.css",
            ),
            "extensions/logger": resolve(
              __dirname,
              "packages/main/src/extensions/logger.ts",
            ),
          },
          formats: ["es"],
        },
    cssCodeSplit: true,
    rollupOptions: {
      preserveEntrySignatures: "strict",
      external: [
        "react",
        "react/jsx-runtime",
        "solid-js",
        "solid-js/web",
        "solid-js/store",
        "vue",
        "svelte",
        // "svelte/internal",
        // "svelte/internal/client",
        // "svelte/internal/server",
        // "svelte/store",
        // "svelte/motion",
        // "svelte/transition",
        // "svelte/animate",
        // "svelte/easing",
      ],
      output: {
        manualChunks: (id) => {
          // Prevent automatic chunk splitting - keep all code in entry files
          return undefined;
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || "";
          if (name.endsWith(".css")) {
            const source = assetInfo.source?.toString() || "";
            // Route CSS based on content
            if (source.includes("motionrail-arrow")) {
              return "extensions/arrows/style.css";
            }
            if (source.includes("motionrail-dot")) {
              return "extensions/dots/style.css";
            }
            if (source.includes("motionrail-thumbnail")) {
              return "extensions/thumbnails/style.css";
            }
            return "style.css";
          }
          return "[name][extname]";
        },
        entryFileNames: (chunkInfo) => {
          if (isUMD) {
            return process.env.FILE_NAME + ".cjs";
          }
          return "[name].js";
        },
      },
    },
  },
});
