# Layout and spacing

> Condensed from: Taste Skill (https://github.com/Leonxlnx/taste-skill), Open Design (https://github.com/nexu-io/open-design), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), Hallmark (https://github.com/Nutlope/hallmark)

## Spacing scale (4px base)

```css
:root{
  --space-3xs:2px; --space-2xs:4px; --space-xs:8px; --space-sm:12px; --space-md:16px;
  --space-lg:24px; --space-xl:40px; --space-2xl:64px; --space-3xl:96px; --space-4xl:144px;
}
```

- Every length comes from a token. Max 3 optical nudges off the scale per page.
- `gap` for siblings; `margin` only to break flow.
- Proximity: 8-12px inside a group, 32-48px between groups. Uniform spacing everywhere = nothing is grouped.
- A heading gets ≥2x more space above than below.
- The gap between sections is clearly larger (≥1.5x) than any gap inside one.

## Section rhythm (marketing pages)

| Viewport | Gap between sections (last line to first line) |
| --- | --- |
| Desktop ≥60rem | 120-240px (study median ~240) |
| Tablet 40-60rem | 80-120px |
| Phone <40rem | 56-112px |

- A change of ground colour lets the gap shrink ~20%.
- More than 40% of a screen of plain ground between sections is a hole. No stretch taller than 50vh may hold nothing.
- Vary gaps on long pages: one ≥1.5x the base, another ≤1.2x. Identical padding on every section reads as a template.
- `min-height: 100vh` only for a section that truly fills the screen, never a footer or lone heading. Use `dvh`.
- Content is present on first paint; reveals move what is already there, never leave bare ground while text fades in.

## Frame and margins

- Left and right margins equal at every width. Strong sites: tight, median ~28px at 1440.
- Marketing margin: `--margin: clamp(1rem, 2.2vw, 2rem)` (16-32px); never under 16px, phone 16-20px.
- Nav sits on the same margins as the content.
- Don't reflex-wrap pages in `max-width:1200px; margin:auto`. Let type, images and colour fields run full width; constrain only running text by `ch`. Cap at ~1760-1920px on ultra-wide.
- Docs, apps and long reading use a centred column: 1100-1250px for data pages, 60-75ch for prose.
- Bleeds start from a margin and never move it.

## Grid

```css
.grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));
  column-gap:clamp(.75rem,1.4vw,1.5rem);}
```

- One grid and one gutter per page; every left edge lands on a column line.
- 2-3 anchor lines per page (e.g. margin, 1/3, 42%). Hero headline, section heads, price and footer reuse them. Six anchors = nothing decided.
- Grid arithmetic must close; write the sum (`3×372 + 2×17 = 1152`, `12×77 + 11×16 = 1100`).
- Column count comes from item count: 4 items → 4 columns. No orphans (3+3, never 5+1); let a lone card span.
- Cards sharing a row share a bottom edge. Balance contents first; else `align-items:start` and pin only a footer action. A blank band >40px inside a card is a hole.
- Tables ≤5 columns or lists ≤6 rows: max ~760px at 1440, paired with another block.
- CSS Grid for the page, flexbox inside components. Shrinking flex children get `min-width:0`; icons/images `flex-shrink:0`.
- Never draw the grid (no visible column lines, crosshairs, crop marks).

## Composition

- One dominant thing per screen. One primary entry point per region; two co-primaries = pick one.
- Asymmetry inside the frame, never in the margins: anchor text off-centre (a third, 42%) and answer it with something on the far side.
- Centring is a decision: one axis, one element, wide flanks, once per page. Not a centred stack of heading + paragraph + two buttons (39% of studied heroes centred; 52% on weak sites).
- Text in one half → the other half holds the section's picture, a list, a figure or a second column. Never plain ground.
- First screen: one `h1` (≤2 lines) saying what this is + the action. An empty block ≥28% of the first screen reads as a hole.
- A void is "placed" only when something closes it: the picture, display type spanning it, a tone step, a colour field. Else remove it or enlarge the main element.
- Neighbouring sections never share a layout; a shape used 3 times is the template showing. Alternate dense/sparse, image/type, light/dark.
- Break the system once, on purpose (one centred line, one inverted section).
- No rows of identical icon cards (1% of top sites vs 28% of weak). Repeated modules only for real archives (menu, schedule, index).
- Navigation: wordmark + 3-5 links + 1 action, ≤10% of first-screen height (bar 56-80px). Fixed nav must never cover content.

## Density by product type

| Product | Body | Row pitch | Card padding | Gaps |
| --- | --- | --- | --- | --- |
| Marketing / brand | 17-19px | n/a | 24-40px | sections 120-240px |
| Editorial | 17-20px | n/a | n/a | rhythm alternates compression/release |
| App, sparse (6-25 data points: homes, settings) | 14-16px | 56-92px | 20-24px | card gap 16-24 |
| App, medium (25-50: analytics, lists) | 14px | 44-56px | 16-24px | card gap 16 |
| App, dense (~120: monitoring, research) | 13px | list 28px, table 42px | 32px | 64px between bands, generous outer gutters |

- Density = row pitch + padding + type size moved together. Never shrink type while keeping padding.
- Spacing scale by density: spacious 24-96px, standard 16-64px, dense 8-32px.
- App defaults: page pad 24px, card gap 16px, card pad 20px, control height 32-36px, table row 44-48px, nav row 32-34px.
- One gap value both horizontally and vertically on an app screen (mixed 12/16 or 20/24 is flagged).

## App shell numbers

- Labelled sidebar 224-240px (range 210-292); icon rail 50-60px with tooltips and accessible names.
- Top bar 44-52px, or 64px with a 1px rule; only if it holds search, switcher or object name.
- Canvas: side padding 24-40px, content 1100-1312px, title 20-36px below canvas top.
- Right rail: `grid-template-columns: 1fr 384px; gap: 24px`, aligned to the first card, only for a stable secondary stream.
- One left edge from header to last row; one right edge per card for right-aligned figures.

## Radius

- Bimodal: tight 4-8px or soft 16-24px; avoid 11-12px. Decide once; controls follow cards (6px with tight, pill with soft).
- Buttons: square (0-2px, 52% of top sites) or full pill. The 9-16px "soft" radius is the weak-site default.
- Nested: `inner = outer - padding` (min 2px). Max 3 panel radii per screen. Media: square or one radius for all.

## Layering

z-index scale: base 1, raised 10, dropdown 100, sticky 200, sticky-nav 300, modal 400, toast 500, tooltip 600. Use `overflow-x: clip` (not `hidden`) so `sticky` keeps working.

## Container queries

Use media queries for page layout; container queries for components whose layout depends on their own box (cards, widgets, sidebars, settings rows).

```css
.card-slot{container-type:inline-size;}
.card{display:grid;gap:12px;}
@container (min-width:28rem){
  .card{grid-template-columns:120px 1fr;gap:16px;}
  .card h3{font-size:clamp(1rem,.8rem + 2cqi,1.375rem);}
}
```

- Settings rows: label column (~450px: 16px/500 title + 14px muted description) beside a panel (~700px); below ~560px container width stack label → 10px → field → 26px to next pair.
- Never leave a label column empty beside a tall panel (a 250px void is flagged); put help or a summary there.
