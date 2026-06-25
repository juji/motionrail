# MotionRail — Agent Readiness Checklist

## 1. Discoverability

- [x] `doc/public/robots.txt` — RFC 9309, AI crawler entries, Content-Signal, sitemap
- [x] Sitemap — generated in `buildEnd` hook (32 pages)
- [x] `doc/public/_headers` — `service-doc`, `api-catalog` Link relations
- [ ] DNS-AID — `_mcp._agents.motionrail.jujiplay.com` + `_index._agents.motionrail.jujiplay.com` HTTPS records (requires Cloudflare DNS)

## 2. Content Accessibility

- [x] Markdown for Agents — `functions/_middleware.ts` (Cloudflare Pages native TypeScript middleware)
- [x] `llms.txt` — generated in `buildEnd` hook
- [x] `llms-full.txt` — generated in `buildEnd` hook

## 3. Bot Access Control

- [x] AI bot rules in `robots.txt` — all bots allowed
- [x] Content Signals in `robots.txt` — `Content-Signal: ai-train=yes, search=yes, ai-input=yes`

## 4. Protocol Discovery

- [x] MCP Server Card — `doc/public/.well-known/mcp/server-card.json`
- [x] Agent Skills — `doc/public/.well-known/agent-skills/index.json`
- [x] API Catalog — `doc/public/.well-known/api-catalog`
- [x] MCP Server — `doc/functions/mcp.ts` (3 tools: `get_package_info`, `get_build_status`, `search_docs`)
- [x] ~~WebMCP~~ — skipped (static docs site)
- [x] ~~OAuth / A2A~~ — skipped (public docs site)

## 5. Commerce

- [x] ~~All~~ — skipped (OSS library, free)

## Build Pipeline

- [x] `doc/package.json` — added `turndown`, `@types/turndown`
- [x] `doc/scripts/middleware.ts` — source for Markdown for Agents middleware
- [x] `doc/.gitignore` — added `functions/*.js`
