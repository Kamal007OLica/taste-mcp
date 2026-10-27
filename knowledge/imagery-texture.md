# Imagery, icons and texture

> Condensed from: Taste Skill (https://github.com/Leonxlnx/taste-skill), Hallmark (https://github.com/Nutlope/hallmark), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

## Decide what imagery exists (first that fits wins)

1. The user's own photos, footage, screenshots.
2. Screenshots captured from the running product (1440×900 and 390×844 at 2x).
3. The product built in HTML at true size.
4. Openly licensed real photos of the subject's world (Wikimedia Commons, museums), credited; never URLs from memory.
5. The subject drawn in code (last resort).
6. Type and colour alone, on purpose.

Generated images only on request. Top-scored pages carry a median 37 images, weak ones 5.

| Product | What leads |
| --- | --- |
| Place, food, object, craft, event | Photographs. Hero photo is the largest thing on screen 1: full-bleed, or 60-75% of screen height |
| Software, SaaS, dev tool | The product's interface. Max 1-2 context photos, each passing the deletion test (remove it, a fact is lost) |
| Docs, API, CLI, manifesto | Type and code; at most one full-bleed photo band |

## Showing software

- Real screen: real labels, numbers that add up, one row selected. Crop to one panel, row or control.
- No browser chrome, traffic lights, laptop or phone frames (a plain rounded rectangle only for phone apps).
- Legible at displayed size, never upscaled. No real names, emails, tokens, paths or debug overlays. Grey bars for text are worse than no image.

## Photographs: size, count, crop

- Big or nothing: ≥6 of 12 columns and ≥440px tall, or full-bleed.
- A picture leads its screen (≥60%) or stays small (<10%).
- 6-12 pictures per page (min 4); ~30-40% of scrolled area; ≥1 screen in 4 has none.
- 3-5 placements per page, never the same in neighbouring sections. Best-scoring: split (picture 42-50% or two-thirds width, full height, touching the viewport edge), picture held while text scrolls, uneven mosaic, inset frame growing to full screen, cut-out on a flat field. 3D galleries score lower.
- Two ratios cover ≥75% of pictures: 4:5 portrait, 16:9 or 3:2 landscape, 1:1 detail.
- Square corners (94% of studied pictures). If rounded, one radius for all (≤4-5px, or 12px in card-style UI).
- `object-fit: cover` + per-image `object-position`. Let images touch edges. Max one overlap per screen, 40-80px.
- No frames, borders, shadows, tilted polaroids. Captions: one factual line, small, muted, under the image.
- No stock faces as customers, team or testimonials.

## Treatment (one for the whole page)

- Default: untouched; choose images whose light agrees.
- Greyscale set: `filter: grayscale(1) contrast(1.05)` on every image or none.
- White studio product on a light field: `mix-blend-mode: multiply`.
- Dark page: `filter: brightness(.85) contrast(1.05)` so edges sink.
- Never: brand-colour washes, blur, vignettes, glow copies.

## Text over photos

- Only display text, one line, one action, on the calm area (sky, shadow side), ≥32px from edges. Body copy goes beside or under.
- Scrim from ink or black behind the text side only: 35-65% gradient, or a solid 40-55% block. Never coloured overlays.
- Measure contrast at the text's position: 4.5:1, or 3:1 at ≥24px. Fixed nav over photos gets a solid band.

## Delivery

- Serve 2x CSS width, capped ~2400px; hero/full-bleed sources ≥2400px on the long side.
- `srcset` with `w` descriptors + accurate `sizes` (`50vw` half, `100vw` full-bleed); `<picture>` for portrait phone crops.
- Always `width`/`height` or `aspect-ratio` (CLS). WebP/AVIF.
- Hero image is the LCP: `fetchpriority="high"`, never `loading="lazy"`. Everything else lazy.
- Video: `muted loop playsinline` + `poster`, 5-15s, paused off-screen, pause control if looping past 5s, 1280×720 under ~2MB per 10s (WebM then MP4). One moving picture per screen.
- Credit CC BY / BY-SA photos in one footer line.

## Drawing (only when no honest picture exists)

- Draw the subject's own things (the stool's legs, the shop's enamel sign, the invoice the tool produces). Unnameable = decoration: cut it.
- One graphic language: flat fills, one stroke weight or none, one curve vocabulary, the palette's real colours.
- Three levels of detail: big shapes, describing shapes, small rewards (a maker's mark, a hinge). Light via flat tone steps, not gradients.
- Draw large (hero, full band); scattered doodles read as filler.
- Never: unDraw, Humaaans, Storyset, isometric scenes, 3D blobs, people-at-laptops line art, abstract floating shapes.

## Icons

- One library per product: Lucide default; Phosphor or Heroicons if the project uses them. One style (outline) per hierarchy level; never mix filled and outline at one level.
- Stroke 1.5px (14 of 16 studied apps) or 2px, consistent.
- Sizes on the set's grid: 16, 20, 24, 32 (24 viewBox at 24px, never scaled to 19). Nav 16-20px; inline 14-16px; 8-10px gap to label.
- `currentColor`, grey by default (light nav ~`#454545` to `#73737f`); align to the first line of multi-line text.
- Never in coloured circles or tinted squares (0 of 23 studied apps). Never emoji.
- Icon-only buttons: `aria-label` + tooltip, ≥44px hit area. Decorative icons: `aria-hidden="true"`. Meaningful icons: 3:1 contrast.

## Logos

- User's own only, monochrome, one treatment per row, 32-48px tall (20-28px in footer). Even splits (3+3, never 5+1).
- Simple Icons (`https://cdn.simpleicons.org/<slug>/<hex>`) only for platforms the page names. Never an invented logo wall.

## Texture and grain

Default: none, especially on modern-minimal pages and app UI. Use only when the brand's lineage is print (risograph, letterpress, film, ticket stock).

- One artifact family per page (grain, halftone, misregistration, scanline or deckle).
- Opacity: ≤0.08 page-wide, ≤0.15 inside one plate or card, ≤0.05 (or none) under body text. Low-frequency fibre wash (`baseFrequency` ≤0.02) may reach 0.12.
- Never animated. `pointer-events:none; aria-hidden="true"`. Pure CSS or a data-URI SVG, no image requests.
- Grain: `::after` overlay, `background-size:200px`, SVG `feTurbulence type=fractalNoise baseFrequency=0.85 numOctaves=2` + `feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 9 -4"` for discrete specks. Dark grounds: RGB rows `0 0 0 0 1` (white specks).
- Halftone: `radial-gradient(var(--ink) 1.5px, transparent 1.5px)` on a 12px grid, plates only, never under type.
- Misregistration: one hero word, 1-3px offset echoes in two spot inks, never every heading.
- Measure contrast on the textured result.

## Backgrounds

- Flat ground, a tone-step surface, or a full colour field per section.
- Banned: gradient blobs, orbs, aurora, dot grids, wave dividers, floating shapes, starfields, visible grid lines, glass/backdrop-blur panels, glowing borders.

## Placeholders that aren't lorem or grey boxes

- Image slot: `data-slot="hero"`, `data-alt="Baker shaping loaves at 4am"`, real `aspect-ratio`, filled with a credited photo or the built product. A slot showing only its wash is an empty picture. No visible "Your image here" labels.
- Missing fact (venue, date, price): a muted text slot with a dashed outline, "Venue to be announced", max 2 per page. Never an invented value.
- Max 4 slots in a row; no empty frames for things without pictures (set a team list in type).
- Real-density sample text (each room named, with a rate). RTL prototypes use real Arabic or Hebrew.
- No photo of a person: initials on a neutral disc.
- Counts: set the number, never a row of identical marks.
