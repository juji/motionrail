import { defineConfig } from "vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import solidPlugin from "vite-plugin-solid";
import vuePlugin from "@vitejs/plugin-vue";
import { svelte as sveltePlugin } from "@sveltejs/vite-plugin-svelte";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isUMD = process.env.BUILD_UMD === "true";

export default defineConfig({
  plugins: [
    solidPlugin({
      include: /solid\.tsx$/,
    }),
    vuePlugin({
      include: /vue\.vue$/,
    }),
    sveltePlugin({
      include: /svelte\.svelte$/,
    }),
  ],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: undefined,
  },
  build: {
    emptyOutDir: false,
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
            motionrail: resolve(__dirname, "src/motionrail.ts"),
            react: resolve(__dirname, "src/react.tsx"),
            solid: resolve(__dirname, "src/solid.tsx"),
            vue: resolve(__dirname, "src/vue.vue"),
            svelte: resolve(__dirname, "src/svelte.svelte"),
            "extensions/arrows": resolve(
              __dirname,
              "src/extensions/arrows/main.ts",
            ),
            "extensions/arrows/style": resolve(
              __dirname,
              "src/extensions/arrows/style.css",
            ),
            "extensions/dots": resolve(
              __dirname,
              "src/extensions/dots/main.ts",
            ),
            "extensions/dots/style": resolve(
              __dirname,
              "src/extensions/dots/style.css",
            ),
            "extensions/thumbnails": resolve(
              __dirname,
              "src/extensions/thumbnails/main.ts",
            ),
            "extensions/thumbnails/style": resolve(
              __dirname,
              "src/extensions/thumbnails/style.css",
            ),
            "extensions/logger": resolve(__dirname, "src/extensions/logger.ts"),
          },
          formats: ["es"],
        },
    cssCodeSplit: true,
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "solid-js",
        "solid-js/web",
        "solid-js/store",
        "vue",
        "svelte",
        "svelte/internal",
      ],
      output: {
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
