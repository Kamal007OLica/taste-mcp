# Animated Components, Used With Taste
> Condensed from: React Bits (https://github.com/DavidHDev/react-bits), Magic UI (https://github.com/magicuidesign/magicui), Canvas UI (https://github.com/DavidHDev/canvas-ui)

`components.json` lists 331 installable components: React Bits 218 (text-animations 33, animations 38, components 48, micro 35, backgrounds 64), Magic UI 78, Canvas UI 35. Every entry carries an exact install command, docs URL and npm deps. Search it by `tags` and `category`, then read `tasteNote`.

## Decision guide

1. **Animate only with a job.** Motion should explain (state change, cause and effect, hierarchy) or set the first impression. If you cannot name the job, ship it static.
2. **One hero effect per page.** Choose one signature moment (animated headline, shader background or 3D object); everything else stays quiet. Magic UI's own guardrail: no more than two high-motion effects in one viewport.
3. **Backgrounds must not fight content.** Slow, low contrast, tinted toward the brand palette. Put a scrim or radial mask under text and check 4.5:1 contrast against the brightest frame. No cursor-reactive backgrounds behind forms or long reading.
4. **Text effects belong on headlines only.** Animate words or lines, not characters, finish in about a second, and end on plain, selectable, screen-reader-visible text.
5. **Cursor effects are for portfolios and brand pages,** never apps, dashboards or checkout. Never hide the system cursor where people fill forms.
6. **Be consistent.** Pick one entrance (for example Blur Fade) and one CTA treatment and reuse them site-wide.
7. **The React Bits `micro` category is the safe zone.** Those pieces improve UX (Hold Button for destructive actions, Code Slots for OTP, Warm Tooltip for toolbars) and rarely read as gimmicks.

## Performance and reduced motion

- Shader backgrounds (raw WebGL2, `ogl`, `three`, `vgpu`) cost GPU and battery. Allow one live canvas per viewport, lazy-load anything below the fold (dynamic import, `ssr: false` in Next.js), pause offscreen, cap device pixel ratio at 2.
- `three`-based entries (Lanyard, Hyperspeed, Model Viewer, Blob Cursor, Paper Crumple, Color Bends, every Canvas UI `*-object`) add a large bundle; prefer zero-dep or `ogl` alternatives when they look similar.
- Honor `prefers-reduced-motion`: many sources check it, but verify, and render the final state (static text, still gradient or poster).
- On touch devices (`pointer: coarse`) disable cursor-driven effects and cut particle counts.
- Canvas UI's HTML-in-canvas effects reach full quality only in Chromium with the `canvas-draw-element` flag or an origin-trial token; other browsers get a GPU overlay fallback. Its 3D object effects work everywhere. WebGPU builds need Chrome or Edge 113+, Safari 26+ or Firefox 141+.

## Install variants

All three registries are listed in the shadcn public index, so namespaced commands work after `npx shadcn@latest init`. Swap `npx` for `pnpm dlx`, `yarn` or `bun x --bun` as needed.

- **React Bits:** `npx shadcn@latest add @react-bits/<Name>-<LANG>-<STYLE>`. `Name` is PascalCase (SplitText; ASCII Text is `ASCIIText`), `LANG` is `JS` or `TS`, `STYLE` is `CSS` or `TW`, so every component has four variants. The catalog uses `TS-TW`. Alternatives: `npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-TW.json` or `npx jsrepo@latest add https://reactbits.dev/r/SplitText-TS-TW`. For MCP browsing add `"registries": {"@react-bits": "https://reactbits.dev/r/{name}.json"}` to `components.json`.
- **Magic UI:** `npx shadcn@latest add @magicui/<slug>` (several slugs in one command is fine). Needs Tailwind v4; Tailwind v3 projects use the legacy docs at v3.magicui.design. Import from `@/components/ui/<slug>`. Manual installs must also copy the keyframes the docs list.
- **Canvas UI:** `npx shadcn@latest add @canvas-ui/<slug>-<framework>` where framework is `react`, `vue`, `svelte`, `solid`, `preact` or `vanilla`; append `-webgpu` for the WebGPU build (adds `vgpu`). Files land in `components/canvasui/`. Most effects wrap content: `<Liquid><Page /></Liquid>`, and the page stays clickable.
- Agents can browse all three through `npx shadcn@latest mcp init --client claude`.

## License

- **React Bits and Canvas UI: MIT + Commons Clause.** Free in any app, site or product, commercial included. You may not sell, sublicense or redistribute the components themselves (alone, in a bundle, or ported), so no reselling them as a UI kit or template pack.
- **Magic UI: MIT.**

## Twenty picks by job

| Job | Pick (library/slug) | Note |
|-----|---------------------|------|
| Hero headline | react-bits/split-text | Words or lines, one pass |
| Hero headline, softer | react-bits/blur-text | Calm focus pull |
| Rotating value prop | magic-ui/word-rotate | Three to five words |
| Announcement pill | magic-ui/animated-shiny-text | Sits above the H1 |
| Key phrase emphasis | magic-ui/highlighter | One phrase per section |
| Logo cloud | magic-ui/marquee | Monochrome logos, edge fade |
| Logo cloud, alt | react-bits/logo-loop | Pauses on hover |
| Testimonials | magic-ui/marquee + magic-ui/tweet-card | Vertical columns work well |
| Social proof by CTA | magic-ui/avatar-circles | Pair with a count |
| Primary CTA | magic-ui/shimmer-button | One per page |
| CTA polish | react-bits/magnet | Low strength only |
| Hero background | react-bits/aurora | Brand-tinted, slow |
| Quiet background | magic-ui/grid-pattern | With a radial mask |
| Textured gradient | react-bits/grainient | Muted colors |
| Number stats | magic-ui/number-ticker | Trigger once in view |
| Prices and live metrics | react-bits/counter | Odometer roll |
| Feature cards | magic-ui/magic-card | Or react-bits/spotlight-card |
| Feature layout | magic-ui/bento-grid | Deliberate size rhythm |
| Dock | magic-ui/dock | App-like portfolios only |
| Cursor | react-bits/target-cursor | Portfolio pages only |

Section entrances: magic-ui/blur-fade or react-bits/animated-content. Integrations: magic-ui/animated-beam. Product demo: magic-ui/hero-video-dialog, magic-ui/safari, magic-ui/terminal. One spectacle hero: canvas-ui/glass-object with your logo SVG.
