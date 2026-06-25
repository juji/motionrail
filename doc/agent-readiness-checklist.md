# MotionRail — Agent Readiness Checklist

## 1. Discoverability

- [ ] `doc/public/robots.txt` — RFC 9309, AI crawler entries, Content-Signal, sitemap
- [ ] Sitemap — enable VitePress sitemap plugin in `config.mts`
- [ ] `doc/public/_headers` — `describedby`, `service-doc`, `api-catalog` Link relations
- [ ] DNS-AID — `_mcp._agents.motionrail.jujiplay.com` + `_index._agents.motionrail.jujiplay.com` HTTPS records

## 2. Content Accessibility

- [ ] Markdown for Agents — Pages Function middleware (`doc/functions/_middleware.ts`)
- [x] `llms.txt` — generated in `buildEnd` hook
- [x] `llms-full.txt` — generated in `buildEnd` hook

## 3. Bot Access Control

- [ ] AI bot rules in `robots.txt` — GPTBot, Claude-Web, etc.
- [ ] Content Signals in `robots.txt` — `Content-Signal: ai-train=yes, search=yes, ai-input=yes`

## 4. Protocol Discovery

- [ ] MCP Server Card — `doc/public/.well-known/mcp/server-card.json`
- [ ] Agent Skills — `doc/public/.well-known/agent-skills/index.json`
- [ ] API Catalog — `doc/public/.well-known/api-catalog`
- [ ] MCP Server — `doc/functions/mcp.ts` (3 tools: `get_package_info`, `get_build_status`, `search_docs`)
- [x] ~~WebMCP~~ — skipped (static docs site)
- [x] ~~OAuth / A2A~~ — skipped (public docs site)

## 5. Commerce

- [x] ~~All~~ — skipped (OSS library, free)

## Build Pipeline

- [ ] `doc/package.json` — add `esbuild`, `turndown`, `@types/turndown`
- [ ] `doc/scripts/middleware.ts` — duplicate middleware source for esbuild bundling
- [ ] `doc/.gitignore` — add `functions/*.js`
