# Markdown for Agents

Any documentation page on MotionRail can be requested as markdown by sending an `Accept: text/markdown` header. A Cloudflare Pages middleware converts the HTML to markdown on-the-fly using [Turndown](https://github.com/mixmark-io/turndown).

## Usage

```bash
curl -H "Accept: text/markdown" https://motionrail.jujiplay.com/docs/installation
```

```bash
curl -H "Accept: text/markdown" https://motionrail.jujiplay.com/docs/api/class/motionrail
```

```bash
curl -H "Accept: text/markdown" https://motionrail.jujiplay.com/docs/quick-start
```

## How it works

1. Request comes in with `Accept: text/markdown`
2. The Pages Function middleware intercepts it
3. Fetches the rendered HTML page
4. Converts HTML to markdown via Turndown
5. Returns `Content-Type: text/markdown`

## Use cases

- AI agents consuming documentation for context
- Integrating documentation into training pipelines
- Getting a plain-text version of any page
