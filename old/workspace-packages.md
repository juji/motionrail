# Workspace packages

This repo is set up as a pnpm workspace. The goal is to keep **one published package** (`motionrail`) while allowing framework wrappers and apps to live in the same repo.

## Current workspace packages (today)

These are included by [pnpm-workspace.yaml](pnpm-workspace.yaml):

- `motionrail` (root) — the published library package
- `doc/` — VitePress documentation site (depends on `motionrail` via `workspace:*`)
- `manual/next/` — Next.js manual/test app (depends on `motionrail` via `workspace:*`)
- `manual/solid/` — SolidStart manual/test app (depends on `motionrail` via `workspace:*`)
- `manual/svelte/` — SvelteKit manual/test app (depends on `motionrail` via `workspace:*`)
- `manual/svelte5/` — SvelteKit (Svelte 5) manual/test app (depends on `motionrail` via `workspace:*`)

## Internal build packages (in use)

These are also included by [pnpm-workspace.yaml](pnpm-workspace.yaml) and are used as the build source of truth:

- `packages/main/` — core carousel logic + extensions
- `packages/react/` — React wrapper
- `packages/solid/` — Solid wrapper
- `packages/vue/` — Vue wrapper
- `packages/svelte/` — Svelte (legacy) wrapper
- `packages/svelte5/` — Svelte 5 (runes) wrapper

## Notes

This setup keeps the structure:

- root `package.json` is `motionrail` and contains **all** `exports`
- each wrapper lives in `packages/<name>`
- only the root package is published

- The internal packages can be `"private": true` and never published.
- Builds should write outputs into a **single publish layout** (usually under `dist/`) that matches the root `exports` map, e.g. `dist/react/index.js`, `dist/svelte/index.js`, etc.
- Svelte exports should include a `"svelte"` condition in the root `exports` for best tooling support.
