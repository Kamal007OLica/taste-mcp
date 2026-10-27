import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import kb from './kb.generated.js';
import { rank, tokens } from './search.js';
import { audit } from './audit.js';

export const VERSION = '1.0.0';
export const SITE = 'https://kamal007olica.github.io/taste-mcp';
export const ENDPOINT = 'https://agent-taste.vercel.app/mcp';

const text = (s) => ({ content: [{ type: 'text', text: s }] });
const list = (v) => (Array.isArray(v) ? v.join(', ') : v || '');
const clip = (s, n) => (s && s.length > n ? `${s.slice(0, n - 1)}…` : s || '');

// What each kind of surface needs beyond the core rules, and which guides go deeper.
const SURFACES = {
  landing: {
    guides: ['layouts', 'typography', 'copy', 'motion', 'components'],
    must: [
      'Hero states one specific promise in under 10 words and shows the real product (screenshot, live demo or interactive), never an abstract blob.',
      'One primary CTA verb, repeated identically down the page; a single quiet secondary at most.',
      'One idea per section, and vary section anatomy: never three identical icon-title-text cards in a row.',
      'Proof is specific (named customers, real numbers with units, dated quotes) or it is cut.',
      'Exactly one signature moment (hero effect, scroll scene or type treatment); everything else stays calm.',
    ],
  },
  app: {
    guides: ['states-accessibility', 'layout-spacing', 'components', 'motion'],
    must: [
      'Design every state: empty (with a first action), loading (skeletons shaped like the content), error (what happened plus how to fix it), success, disabled.',
      'Density follows the job: 32 to 36px rows for data tools, 44px+ for touch, 13 to 14px UI text.',
      'Keyboard first: visible :focus-visible rings, logical tab order, Escape closes, Cmd/Ctrl+K if there is search.',
      'No animation on high-frequency actions; 150 to 200ms ease-out for the rest, transform and opacity only.',
      'Numbers use tabular figures and right-align in tables; units and timestamps are consistent.',
    ],
  },
  dashboard: {
    guides: ['dark-mode-dataviz', 'states-accessibility', 'layout-spacing'],
    must: [
      'Lead with the 3 to 5 numbers a user acts on; everything else is drill-down.',
      'Charts: direct labels over legends, muted gridlines, one highlight colour, no 3D or gratuitous gradients.',
      'Tabular numerals, right-aligned figures, consistent units and deltas with sign and colour plus an icon (not colour alone).',
      'Filters and date range live in one predictable bar; state persists in the URL.',
      'Empty and loading states for every widget; never a blank card.',
    ],
  },
  mobile: {
    guides: ['responsive-mobile', 'native-feel', 'states-accessibility', 'motion'],
    must: [
      'Touch targets at least 44x44pt (iOS) / 48x48dp (Android); primary actions in the bottom thumb zone.',
      'Respect safe areas (env(safe-area-inset-*)) and the platform: sheets, large titles, native-feeling springs.',
      'Body text 16px minimum (17pt iOS); never let inputs zoom the page.',
      'Gestures have visible alternatives and respond to velocity; haptics only for meaningful moments.',
      'Test on a real 390px viewport and a small 360px Android one.',
    ],
  },
  portfolio: {
    guides: ['layouts', 'typography', 'imagery-texture', 'motion'],
    must: [
      'The work is the hero: large, real images; type and chrome get out of the way.',
      'A point of view in the first line (who you are, what you make, for whom), not "Hi, I am a passionate designer".',
      'Case studies show decisions and outcomes with numbers, not just final screens.',
      'One typographic voice used with conviction; editorial rhythm with generous whitespace.',
      'Motion supports reading order; nothing loops forever.',
    ],
  },
};
const SURFACE_ALIASES = { website: 'landing', marketing: 'landing', saas: 'landing', web: 'landing', 'web-app': 'app', tool: 'app', admin: 'dashboard', analytics: 'dashboard', ios: 'mobile', android: 'mobile', 'react-native': 'mobile', expo: 'mobile', flutter: 'mobile', editorial: 'portfolio', blog: 'portfolio', personal: 'portfolio' };

