import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
  env: Record<string, string>;
}): Promise<Response> {
  const { request, next } = context;
  const accept = request.headers.get("Accept") || "";

  if (!accept.includes("text/markdown")) {
    return next();
  }

  const url = new URL(request.url);

  // Rewrite /docs/foo to /docs/foo.html for the static file
  let htmlPath = url.pathname;
  if (htmlPath.endsWith("/")) {
    htmlPath += "index.html";
  } else if (!htmlPath.endsWith(".html")) {
    htmlPath += ".html";
  }

  // Reconstruct the full URL for the static page
  const pageUrl = `${url.protocol}//${url.host}${htmlPath}`;
  const response = await fetch(pageUrl);

  if (!response.ok) {
    return next();
  }

  const html = await response.text();
  const markdown = turndown.turndown(html);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
