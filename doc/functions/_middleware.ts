import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});

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

  const pageUrl = `${url.protocol}//${url.host}${htmlPath}`;
  const response = await fetch(pageUrl);

  if (!response.ok) {
    return context.next();
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
