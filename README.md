# taste

**Give your coding agent design taste with one MCP link.**

Taste condenses 14 of the most-starred open-source design repos (Impeccable, Hallmark, Taste Skill, UI UX Pro Max, Emil Kowalski's skills, GSAP skills, Google DESIGN.md, awesome-design-md and more) into rules, art directions, an AI-slop audit and a component finder. Claude Code, Codex, Cursor and anything else that speaks MCP follow them while they build, so the first draft stops looking generated.

Site and guides: **https://kamal007olica.github.io/taste-mcp/**

## Add it

```bash
claude mcp add --scope user --transport http taste https://agent-taste.vercel.app/mcp
```

That is the whole setup for Claude Code. `--scope user` makes it apply to every project; drop it to add the server to the current project only. To share it with a team, commit this as `.mcp.json` at the repo root:

```json
{ "mcpServers": { "taste": { "type": "http", "url": "https://agent-taste.vercel.app/mcp" } } }
```

<details>
<summary>Codex, Cursor, the Claude app, VS Code, or running it locally</summary>

**Codex** (`~/.codex/config.toml`)
```toml
[mcp_servers.taste]
url = "https://agent-taste.vercel.app/mcp"
```

**Cursor** (`~/.cursor/mcp.json` or `.cursor/mcp.json`)
```json
{ "mcpServers": { "taste": { "url": "https://agent-taste.vercel.app/mcp" } } }
```

**Claude desktop or claude.ai**: Settings, then Connectors, then Add custom connector, and paste `https://agent-taste.vercel.app/mcp`.

**VS Code**
```bash
code --add-mcp '{"name":"taste","type":"http","url":"https://agent-taste.vercel.app/mcp"}'
```

**Local over stdio** (offline except for brand references)
```bash
claude mcp add --scope user taste -- npx -y github:Kamal007OLica/taste-mcp
```
</details>

## What happens after you add it

1. **The rules load right away.** The server's instructions (the 25 core rules, compressed to about 2 KB) are added to your agent's context as soon as it connects, before it has called any tool.
2. **On any UI task the agent runs the loop:** `taste_brief`, then `pick_direction` and `write_design_md`, then it builds, runs `audit_ui`, fixes what it finds and screenshots the result.
3. **DESIGN.md carries the taste forward.** The chosen direction is saved in your repo, so tomorrow's session and your teammates' agents build in the same style.

### Tools

| Tool | What it gives your agent |
| --- | --- |
| `taste_brief` | Start here. A tailored brief: direction, what this product category needs, the non-negotiables, surface and stack notes, and the build loop. |
| `pick_direction` | 24 art directions with real Google Fonts pairings, light and dark tokens checked to WCAG AA, shape, motion curve and one signature move. |
| `write_design_md` | A `DESIGN.md` in Google's format, filled from the direction. |
| `audit_ui` | Regex detectors for AI-looking code plus palette, spacing, radius and type-scale sprawl checks. Scores out of 100 and gives a fix for each finding. |
| `find_components` | 331 components from React Bits, Magic UI and Canvas UI, with exact install commands. |
| `search_design_db` | UI UX Pro Max's database: product types, styles, palettes, font pairings, landing patterns, UX rules, and rules for 22 stacks. |
| `get_brand_reference` | 84 real product design systems (Linear, Stripe, Vercel...) as DESIGN.md, to study rather than copy. |
| `get_guide` | The condensed guides: typography, colour, layout, motion, GSAP and scroll, states and accessibility, mobile, dark mode and data viz, copy, review and more. |
| `list_sources` | Where every rule came from, and how to install the original. |

Prompts appear as slash commands in Claude Code: `/mcp__taste__design`, `/mcp__taste__critique`, `/mcp__taste__polish`.

No MCP? Point your agent at [`taste.md`](https://kamal007olica.github.io/taste-mcp/taste.md), which has every guide in one file, or at [`llms.txt`](https://kamal007olica.github.io/taste-mcp/llms.txt).

## The 14 sources

| # | Repo | What it adds |
| --- | --- | --- |
| 1 | [UI/UX Pro Max Skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Design database (bundled, MIT) |
| 2 | [Awesome DESIGN.md](https://github.com/VoltAgent/awesome-design-md) | Brand DESIGN.md references |
| 3 | [Open Design](https://github.com/nexu-io/open-design) | Craft rules: type, colour, states, accessibility |
| 4 | [Taste Skill](https://github.com/Leonxlnx/taste-skill) | Art direction and tells |
| 5 | [Impeccable](https://github.com/pbakaus/impeccable) | AI-UI anti-patterns and commands |
| 6 | [React Bits](https://github.com/DavidHDev/react-bits) | Animated components (indexed) |
| 7 | [Skills for Designers and Engineers](https://github.com/emilkowalski/skills) | Motion and craft |
| 8 | [Hallmark](https://github.com/Nutlope/hallmark) | Themes, page shapes, gates |
| 9 | [Google DESIGN.md](https://github.com/google-labs-code/design.md) | The DESIGN.md format |
| 10 | [Magic UI](https://github.com/magicuidesign/magicui) | Animated components (indexed) |
| 11 | [GSAP Skills](https://github.com/greensock/gsap-skills) | GSAP and ScrollTrigger |
| 12 | [Scroll World](https://github.com/oso95/scroll-world) | 3D scroll landing pipeline |
| 13 | [Canvas UI](https://github.com/DavidHDev/canvas-ui) | WebGL over HTML (indexed) |
| 14 | [Dimensional Drawing](https://github.com/enesozturk/dimensional-drawing) | Technical drawings of components |

Licences and what was taken from each project: [NOTICE.md](NOTICE.md).

## Develop

```bash
npm install
npm run build:kb      # knowledge/ + data/ -> src/kb.generated.js and the site
npm run dev           # http://localhost:8787/mcp
npm test              # smoke test over stdio (or: node scripts/smoke.mjs http://localhost:8787/mcp)
```

- `knowledge/`: the condensed guides (Markdown) plus `directions.json`, `detectors.json`, `components.json`, `brands.json`, `sources.json`, and `instructions.txt` (the always-on server instructions).
- `src/create-server.js`: tools, prompts and resources. `api/mcp.js`: the stateless Streamable HTTP endpoint on Vercel. `bin/stdio.js`: the local entry point.
- `site/`: the GitHub Pages site, deployed by `.github/workflows/pages.yml` on every push to `main`.

To edit a rule, change the file in `knowledge/`, run `npm run build:kb`, and commit. Pages rebuilds the site; redeploy Vercel for the MCP (`vercel deploy --prod`).

## Licence

MIT. See [NOTICE.md](NOTICE.md) for the sources' licences.
