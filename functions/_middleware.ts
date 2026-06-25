const CONTENT_SELECTORS = [".vp-doc", ".VPHero", ".main", "article", "body"];

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}): Promise<Response> {
  const accept = context.request.headers.get("Accept") || "";
  if (!accept.includes("text/markdown")) {
    return context.next();
  }

  const url = new URL(context.request.url);
  let htmlPath = url.pathname;
  if (htmlPath.endsWith("/")) {
    htmlPath += "index.html";
  } else if (!htmlPath.endsWith(".html")) {
    htmlPath += ".html";
  }

  const response = await fetch(`${url.protocol}//${url.host}${htmlPath}`);
  if (!response.ok) return context.next();

  const html = await response.text();
  const markdown = extract(html);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "x-markdown-tokens": String(Math.round(markdown.length / 4)),
    },
  });
}

function extract(html: string): string {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ?? "";
  const desc =
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1]?.trim() ??
    "";

  let body = "";
  for (const sel of CONTENT_SELECTORS) {
    const match = html.match(
      new RegExp(`<${sel}\\b[^>]*>([\\s\\S]*?)<\\/${sel.split(".")[0]}>`, "i"),
    );
    if (match) {
      body = match[1];
      break;
    }
  }
  if (!body) body = html;

  const lines: string[] = [];
  if (title) lines.push(`# ${title}`, "");
  if (desc) lines.push(`> ${desc}`, "");

  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (_, c) => {
      const code = c
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
      return `\`\`\`\n${code}\n\`\`\``;
    })
    .replace(/<code>([^<]*)<\/code>/gi, "`$1`")
    .replace(/<a\s[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<img\s[^>]*src="([^"]*)"[^>]*>/gi, "![]($1)")
    .replace(/<h1[^>]*>/gi, "\n# ")
    .replace(/<h2[^>]*>/gi, "\n## ")
    .replace(/<h3[^>]*>/gi, "\n### ")
    .replace(/<h4[^>]*>/gi, "\n#### ")
    .replace(/<h5[^>]*>/gi, "\n##### ")
    .replace(/<h6[^>]*>/gi, "\n###### ")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<p[^>]*>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+/, "")
    .trim();

  if (text) lines.push(text);
  return lines.join("\n") + "\n";
}
