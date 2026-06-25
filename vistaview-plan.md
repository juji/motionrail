# Integrate VistaView into MotionRail

MotionRail is a carousel library. VistaView is a lightbox library — same author, same monorepo pattern. The natural fit: add a `vistaview` extension so carousel items (images) can open in a VistaView lightbox on click.

## What It Does

A `vistaview` extension for MotionRail that connects the two libraries:

```ts
import { MotionRail } from "motionrail";
import { VistaView } from "motionrail/extensions/vistaview";
import "motionrail/style.css";

const carousel = new MotionRail(element, {
  breakpoints: [{ columns: 4, gap: "16px" }],
  extensions: [
    VistaView({
      // VistaView options passed through
      maxZoomLevel: 3,
      preloads: 2,
    }),
  ],
});
```

Clicking a carousel item opens it in a VistaView lightbox, navigating through all carousel items.

## Implementation

### 1. Create `extensions/vistaview/`

New extension package, same structure as `extensions/thumbnails/`:

```
extensions/vistaview/
├── package.json          # @motionrail/vistaview, deps: motionrail workspace:* + vistaview
├── src/
│   └── vistaview.ts      # Main extension logic
├── vite.config.ts
├── tsconfig.json
└── .gitignore
```

- [x] `extensions/vistaview/package.json`
- [x] `extensions/vistaview/src/vistaview.ts`
- [x] `extensions/vistaview/vite.config.ts`
- [x] `extensions/vistaview/tsconfig.json`
- [x] `extensions/vistaview/.gitignore`

### 2. Extension Logic

In `vistaview.ts`:

- Accept VistaView options + optional selector for which child elements to make clickable
- On init: query carousel items, attach click listeners
- On click: call `vistaView()` with the carousel's image items, open at clicked index
- On cleanup (destroy): destroy VistaView instance
- Keep in sync: if carousel items change (reset), reinitialize VistaView

- [x] Write extension logic in `extensions/vistaview/src/vistaview.ts`

### 3. Package Entry

Add to root `package.json` exports:

```json
"./extensions/vistaview": {
  "types": "./extensions/vistaview/dist/vistaview.d.ts",
  "import": "./extensions/vistaview/dist/vistaview.es.js",
  "require": "./extensions/vistaview/dist/vistaview.umd.js"
}
```

- [x] Update root `package.json` exports

### 4. Dev Examples

Add a `vistaview` page to each dev example directory, following the same pattern as `thumbnails`:

| Dev example | File                                           |     |
| ----------- | ---------------------------------------------- | --- |
| vanilla     | `dev/vanilla/extensions/vistaview.html`        | [x] |
| next        | `dev/next/app/vistaview/page.tsx`              | [x] |
| nuxt        | `dev/nuxt/app/pages/vistaview.vue`             | [x] |
| preact      | `dev/preact/src/pages/Vistaview.tsx`           | [x] |
| qwik        | `dev/qwik/src/routes/vistaview/index.tsx`      | [x] |
| solid       | `dev/solid/src/routes/vistaview.tsx`           | [x] |
| svelte      | `dev/svelte/src/routes/vistaview/+page.svelte` | [x] |

Each example imports `vistaview` as a dev dependency and wires it as an extension.

- [x] Add `vistaview` to each dev example's `package.json` devDependencies

### 5. Docs

- [x] Add `doc/docs/extensions/vistaview.md` with usage examples

## Dependencies

- `vistaview` as a peer dependency — users install it themselves alongside motionrail
- Docs must show the full install command: `npm install motionrail vistaview`

## Files to Create/Modify

| File                                    | Action            |
| --------------------------------------- | ----------------- |
| `extensions/vistaview/package.json`     | Create            |
| `extensions/vistaview/src/vistaview.ts` | Create            |
| `extensions/vistaview/vite.config.ts`   | Create            |
| `extensions/vistaview/tsconfig.json`    | Create            |
| `extensions/vistaview/.gitignore`       | Create            |
| `package.json` (root)                   | Add exports entry |
| `doc/docs/extensions/vistaview.md`      | Create            |

## Priority

Ship the extension first (core integration), docs second.

## Skipped

- Framework-specific components (React `<VistaView>` etc.) — add when users request it, the vanilla extension covers programmatic use
