// Vercel function behind https://agent-taste.vercel.app/mcp (Streamable HTTP, stateless).
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createServer, SITE, ENDPOINT, VERSION } from '../src/create-server.js';

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization, mcp-session-id, mcp-protocol-version, last-event-id',
  'access-control-expose-headers': 'mcp-session-id, mcp-protocol-version',
};

function withCors(res) {
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

// A browser opening the link gets a short page instead of a JSON-RPC error.
function landing() {
  const cmd = `claude mcp add --transport http taste ${ENDPOINT}`;
  return new Response(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Taste MCP endpoint</title>
<style>body{font:16px/1.6 ui-sans-serif,system-ui,sans-serif;background:#f6f4ef;color:#1c1b19;max-width:40rem;margin:0 auto;padding:12vh 24px}code{font:14px ui-monospace,Menlo,monospace;background:#ebe7de;padding:.6em .8em;border-radius:6px;display:block;overflow-x:auto}a{color:#1c1b19}</style>
<h1 style="font-weight:600;letter-spacing:-.02em">This is an MCP endpoint.</h1>
<p>Add it to Claude Code:</p><code>${cmd}</code>
<p>Docs and every other client: <a href="${SITE}/">${SITE.replace('https://', '')}</a></p>`, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

export async function handle(request) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method === 'GET') {
    if ((request.headers.get('accept') || '').includes('text/event-stream')) {
      return withCors(new Response(JSON.stringify({ jsonrpc: '2.0', error: { code: -32000, message: 'Stateless server: no standalone SSE stream. POST JSON-RPC instead.' }, id: null }), { status: 405, headers: { allow: 'POST, OPTIONS', 'content-type': 'application/json' } }));
    }
    if ((request.headers.get('accept') || '').includes('text/html')) return landing();
    return withCors(Response.json({ name: 'taste', version: VERSION, transport: 'streamable-http', endpoint: ENDPOINT, docs: SITE }));
  }
  const server = createServer();
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await server.connect(transport);
  try {
    return withCors(await transport.handleRequest(request));
  } finally {
    // Stateless: one server per request, closed once the JSON response is built.
    queueMicrotask(() => server.close().catch(() => {}));
  }
}

export const GET = handle;
export const POST = handle;
export const DELETE = handle;
export const OPTIONS = handle;