const STACK_ALIASES = {
  nextjs: ['next', 'nextjs', 'next.js'], react: ['react', 'vite'], shadcn: ['shadcn', 'radix'], 'html-tailwind': ['tailwind', 'html', 'css'],
  svelte: ['svelte', 'sveltekit'], vue: ['vue'], nuxtjs: ['nuxt'], 'nuxt-ui': ['nuxt-ui'], astro: ['astro'], angular: ['angular'],
  swiftui: ['swift', 'swiftui', 'ios'], flutter: ['flutter', 'dart'], 'react-native': ['react-native', 'expo', 'rn'],
  'jetpack-compose': ['compose', 'jetpack', 'kotlin', 'android'], threejs: ['three', 'threejs', 'webgl', 'r3f'], laravel: ['laravel', 'php'],
};

function resolveStacks(stack) {
  if (!stack) return [];
  const t = String(stack).toLowerCase();
  return Object.entries(STACK_ALIASES)
    .filter(([key, words]) => kb.db.stacks[key] && words.some((w) => new RegExp(`(^|[^a-z])${w.replace('.', '\\.')}($|[^a-z])`).test(t)))
    .map(([key]) => key);
}

function resolveSurface(surface, task) {
  const s = String(surface || '').toLowerCase();
  if (SURFACES[s]) return s;
  if (SURFACE_ALIASES[s]) return SURFACE_ALIASES[s];
  const t = tokens(task);
  for (const key of Object.keys(SURFACES)) if (t.includes(key)) return key;
  for (const [alias, key] of Object.entries(SURFACE_ALIASES)) if (t.includes(alias)) return key;
  if (/landing|homepage|hero|launch|waitlist/.test(String(task).toLowerCase())) return 'landing';
  return null;
}

// Words that describe the surface, not the product; they drown out the product match.
const SURFACE_WORDS = new Set(['landing', 'page', 'homepage', 'website', 'site', 'web', 'app', 'application', 'screen', 'ui', 'ux', 'mobile', 'dashboard', 'ios', 'android', 'redesign', 'design', 'modern', 'clean', 'simple', 'beautiful', 'new', 'hero', 'section', 'component', 'components', 'pricing', 'onboarding', 'signup', 'login']);
const SYNONYMS = [
  [/^(budget|budgeting|expense|spending|saving|money|bank|banking|payment|invoice|invoicing|accounting|finance|financial|wallet|fintech|crypto|billing|payroll|tax|loan|trading|invest|investing)$/, 'fintech finance money budget invoicing'],
  [/^(course|learning|education|edtech|tutor|tutoring|study|exam|classroom|teacher|school)$/, 'education learning'],
  [/^(kid|kids|child|children|family|parent|parenting|toddler)$/, 'kids family'],
  [/^(dev|developer|api|sdk|cli|database|infra|devops|observability|postgres|terminal|deploy|hosting|monitoring|logging)$/, 'developer tool api database infra'],
  [/^(ai|llm|agent|agents|chatbot|gpt|copilot|assistant|model|prompt|rag)$/, 'ai llm assistant'],
  [/^(health|medical|clinic|doctor|medication|telehealth|patient|pharmacy|care)$/, 'health care clinic'],
  [/^(wellness|meditation|sleep|mindfulness|journal|journaling|breathing|breathwork|therapy|fitness|yoga|habit|focus)$/, 'wellness meditation sleep'],
  [/^(shop|store|ecommerce|commerce|dtc|retail|checkout|cart)$/, 'ecommerce shop'],
  [/^(food|restaurant|recipe|grocery|coffee|cafe|drink|delivery|bakery)$/, 'food grocery restaurant'],
  [/^(game|gaming|esport|esports|arcade)$/, 'game gaming'],
  [/^(portfolio|designer|freelancer|freelance|casestudy|showcase)$/, 'portfolio personal creative showcase'],
  [/^(photo|photography|photographer|film|video|music|audio|podcast|streaming)$/, 'video music media photographer'],
  [/^(fashion|beauty|luxury|jewelry|jewellery|hotel|fragrance|boutique)$/, 'fashion luxury boutique'],
  [/^(hardware|robotics|robot|manufacturing|climate|energy|aerospace|engineering)$/, 'hardware deep tech engineering'],
  [/^(marketplace|listing|listings|directory|job|jobs|rental|property|classifieds)$/, 'marketplace listings directory'],
  [/^(news|blog|newsletter|magazine|publication|media|editorial|writer)$/, 'newsletter publication media'],
  [/^(admin|analytics|crm|internal|ops|console|backoffice|metrics|kpi)$/, 'dashboard analytics admin'],
  [/^(saas|b2b|startup|smb|scheduling|hr)$/, 'saas b2b'],
  [/^(social|community|creator|genz|forum|chat)$/, 'community creator social'],
];
const SURFACE_DEFAULT = { landing: 'swiss-field', app: 'instrument-panel', dashboard: 'instrument-panel', mobile: 'slow-light', portfolio: 'proof-sheet' };

