# Typography

> Condensed from: Taste Skill (https://github.com/Leonxlnx/taste-skill), Open Design (https://github.com/nexu-io/open-design), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), Hallmark (https://github.com/Nutlope/hallmark)

## Faces

- Max 2 families (display + body), or 1 family at 2-3 weights. One family is normal: 31% of strong studied sites use one.
- Optional outlier with exactly one job: the wordmark, code/IDs, or one headline figure. Never a third face for labels, quotes or numbers.
- Never mix two faces inside one headline. Never style one word differently (italic, serif, colour, highlight).
- Generated defaults (use only if the brand already does): Inter, Roboto, Open Sans, Lato, Poppins, Montserrat, Raleway, Nunito, Work Sans, DM Sans, Plus Jakarta Sans, Source Sans, bare `system-ui` on headings; Merriweather/Lora/Georgia as body serif.
- Saturated (need a stated reason): Playfair Display, Cormorant Garamond, Fraunces, Instrument Serif, DM Serif Display, Space Grotesk, Bebas Neue, Unbounded, Geist, Mona Sans.
- Pick by setting the real headline in 2-3 candidates; judge shape, not reputation.
- Pair by structural contrast (serif display + grotesk body, or wide/condensed display + neutral body), similar x-height, same-build fallback (grotesk → `system-ui`, serif → Georgia).

## Scale per surface

| Surface | Sizes | Rule |
| --- | --- | --- |
| Marketing | small 13-14, body 17-19, lead 20-26, head 32-64, display 48-144 | Max 5 sizes. Display ≥4x body (study median 4.3, top sites 4.7). Hero median 72px / 5vw; top sites 6-8.4vw. |
| Editorial | caption 12-13, body 17-20, deck 18-24, pull quote 28-40, display 56-96 | Display/deck ratio ≥1.5x. |
| App / dashboard | 12 / 14 / 16 / 20 / 24 (or 12/14/18/24) | Ratio 1.2-1.25. Title 20-28px (never >32), KPI 24-30, body 13-14, meta 12, floor 11. Nothing ≥48px. |
| Mobile | body 16-18, hero 32-48 (median 40), H2 24-28 | Body never <16px (iOS input zoom). |

- Near sizes (16, 18, 20, 24, 28, 32) read as mush; merge sizes that look almost equal. Max 3 levels above the fold.

```css
:root{
  --step-small: clamp(.8125rem,.79rem + .1vw,.875rem);
  --step-body:  clamp(1.0625rem,1rem + .25vw,1.1875rem);
  --step-lead:  clamp(1.25rem,1.1rem + .7vw,1.625rem);
  --step-head:  clamp(2rem,1.3rem + 3.2vw,4rem);
  --step-display: clamp(3rem,1rem + 9vw,9rem);
}
```

## Leading and measure

| Size | Line-height |
| --- | --- |
| Display ≥48px | 0.9-1.05 (tighter as it grows; 1.2 looks inherited) |
| Headings 24-48px | 1.05-1.2 |
| Lead 20-26px | 1.3-1.4 |
| Body 15-19px | 1.5-1.6; long reading 1.6-1.7 |
| Small ≤14px | 1.45-1.5 |
| App 14px / 16px text | 20px / 24px |
| CJK | display 1.3-1.4, body 1.7-1.8 |
| Arabic body | 1.5-1.75 |

- Caps on one line: 0.9. Caps that can wrap: ≥1.0. Below 1.0, check descender/ascender collisions.
- Body measure 45-75ch (default `max-width: 65ch`); editorial 60-70ch; phone 35-60ch; lead 40ch.
- Heading measure on the element: `h1` 14-20ch, `h2` 30ch, `h3` 40ch.

## Tracking by size

| Context | letter-spacing |
| --- | --- |
| Body 14-18px | 0 |
| Small 11-13px | +0.01 to +0.02em |
| Labels, buttons | 0 to +0.02em |
| Caps labels (≤3 words) | +0.06 to +0.1em (required) |
| 24-32px | -0.01em |
| 32-48px | -0.01 to -0.02em |
| 48-96px | -0.02 to -0.04em |
| 96px+ | -0.03 to -0.05em |
| Condensed or very heavy display | 0 to -0.015em |
| Caps display | 0 to +0.03em |
| CJK, Arabic, Persian, Urdu | always 0 |

Tracking scales with size: a value right at 120px chokes 32px. Set it per step.

## Weights

- Max 3 weights across the page. Jump, don't step: 400 + 600, or 300 + 700. A 400/500/600/700/800 ladder reads as default.
- Roles: read 400, emphasize 500, announce 600. 700 does one job per screen (money, title).
- Big type does not need bold: 48% of studied heroes are regular weight. Editorial display: light or regular.
- On dark grounds drop one step (400 → 350 on variable fonts) or add +0.01em.
- Secondary text = same face, muted colour; not a lighter weight, not <13px (app meta floor 11-12px).
- `font-synthesis: none`. Never change weight on hover (line reflows).

## Numerals

- `font-variant-numeric: tabular-nums` on tables, prices, KPIs, timers, counters, anything that updates. Verify the face has `tnum` (digit widths must change); if not, switch face.
- Right-align numeric columns. Lining figures in UI; `oldstyle-nums` suits serif prose.
- Non-breaking space between number and unit (`10&nbsp;MB`). Monospace only for IDs, keys, code.

## Setting details

- `text-wrap: balance` on headings, `pretty` on paragraphs. Author breaks with `<br>` only between phrases; check at 375px.
- Display starting with O, C, A, T, W: `margin-left: -0.05em` (optical alignment).
- Links: `text-underline-offset: .18em; text-decoration-thickness: .07em`.
- Space above a heading ≥2x space below. Never justify. No centred paragraph over 3 lines. No caps run over 3 words.
- No text-shadow, stroke or gradient fill on type. `hyphens: none` on headings.

## Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fonts/display-700.woff2" as="font" type="font/woff2" crossorigin>
```

- Only weights used (2-3), `display=swap`. Prefer variable fonts.
- Preload only 1-2 critical files (hero display + body regular), never every variant.
- Self-hosted `@font-face`: `font-display: swap` (`optional` for body when CLS matters), `unicode-range` subsets (latin, latin-ext), metric-matched fallback via `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` so the swap doesn't shift layout.
- Single display word: Google `&text=Wordmark` subsets to those glyphs. Frameworks: `next/font` handles subsetting and fallback metrics.
- Fontshare faces: `https://api.fontshare.com/v2/css?f[]=<family>@<weights>&display=swap`.
- Verify in a screenshot that the face rendered, not the fallback.

## Vetted pairings (Google Fonts unless noted)

| Display / Body | Use |
| --- | --- |
| Newsreader / Hanken Grotesk | Content products, newsletters, editorial SaaS |
| Gloock / Figtree | Confident consumer brands, food, retail |
| EB Garamond / IBM Plex Sans | Law, publishing, archives, foundations |
| Libre Bodoni / Public Sans | Fashion, magazines, galleries |
| Archivo (wdth 112-125) / Archivo | Events, sport, logistics; one family, width carries display |
| Barlow Condensed / Barlow | Fitness, sports data, transit |
| IBM Plex Sans / IBM Plex Mono | Developer tools, fintech, infrastructure |
| Onest / JetBrains Mono | Dev tools, APIs, CLIs (mono for code and IDs only) |
| Hanken Grotesk alone | Dense app UI, admin, dashboards |
| Literata / Sofia Sans | Reading apps, long-form, knowledge tools |
| Source Serif 4 / Chivo | Reports, research, policy |
| Crimson Pro / Atkinson Hyperlegible | Universities, academic, accessibility-first |
| Atkinson Hyperlegible alone | Government, health, low-vision audiences |
| Alegreya / Alegreya Sans | Books, culture, humanities (superfamily) |
| Hepta Slab / Figtree | Civic, utility, outdoor and hardware brands |
| Castoro / Manrope | Hotels, wellness, hospitality |
| Noto Serif JP or SC / Noto Sans JP or SC | CJK products |
| Noto Naskh Arabic / Noto Sans Arabic | Arabic and bilingual RTL |
| System serif: `Charter, "Bitstream Charter", "Sitka Text", Cambria, serif` | Zero-load editorial and docs |
| System mono: `ui-monospace, "SF Mono", Menlo, Consolas, monospace` | Code blocks only |
