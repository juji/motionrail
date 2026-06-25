# MotionRail — Agent Readiness Plan

Implement all isitagentready.com checks for motionrail.jujiplay.com.

## 1. Discoverability

| Check        | File                    | Notes                                                                                           |
| ------------ | ----------------------- | ----------------------------------------------------------------------------------------------- |
| robots.txt   | `doc/public/robots.txt` | RFC 9309, AI crawler entries, Content-Signal, sitemap                                           |
| Sitemap      | VitePress built-in      | Enable sitemap plugin in `config.mts`                                                           |
| Link headers | `doc/public/_headers`   | `describedby`, `service-doc`, `api-catalog` Link relations                                      |
| DNS-AID      | Cloudflare DNS          | `_mcp._agents.motionrail.jujiplay.com` + `_index._agents.motionrail.jujiplay.com` HTTPS records |

## 2. Content Accessibility

| Check               | Action                                                                                                           | Files                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Markdown for Agents | Pages Function middleware — intercept `Accept: text/markdown`, extract content, convert to markdown via turndown | `doc/functions/_middleware.ts` → esbuild bundle → `doc/functions/_middleware.js` |
| llms.txt            | Already generated in `buildEnd` hook                                                                             | `.vitepress/dist/llms.txt`                                                       |
| llms-full.txt       | Add to `buildEnd` hook — concatenate all doc markdown                                                            | `.vitepress/dist/llms-full.txt`                                                  |

## 3. Bot Access Control

| Check           | In                                                                      |
| --------------- | ----------------------------------------------------------------------- |
| AI bot rules    | `robots.txt` — GPTBot, Claude-Web, etc.                                 |
| Content Signals | `robots.txt` — `Content-Signal: ai-train=yes, search=yes, ai-input=yes` |

## 4. Protocol Discovery

| Check           | File                                             | Notes                                                                                                                                                           |
| --------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MCP Server Card | `doc/public/.well-known/mcp/server-card.json`    | SEP-2127, remotes → `/mcp`                                                                                                                                      |
| Agent Skills    | `doc/public/.well-known/agent-skills/index.json` | v0.2.0, empty skills for now                                                                                                                                    |
| API Catalog     | `doc/public/.well-known/api-catalog`             | RFC 9727 linkset                                                                                                                                                |
| MCP Server      | `doc/functions/mcp.ts`                           | 3 tools: `get_package_info` (npm), `get_build_status` (GitHub Actions), `search_docs` (via llms-full.txt). Pure Workers fetch(), no SDK needed. Path: POST /mcp |
| WebMCP          | Skip                                             | Static docs site; MCP + Markdown for Agents covers agent needs                                                                                                  |
| OAuth / A2A     | Skip                                             | Public docs site, no auth                                                                                                                                       |

## 5. Commerce

Skip all — OSS library, free.

## Files to Create

```
doc/
├── agent-readiness.md                    (this file)
├── public/
│   ├── robots.txt
│   ├── _headers
│   └── .well-known/
│       ├── api-catalog
│       ├── agent-skills/
│       │   └── index.json
│       └── mcp/
│           └── server-card.json
├── functions/
│   ├── _middleware.ts                    (source: Markdown for Agents Pages Function)
│   └── mcp.ts                           (MCP server)
├── scripts/
│   └── middleware.ts                     (duplicate source for esbuild bundling)
```

## Build Pipeline Changes

### doc/package.json

```json
{
  "scripts": {
    "build": "vitepress build && esbuild scripts/middleware.ts --bundle --platform=neutral --main-fields=module,main --outfile=functions/_middleware.js"
  },
  "devDependencies": {
    "esbuild": "^0.25.0",
    "@types/turndown": "^5.0.6"
  },
  "dependencies": {
    "turndown": "^7.2.4"
  }
}
```

### doc/.gitignore

Add `functions/*.js` to ignore bundled Pages Functions.

### doc/.vitepress/config.mts

Add llms-full.txt generation in `buildEnd` hook — read each sidebar doc's markdown, concatenate into single file at `path.join(outDir, "llms-full.txt")`.

## MCP Server Implementation

Same pattern as vistaview. Changes needed:

- Package name: `motionrail` (not `vistaview`)
- Repo: `juji/motionrail` (not `juji/vistaview`)
- Docs origin: `motionrail.jujiplay.com` (not `vistaview.jujiplay.com`)
- Search: read from `/llms-full.txt` instead of `/llms-full.txt`

## Cloudflare Pages Config

- Build command: `pnpm build` (from `doc/` directory)
- Build output: `.vitepress/dist/`
- Root directory: `doc/`
- Functions: auto-detected from `doc/functions/`