function productQuery(text) {
  const words = tokens(text).filter((t) => !SURFACE_WORDS.has(t));
  const extra = words.flatMap((w) => SYNONYMS.filter(([re]) => re.test(w)).map(([, add]) => add));
  return [...words, ...extra].join(' ');
}

function readableRules(raw) {
  try {
    const obj = JSON.parse(raw);
    return Object.entries(obj).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${[].concat(v).map((x) => String(x).replace(/^[a-z]+:/, '').replace(/-/g, ' ')).join(', ')}`).join('; ');
  } catch {
    return raw;
  }
}

const DIRECTION_FIELDS = { bestFor: 3, mood: 2, genre: 2, name: 1, signature: 1 };

function directionCss(d) {
  const p = d.palette || {};
  const dark = p.dark || {};
  const lines = (pal) => ['bg', 'surface', 'text', 'muted', 'border', 'accent', 'accentInk']
    .filter((k) => pal[k]).map((k) => `  --${k === 'accentInk' ? 'accent-ink' : k}: ${pal[k]};`).join('\n');
  const ease = d.motion?.easing ? `\n  --ease: ${d.motion.easing};` : '';
  return `:root {\n${lines(p)}${ease}\n}\n${Object.keys(dark).length ? `@media (prefers-color-scheme: dark) {\n  :root {\n${lines(dark).replace(/^/gm, '  ')}\n  }\n}` : ''}`.trim();
}

function formatDirection(d, full = true) {
  if (!full) return `- **${d.name}** (\`${d.id}\`, ${d.genre}): ${d.signature}. Best for ${list(d.bestFor)}.`;
  const t = d.type || {};
  const fonts = t.googleFonts ? `\n\n\`\`\`html\n<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?${t.googleFonts.replace(/&display=swap$/, '')}&display=swap" rel="stylesheet">\n\`\`\`` : '';
  return [
    `## ${d.name} (\`${d.id}\`) · ${d.genre}`,
    `**Signature move:** ${d.signature}`,
    `**Best for:** ${list(d.bestFor)}  \n**Mood:** ${list(d.mood)}  \n**Avoid for:** ${list(d.avoidFor)}`,
    `### Type\n- Display: ${t.display}\n- Body: ${t.body}${t.mono ? `\n- Mono: ${t.mono}` : ''}\n- Scale: ${t.scale}\n- Tracking: ${t.tracking}${fonts}`,
    `### Colour tokens (contrast-checked, light + dark)\n\`\`\`css\n${directionCss(d)}\n\`\`\``,
    `### Shape, space, motion\n- Radius: ${d.shape?.radius}\n- Lines: ${d.shape?.borders}\n- Shadow: ${d.shape?.shadow}\n- Spacing: ${d.spacing}\n- Motion: ${d.motion?.character} Easing \`${d.motion?.easing}\`, durations ${d.motion?.durations}.`,
    d.layout?.length ? `### Layouts that suit it\n${list(d.layout)} (see \`get_guide("layouts")\`)` : '',
    d.doNot?.length ? `### Do not\n${d.doNot.map((x) => `- ${x}`).join('\n')}` : '',
  ].filter(Boolean).join('\n\n');
}

function formatRow(row, maxField = 320) {
  return Object.entries(row)
    .filter(([k, v]) => v && !/^(Style ID|Pattern ID|Status|Parent Style ID|Replacement Domain|Replacement ID|Aliases)$/.test(k))
    .map(([k, v]) => `- **${k}:** ${clip(v, maxField)}`)
    .join('\n');
}

function findDirection(id) {
  const key = String(id || '').toLowerCase().trim();
  return kb.directions.find((d) => d.id === key) || kb.directions.find((d) => d.name.toLowerCase() === key);
}

function designMd({ product, direction, description }) {
  const d = direction;
  const p = d.palette || {}, t = d.type || {};
  const family = (s) => String(s || '').replace(/\s+\d{3}.*$/, '').replace(/\s*\(.*\)$/, '').split(/,| \+ /)[0].trim();
  const fm = [
    '---',
    `name: ${product}`,
    `description: ${description || `${product}, built in the ${d.name} direction.`}`,
    'colors:',
    ...['bg', 'surface', 'text', 'muted', 'border', 'accent', 'accentInk'].filter((k) => p[k]).map((k) => `  ${k === 'accentInk' ? 'on-accent' : k}: "${p[k]}"`),
    'typography:',
    `  display:\n    fontFamily: ${family(t.display)}`,
    `  body:\n    fontFamily: ${family(t.body)}`,
    ...(t.mono ? [`  mono:\n    fontFamily: ${family(t.mono)}`] : []),
    'rounded:',
    `  default: "${String(d.shape?.radius || '').match(/\d+px/)?.[0] || '8px'}"`,
    'spacing:',
    '  unit: "4px"',
    '---',
  ].join('\n');
  return `${fm}

# ${product}: design system

## Overview
${description || product} uses the **${d.name}** direction (${d.genre}). Mood: ${list(d.mood)}.
Signature move: ${d.signature}.

## Colors
${['bg', 'surface', 'text', 'muted', 'border', 'accent', 'accentInk'].filter((k) => p[k]).map((k) => `- **${k}** \`${p[k]}\``).join('\n')}
Dark mode: ${p.dark ? Object.entries(p.dark).map(([k, v]) => `${k} \`${v}\``).join(', ') : 'derive by lifting surfaces, not inverting.'}
Accent covers at most 10% of any screen; neutrals carry the layout.

## Typography
- Display: ${t.display}
- Body: ${t.body}${t.mono ? `\n- Mono: ${t.mono}` : ''}
- Scale: ${t.scale}
- Tracking: ${t.tracking}

## Layout
- Spacing: ${d.spacing}
- Macrostructures: ${list(d.layout)}

## Elevation and shape
- Radius: ${d.shape?.radius}
- Lines: ${d.shape?.borders}
- Shadow: ${d.shape?.shadow}

## Motion
${d.motion?.character} Easing \`${d.motion?.easing}\`; durations ${d.motion?.durations}. Respect prefers-reduced-motion.

## Components
Buttons, inputs and cards inherit the radius and line rules above. Every interactive element has hover, focus-visible, active and disabled states.

## Do's and Don'ts
${(d.doNot || []).map((x) => `- Don't: ${x}`).join('\n')}
- Do: run \`audit_ui\` from the taste MCP on every changed screen before calling it done.
`;
}

