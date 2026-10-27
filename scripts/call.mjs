import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
const [url, name, args] = process.argv.slice(2);
const c = new Client({ name: 'call', version: '1' });
await c.connect(new StreamableHTTPClientTransport(new URL(url)));
const r = await c.callTool({ name, arguments: JSON.parse(args) });
console.log(r.content[0].text);
await c.close();
