import { copyFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const files = [
  { src: "src/svelte.d.ts", dest: "dist/svelte.d.ts" },
  { src: "src/svelte5.d.ts", dest: "dist/svelte5.d.ts" },
  { src: "src/vue.d.ts", dest: "dist/vue.d.ts" },
];

files.forEach(({ src, dest }) => {
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log(`Copied ${src} → ${dest}`);
});