export function createServer() {
  const server = new McpServer(
    { name: 'taste', title: 'Taste MCP', version: VERSION, websiteUrl: SITE },
    { instructions: kb.instructions, capabilities: { tools: {}, prompts: {}, resources: {} } },
  );
  const topics = kb.order;

  server.registerTool('taste_brief', {
    title: 'Start here: design brief for a UI task',
    description: 'Call this FIRST before building or restyling any UI (page, screen, component, landing, dashboard, app). Returns a tailored brief: a suggested art direction, what this product category needs, the non-negotiable taste rules, surface-specific must-dos, stack notes and the build-review loop. Condensed from 14 design repos (Impeccable, Hallmark, Taste Skill, UI UX Pro Max, Emil Kowalski, GSAP, Google DESIGN.md and more).',
    inputSchema: {
      task: z.string().describe('What you are building, in plain words, including the product and audience. e.g. "pricing page for a dev-tool that monitors Postgres"'),
      surface: z.string().optional().describe('landing | app | dashboard | mobile | portfolio (inferred if omitted)'),
      stack: z.string().optional().describe('e.g. "next.js + tailwind + shadcn", "swiftui", "react-native"'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ task, surface, stack }) => {
    const s = resolveSurface(surface, task);
    const q = productQuery(task);
    const product = rank(kb.db.product, q, { 'Product Type': 3, Keywords: 3 }, 1)[0]?.doc;
    const surfaceBias = s === 'dashboard' || s === 'app' ? ' dashboard admin analytics internal tool' : '';
    let dirs = rank(kb.directions, q + surfaceBias, DIRECTION_FIELDS, 3).map((r) => r.doc);
    if (!dirs.length && product) dirs = rank(kb.directions, productQuery(`${product['Product Type']} ${product.Keywords}`), DIRECTION_FIELDS, 3).map((r) => r.doc);
    const fallback = !dirs.length;
    if (fallback) dirs = [findDirection(SURFACE_DEFAULT[s] || 'swiss-field')].filter(Boolean);
    const reasoning = product && kb.db.reasoning.find((r) => r.UI_Category === product['Product Type']);
    const landing = s === 'landing' && product ? rank(kb.db.landing, product['Landing Page Pattern'], { 'Pattern Name': 3, Keywords: 1 }, 1)[0]?.doc : null;
    const stacks = resolveStacks(stack);
    const stackRows = stacks.flatMap((key) => kb.db.stacks[key]
      .filter((r) => /high|critical/i.test(r.Severity || ''))
      .slice(0, 4)
      .map((r) => `- [${key}] ${r.Guideline || r.Issue || r.Category}: ${clip(r.Do || r.Description, 180)}`));
    const surf = s ? SURFACES[s] : null;
    const guides = [...new Set([...(surf?.guides || ['layout-spacing', 'typography', 'color']), 'anti-slop', 'review'])].filter((g) => kb.guides[g]);

    const out = [
      `# Taste brief: ${task}`,
      `## 1. Direction\n${dirs.length ? `${fallback ? 'No close product match, so this is a safe default for the surface (call `pick_direction` with mood words to do better): ' : 'Suggested: '}**${dirs[0].name}** (\`${dirs[0].id}\`). ${dirs[0].signature}.\n${dirs.slice(1).map((d) => `Alternative: **${d.name}** (\`${d.id}\`): ${d.signature}.`).join('\n')}` : 'Call `pick_direction` with the product and mood.'}\nCommit to ONE direction and lock it: call \`pick_direction\` with its id for fonts, contrast-checked colour tokens, shape and motion, then \`write_design_md\` so every later session builds in the same style.`,
      product ? `## 2. What "${product['Product Type']}" products need (UI UX Pro Max data)\n${formatRow({ 'Primary style': product['Primary Style Recommendation'], 'Secondary styles': product['Secondary Styles'], 'Landing pattern': product['Landing Page Pattern'], 'Dashboard style': product['Dashboard Style (if applicable)'], 'Palette focus': product['Color Palette Focus'], 'Key considerations': product['Key Considerations'] })}${reasoning ? `\n- **Decision rules:** ${clip(readableRules(reasoning.Decision_Rules), 360)}\n- **Anti-patterns:** ${clip(reasoning.Anti_Patterns, 300)}` : ''}${landing ? `\n- **Section order (${landing['Pattern Name']}):** ${clip(landing['Section Order'], 300)}\n- **CTA placement:** ${clip(landing['Primary CTA Placement'], 200)}` : ''}\nTreat these as defaults to beat, not orders: if the direction above says otherwise, the direction wins.` : '',
      `## 3. Non-negotiables\n${kb.guides.core ? kb.guides.core.body.replace(/^#.*\n+(>.*\n+)*/, '').replace(/^## /gm, '### ') : ''}`,
      surf ? `## 4. For a ${s} surface\n${surf.must.map((m) => `- ${m}`).join('\n')}` : '',
      stackRows.length ? `## 5. Stack notes (${stacks.join(', ')})\n${stackRows.join('\n')}\nMore: \`search_design_db\` with domain "stack".` : '',
      `## Loop\n1. Lock the direction (\`pick_direction\`, \`write_design_md\`).\n2. Build with the tokens; reach for \`find_components\` only for the one signature moment.\n3. Run \`audit_ui\` on every file you touched; fix all high and medium findings.\n4. Screenshot at 390px and 1440px (light and dark if supported) and check it against \`get_guide("review")\`.\n5. Fix, re-screenshot, then report what changed.`,
      `## Go deeper\n${guides.map((g) => `- \`get_guide("${g}")\`: ${kb.guides[g].title}`).join('\n')}`,
    ];
    return text(out.filter(Boolean).join('\n\n'));
  });

  server.registerTool('get_guide', {
    title: 'Read a condensed design guide',
    description: `Returns one condensed guide in full. Topics: ${topics.map((id) => `${id} (${kb.guides[id].title})`).join('; ')}.`,
    inputSchema: { topic: z.enum(topics).describe('Guide id') },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ topic }) => text(kb.guides[topic].body));

  server.registerTool('pick_direction', {
    title: 'Pick an art direction with real tokens',
    description: `Choose a visual direction (font pairing, contrast-checked light and dark palette, radius, shadow, spacing, motion curve, signature move, layouts that suit it) instead of defaulting to generic SaaS. ${kb.directions.length} curated directions. Pass an id to get one in full, a product/mood to get the best matches, or nothing to list all.`,
    inputSchema: {
      id: z.string().optional().describe('Direction id from a previous call'),
      product: z.string().optional().describe('What the product is and who it is for'),
      mood: z.string().optional().describe('Words like calm, technical, playful, premium, warm, bold'),
      count: z.number().int().min(1).max(5).optional().describe('How many matches to return in full (default 1, plus 2 summaries)'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ id, product, mood, count = 1 }) => {
    if (id) {
      const d = findDirection(id);
      if (d) return text(`${formatDirection(d)}\n\nNext: \`write_design_md\` with direction "${d.id}" to persist it.`);
    }
    const q = productQuery(`${product || ''} ${mood || ''}`);
    if (!q) return text(`# ${kb.directions.length} directions\n${kb.directions.map((d) => formatDirection(d, false)).join('\n')}\n\nCall again with an id for full tokens.`);
    const hits = rank(kb.directions, q, DIRECTION_FIELDS, count + 2).map((r) => r.doc);
    if (!hits.length) return text(`No direct match for "${q}". All directions:\n${kb.directions.map((d) => formatDirection(d, false)).join('\n')}`);
    return text([
      ...hits.slice(0, count).map((d) => formatDirection(d)),
      hits.length > count ? `## Also consider\n${hits.slice(count).map((d) => formatDirection(d, false)).join('\n')}` : '',
      'Commit to one. Mixing directions is how pages end up looking generated.',
    ].filter(Boolean).join('\n\n'));
  });

  server.registerTool('write_design_md', {
    title: 'Generate a DESIGN.md for the repo',
    description: 'Produces a DESIGN.md (Google design.md format: YAML tokens + prose rules) filled from a direction, so the taste persists across sessions and agents. Save it at the repo root and follow it on every UI change. Read get_guide("design-md") for the format.',
    inputSchema: {
      product: z.string().describe('Product name'),
      direction: z.string().describe('Direction id from pick_direction'),
      description: z.string().optional().describe('One-sentence product description'),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ product, direction, description }) => {
    const d = findDirection(direction);
    if (!d) return text(`Unknown direction "${direction}". Ids: ${kb.directions.map((x) => x.id).join(', ')}`);
    return text(`Save this as DESIGN.md at the repo root:\n\n\`\`\`markdown\n${designMd({ product, direction: d, description })}\`\`\`\n\nThen lint it: \`npx -p @google/design.md designmd lint DESIGN.md\` (see get_guide("design-md")).`);
  });

  server.registerTool('audit_ui', {
    title: 'Audit UI code for AI-generated tells',
    description: `Static taste audit of HTML, CSS, JSX/TSX, Tailwind, Vue or Svelte source. Runs ${kb.detectors.length} detectors for AI-looking patterns (purple gradients, generic fonts, emoji icons, filler copy, missing focus states, transition-all...) plus palette, spacing, radius and type-scale sprawl checks. Returns a 0-100 score and fixes. Run it on every file you create or restyle, then fix high and medium findings.`,
    inputSchema: {
      code: z.string().max(400000).describe('Full source of one or more files (concatenate with a filename comment between them)'),
      filename: z.string().optional(),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ code, filename }) => {
    const { score, findings } = audit(code, kb.detectors);
    const verdict = score >= 90 ? 'clean' : score >= 75 ? 'decent, fix the highs' : score >= 55 ? 'reads as generated in places' : 'reads as AI-generated';
    const body = findings.slice(0, 20).map((f, i) =>
      `${i + 1}. **[${f.severity}] ${f.title}** (${f.area}${f.count > 1 ? `, ${f.count}x` : ''}${f.lines?.length ? `, line ${f.lines.join(', ')}` : ''})\n   Why: ${f.why}\n   Fix: ${f.fix}${f.sample ? `\n   Match: \`${f.sample.replace(/`/g, "'").replace(/\s+/g, ' ')}\`` : ''}`).join('\n');
    return text([
      `# Taste audit${filename ? `: ${filename}` : ''}\nScore **${score}/100** (${verdict}). ${findings.length} finding${findings.length === 1 ? '' : 's'}.`,
      body || 'No static tells found.',
      findings.length > 20 ? `…and ${findings.length - 20} more lower-priority findings.` : '',
      '## What a static scan cannot see\nScreenshot at 390px and 1440px and check: one clear focal point per screen (squint test), consistent alignment edges, spacing rhythm, contrast of text on images, every interactive state, motion timing. Use `get_guide("review")` for the full pass.',
    ].filter(Boolean).join('\n\n'));
  });

  server.registerTool('find_components', {
    title: 'Find a tasteful ready-made component',
    description: `Search ${kb.components.length} animated and polished components from React Bits, Magic UI and Canvas UI by need ("hero text reveal", "logo marquee", "number ticker", "dock", "aurora background"). Returns install commands and docs. Use for ONE signature moment per page, not everywhere.`,
    inputSchema: {
      need: z.string().describe('What the component should do'),
      library: z.enum(['react-bits', 'magic-ui', 'canvas-ui']).optional(),
      limit: z.number().int().min(1).max(15).optional(),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ need, library, limit = 6 }) => {
    const pool = library ? kb.components.filter((c) => c.library === library) : kb.components;
    const hits = rank(pool, need, { name: 3, tags: 3, slug: 2, category: 2, description: 2 }, limit);
    if (!hits.length) return text(`Nothing matched "${need}". Try plainer words (text, background, cards, marquee, cursor, button, 3d).`);
    return text([
      `# Components for "${need}"`,
      ...hits.map(({ doc: c }) => `### ${c.name} · ${c.library} · ${c.category}\n${c.description}\n\`\`\`bash\n${c.install}\n\`\`\`\nDocs: ${c.docs}${c.deps?.length ? `  \nDeps: ${list(c.deps)}` : ''}${c.tasteNote ? `  \nTaste: ${c.tasteNote}` : ''}`),
      '---\nRules: one signature effect per page; it must serve the message; honour prefers-reduced-motion; lazy-load WebGL; restyle the component to your tokens instead of shipping the demo look. React Bits and Canvas UI are MIT + Commons Clause (fine in products, not for reselling the components).',
    ].join('\n\n'));
  });

  const DOMAINS = ['product', 'style', 'color', 'typography', 'landing', 'ux', 'chart', 'motion', 'app', 'reasoning', 'icons', 'react-perf', 'stack'];
  server.registerTool('search_design_db', {
    title: 'Search the UI UX Pro Max design database',
    description: `BM25 search over UI UX Pro Max's curated data: product (${kb.db.product.length} product types to style/landing/palette), style (${kb.db.style.length} UI styles), color (${kb.db.color.length} palettes with shadcn-style roles), typography (${kb.db.typography.length} font pairings with import code), landing (${kb.db.landing.length} page patterns), ux (${kb.db.ux.length} UX rules), chart, motion, app (mobile app rules), reasoning (category decision rules), icons, react-perf, and stack (per-framework rules for ${Object.keys(kb.db.stacks).join(', ')}).`,
    inputSchema: {
      domain: z.enum(DOMAINS),
      query: z.string().describe('Keywords, e.g. "fintech trust dark", "editorial serif", "form validation"'),
      stack: z.string().optional().describe('Required when domain is "stack", e.g. nextjs, swiftui, flutter'),
      limit: z.number().int().min(1).max(10).optional(),
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async ({ domain, query, stack, limit = 4 }) => {
    let rows;
    if (domain === 'stack') {
      const key = resolveStacks(stack || query)[0] || (kb.db.stacks[stack] ? stack : null);
      if (!key) return text(`Pass a stack. Available: ${Object.keys(kb.db.stacks).join(', ')}`);
      rows = kb.db.stacks[key];
    } else rows = kb.db[domain];
    const fields = Object.fromEntries(Object.keys(rows[0] || {}).map((k) => [k, /keyword|name|type|category|issue|guideline/i.test(k) ? 3 : 1]));
    const hits = rank(rows, query, fields, limit);
    if (!hits.length) return text(`No ${domain} rows matched "${query}".`);
    return text(`# ${domain}: "${query}"\n\n${hits.map(({ doc }, i) => `### ${i + 1}\n${formatRow(doc)}`).join('\n\n')}\n\nSource: UI UX Pro Max (MIT), github.com/nextlevelbuilder/ui-ux-pro-max-skill`);
  });

  server.registerTool('get_brand_reference', {
    title: 'Fetch a real brand DESIGN.md as reference',
    description: `Fetch a DESIGN.md that documents a well-known product's design system (${kb.brands.length} brands from awesome-design-md: Linear, Stripe, Vercel, Raycast, Notion...). Use it to study structure and principles, not to clone an identity. Call without a brand to list them.`,
    inputSchema: { brand: z.string().optional().describe('Brand name or slug, e.g. "linear", "stripe"') },
    annotations: { readOnlyHint: true, openWorldHint: true },
  }, async ({ brand }) => {
    if (!brand) {
      const groups = {};
      for (const b of kb.brands) (groups[b.category] ||= []).push(`${b.name} (\`${b.slug}\`): ${b.vibe}`);
      return text(`# ${kb.brands.length} brand references\n${Object.entries(groups).map(([g, items]) => `\n## ${g}\n${items.map((x) => `- ${x}`).join('\n')}`).join('\n')}`);
    }
    const q = brand.toLowerCase().replace(/\s+/g, '');
    const b = kb.brands.find((x) => x.slug.toLowerCase() === q || x.name.toLowerCase().replace(/\s+/g, '') === q)
      || kb.brands.find((x) => x.slug.toLowerCase().startsWith(q) || x.name.toLowerCase().startsWith(brand.toLowerCase()))
      || rank(kb.brands, brand, { name: 3, slug: 3, vibe: 1, category: 1 }, 1)[0]?.doc;
    if (!b) return text(`No brand matched "${brand}". Call without a brand to list all.`);
    const note = `> Reference: ${b.name}'s design system, from awesome-design-md (MIT). Learn the structure and the reasoning; do not copy their logo, name, exact palette or illustrations into a different product.\n\n`;
    try {
      const res = await fetch(b.raw, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(String(res.status));
      return text(note + clip(await res.text(), 60000));
    } catch {
      return text(`${note}Could not fetch right now. Raw file: ${b.raw}`);
    }
  });

  server.registerTool('list_sources', {
    title: 'The 14 repos this taste is condensed from',
    description: 'Lists the source repos, what each uniquely adds, and how to install the original skill or library when you want the full depth.',
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: false },
  }, async () => text(`# Sources\n\n${kb.sources.map((s, i) => `${i + 1}. **${s.name}** (${s.repo}, ${s.license})\n   ${s.gives}\n   Install: ${s.install.map((c) => `\`${c}\``).join(' or ')}`).join('\n')}\n\nSite: ${SITE}`));

  for (const id of topics) {
    server.registerResource(`guide-${id}`, `taste://guides/${id}`, {
      title: kb.guides[id].title, description: kb.guides[id].summary || kb.guides[id].title, mimeType: 'text/markdown',
    }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: kb.guides[id].body }] }));
  }

  server.registerPrompt('design', {
    title: 'Design with taste',
    description: 'Build a UI with the full taste loop: brief, direction, DESIGN.md, build, audit, screenshot review.',
    argsSchema: { task: z.string().describe('What to build') },
  }, ({ task }) => ({
    messages: [{ role: 'user', content: { type: 'text', text: `Build this with taste: ${task}

Follow the taste MCP loop:
1. Call taste_brief with the task, surface and stack (read the repo to find the stack).
2. If the repo has a DESIGN.md, obey it. If not, call pick_direction, commit to one direction, and save the output of write_design_md as DESIGN.md.
3. Build it with those tokens. Real copy, real states (empty, loading, error), one signature moment at most.
4. Run audit_ui on every file you created or changed. Fix every high and medium finding.
5. Screenshot at 390px and 1440px (light and dark if supported) and review against get_guide("review"). Fix, then re-check.
6. Report the direction you chose and why, the audit score before and after, and anything you could not verify.` } }],
  }));

  server.registerPrompt('critique', {
    title: 'Critique the current UI',
    description: 'Taste review of existing UI: audit, screenshots, ranked fixes, then apply them.',
    argsSchema: { target: z.string().optional().describe('Route, file or component to review (defaults to the main page)') },
  }, ({ target }) => ({
    messages: [{ role: 'user', content: { type: 'text', text: `Critique ${target || 'the main page of this project'} like a senior product designer.

1. Read DESIGN.md if it exists; that is the bar.
2. Run audit_ui on the relevant source files.
3. Screenshot at 390px and 1440px and walk get_guide("review") and get_guide("anti-slop").
4. List the 10 highest-impact problems, each with the evidence (file:line or screenshot region) and the concrete fix.
5. Apply the fixes, re-run audit_ui and re-screenshot, and report before vs after.` } }],
  }));

  server.registerPrompt('polish', {
    title: 'Final polish pass',
    description: 'Last pass before shipping: spacing rhythm, type, states, motion, copy and accessibility.',
    argsSchema: { target: z.string().optional() },
  }, ({ target }) => ({
    messages: [{ role: 'user', content: { type: 'text', text: `Do a final polish pass on ${target || 'the UI changed in this branch'}.

Check and fix, in order: alignment and spacing rhythm (4px grid), type scale and line lengths (45 to 75 characters), contrast (4.5:1 text), hover/focus-visible/active/disabled states, empty/loading/error states, motion (get_guide("motion"): 150 to 300ms, ease-out, transform and opacity only, reduced motion), microcopy (get_guide("copy")), and responsive behaviour at 360, 390, 768, 1280 and 1440px. Run audit_ui at the end and report the score.` } }],
  }));

  return server;
}
