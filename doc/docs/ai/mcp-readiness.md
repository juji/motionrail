# MCP Readiness

MotionRail exposes an MCP server for AI agents to interact with the library documentation and package information.

## MCP Server

- **Endpoint**: `POST /mcp`
- **Protocol**: JSON-RPC 2.0

### Tools

| Tool               | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `get_package_info` | Returns latest version, description, license, and repository URL from npm |
| `get_build_status` | Returns the latest GitHub Actions build status, branch, and commit        |
| `search_docs`      | Searches `llms-full.txt` for matching documentation content               |

### Example

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "search_docs",
  "params": { "query": "autoplay" }
}
```

### Client Configuration

To use the MCP server in your AI client, add to your MCP configuration:

```json
{
  "mcpServers": {
    "motionrail": {
      "url": "https://motionrail.jujiplay.com/mcp"
    }
  }
}
```

## Discovery

MotionRail implements agent discovery standards:

| Resource        | Path                                   |
| --------------- | -------------------------------------- |
| MCP Server Card | `/.well-known/mcp/server-card.json`    |
| Agent Skills    | `/.well-known/agent-skills/index.json` |
| API Catalog     | `/.well-known/api-catalog`             |

## Content for AI

- [`llms.txt`](/llms.txt) — Overview and links to individual documentation sections
- [`llms-full.txt`](/llms-full.txt) — Complete documentation in a single file

For requesting pages as markdown, see [Markdown for Agents](/docs/ai/markdown-for-agents).
