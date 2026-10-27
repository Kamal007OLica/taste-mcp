// Smoke test: node scripts/smoke.mjs [url]  (defaults to the stdio server)
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const url = process.argv[2];
const transport = url
  ? new StreamableHTTPClientTransport(new URL(url))
  : new StdioClientTransport({ command: process.execPath, args: [new URL('../bin/stdio.js', import.meta.url).pathname] });
const client = new Client({ name: 'smoke', version: '1.0.0' });
await client.connect(transport);

const ok = (label, cond, extra = '') => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${label} ${extra}`); if (!cond) process.exitCode = 1; };
const call = async (name, args) => (await client.callTool({ name, arguments: args })).content[0].text;

const instructions = client.getInstructions() || '';
ok('instructions', instructions.length > 500, `${instructions.length} chars`);
const { tools } = await client.listTools();
ok('tools', tools.length === 9, tools.map((t) => t.name).join(', '));
const { prompts } = await client.listPrompts();
ok('prompts', prompts.length === 3, prompts.map((p) => p.name).join(', '));
const { resources } = await client.listResources();
ok('resources', resources.length >= 1, `${resources.length}`);

const brief = await call('taste_brief', { task: 'landing page for a fintech budgeting app for students', stack: 'next.js tailwind shadcn' });
ok('taste_brief', brief.includes('# Taste brief') && brief.includes('Non-negotiables'), `${brief.length} chars`);
ok('get_guide', (await call('get_guide', { topic: 'core' })).includes('Core taste rules'));
const dir = await call('pick_direction', { product: 'developer tool for database monitoring', mood: 'technical precise' });
ok('pick_direction', dir.length > 100, dir.split('\n')[0]);
const sample = `<div class="bg-gradient-to-r from-purple-500 to-blue-500 text-center"><h1 class="bg-clip-text text-transparent">Unlock the power of AI 🚀</h1>
<button class="transition-all animate-bounce rounded-2xl shadow-xl">Get Started</button><button>Learn More</button>
<p style="font-family: Inter; color:#000; padding: 13px; margin: 7px; gap: 9px; padding: 22px; margin: 5px; padding: 3px 11px">Lorem ipsum dolor sit amet</p></div>`;
const aud = await call('audit_ui', { code: sample, filename: 'Hero.tsx' });
ok('audit_ui', /Score \*\*\d+\/100/.test(aud), aud.match(/Score \*\*\d+\/100\*\*[^\n]*/)?.[0]);
ok('find_components', (await call('find_components', { need: 'logo marquee' })).length > 50);
ok('search_design_db', (await call('search_design_db', { domain: 'typography', query: 'editorial serif elegant' })).includes('###'));
ok('search_design_db stack', (await call('search_design_db', { domain: 'stack', query: 'forms', stack: 'swiftui' })).includes('###'));
ok('list_sources', (await call('list_sources', {})).includes('Dimensional Drawing'));
const brands = await call('get_brand_reference', {});
ok('get_brand_reference list', brands.length > 50);
if (process.env.NET) ok('get_brand_reference fetch', (await call('get_brand_reference', { brand: 'linear' })).length > 1000);
const p = await client.getPrompt({ name: 'design', arguments: { task: 'a pricing page' } });
ok('prompt design', p.messages[0].content.text.includes('taste_brief'));
await client.close();
