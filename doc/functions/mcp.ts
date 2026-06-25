interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string };
}

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
  env: Record<string, string>;
}): Promise<Response> {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let req: JsonRpcRequest;
  try {
    req = await context.request.json();
  } catch {
    return jsonResponse({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    });
  }

  if (req.jsonrpc !== "2.0" || !req.method) {
    return jsonResponse({
      jsonrpc: "2.0",
      id: req.id ?? null,
      error: { code: -32600, message: "Invalid request" },
    });
  }

  const origin = new URL(context.request.url).origin;

  try {
    switch (req.method) {
      case "get_package_info":
        return jsonResponse({
          jsonrpc: "2.0",
          id: req.id,
          result: await getPackageInfo(),
        });

      case "get_build_status":
        return jsonResponse({
          jsonrpc: "2.0",
          id: req.id,
          result: await getBuildStatus(),
        });

      case "search_docs":
        return jsonResponse({
          jsonrpc: "2.0",
          id: req.id,
          result: await searchDocs((req.params?.query as string) ?? "", origin),
        });

      default:
        return jsonResponse({
          jsonrpc: "2.0",
          id: req.id,
          error: { code: -32601, message: `Method not found: ${req.method}` },
        });
    }
  } catch (err) {
    return jsonResponse({
      jsonrpc: "2.0",
      id: req.id,
      error: {
        code: -32603,
        message: `Internal error: ${(err as Error).message}`,
      },
    });
  }
}

function jsonResponse(data: JsonRpcResponse): Response {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

async function getPackageInfo() {
  const res = await fetch("https://registry.npmjs.org/motionrail/latest");
  if (!res.ok) throw new Error("Failed to fetch package info");
  const pkg = await res.json();
  return {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    license: pkg.license,
    homepage: pkg.homepage,
    repository: pkg.repository?.url,
  };
}

async function getBuildStatus() {
  const res = await fetch(
    "https://api.github.com/repos/juji/motionrail/actions/runs?per_page=1&status=completed",
  );
  if (!res.ok) throw new Error("Failed to fetch build status");
  const data = await res.json();
  const run = data.workflow_runs?.[0];
  if (!run) return { status: "unknown" };
  return {
    status: run.conclusion,
    branch: run.head_branch,
    commit: run.head_sha?.slice(0, 7),
    updated_at: run.updated_at,
    url: run.html_url,
  };
}

async function searchDocs(query: string, origin: string) {
  if (!query.trim()) return { results: [] };

  const res = await fetch(`${origin}/llms-full.txt`);
  if (!res.ok) throw new Error("Failed to read documentation");
  const text = await res.text();

  const lines = text.split("\n");
  const results: Array<{ section: string; content: string; line: number }> = [];

  let currentSection = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("# ")) {
      currentSection = line.slice(2).trim();
    }
    if (line.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        section: currentSection,
        content: line.trim().slice(0, 200),
        line: i + 1,
      });
    }
  }

  return { results: results.slice(0, 20), total: results.length };
}
