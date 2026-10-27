// Local copy of the Vercel endpoint: http://localhost:8787/mcp
import { serve } from '@hono/node-server';
import { handle } from '../api/mcp.js';

const port = Number(process.env.PORT || 8787);
serve({ fetch: (req) => (new URL(req.url).pathname === '/mcp' ? handle(req) : new Response('Not found', { status: 404 })), port });
console.log(`taste MCP on http://localhost:${port}/mcp`);
