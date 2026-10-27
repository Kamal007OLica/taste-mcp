# Dimensional Drawing

> Condensed from: enesozturk/dimensional-drawing (https://github.com/enesozturk/dimensional-drawing)

## What it is

A one-page, Apple-accessory-style technical drawing of a UI component (or physical product): paddings, gaps, radii, layers and viewport placement, labeled as variables. It documents architecture, not copy, so it stays true when text changes. Output: one self-contained HTML file (title block + one SVG sheet). Use for component specs, anatomy docs, handoff, or a "how it's built" portfolio visual.

## How to ask

- "Make a dimensional drawing of `Card` in `src/components/Card.tsx`" or "Draw the anatomy of the settings dialog, same style as the examples."
- Point at real source (file, Storybook story, URL, screenshot). Measure by rendering in Playwright, waiting for fonts, walking the box tree (`getBoundingClientRect` + `getComputedStyle`: padding, gap, radius, border, min-height), and grepping every instance so values reflect the system.
- Reply in one or two sentences: what was drawn, which `[TBD]` values the team must define.

## House rules

1. **Monochrome**: black on white, grays only (`#111`, `#444`, `#7a7a7a`, `#d0d0d0`, `#e6e6e6`, `#f3f3f3`). Distinguish by line weight, dash, hatch, light fill.
2. **Slots, not content**: lead box with an X, `TITLE SLOT · FLEX`, `ACTION · HUG`, `CONTENT SLOT · FILL`. HUG = sized by content, FLEX = remaining space, FILL = parent width.
3. **Variables, not numbers**: every dimension is a code; tables give code, name, value; derived values show formula and result (`H1 header-min = 2·S1 + H3 = 64`, `R2 = R1 - B - S6 = 11`).
4. **Unbranded**: neutral IDs like `UI-CARD-001`.
5. **Never invent**: unknowns are `[TBD]`, drawn as proportional schematics.

Codes: `S#` spacing (S1 container pad, S2 inner pad, S3 stack gap, S6 inner inset) · `H#` heights · `Z#` squares · `I#` icon · `B` border · `W` width range · `R#` radii (R1 container, R2 inner, R3 control, R4 pill = h/2) · `Y, BL, SP, E1-E3` shadow envelope · `T1` touch min · `V1` viewport margin.

## Sheet layout

- **Title block (HTML)**: 1.2px frame, radius 16, 0.8px cell rules, caps Arimo/Helvetica; cells for title, DWG NO., REV, UNITS, SCALE, SOURCE; `NOTES: (UNLESS OTHERWISE SPECIFIED)`; a row of 6-7 key variables.
- **SVG sheet**: `viewBox="0 0 1700 1060"`, `min-width: 1100px` inside `overflow-x: auto`. Notes top-left with boxed `[1]` numbers echoed on the drawing; plan view top-center at ~1:1 with chain dims on all sides, radius callouts, dash-dot centerlines, dashed detail circles; exploded axonometric layer stack bottom-left (canvas → scrim → shadow → container → slots); bottom row of details (nested corner, radius arcs at 2:1); variable tables in the right column.
- Dialogs add viewport placement and scrim; buttons/inputs add 2-4:1 details, states, hit area vs drawn height.

## Line and label spec

| Element | Spec |
| --- | --- |
| Object outline | 1.6px |
| Dimension line | 0.7px, 7px filled arrows |
| Extension line | 0.55px, 3px gap, 5px overshoot |
| Dim text | 11px, white `paint-order: stroke` knockout |
| Labels / view titles | 9px caps letter-spaced / 12px caps + 9.5px subtitle |
| Slot / envelope / keep-out | dashed `4 3` / dash-dot / 45° hatch |

Exploded projection: `matrix(.94s, .17s, -.34s, .47s, tx, ty - z)`. Before delivering: every code is in a table, formulas sum, no non-gray hex, render at 1800px and fix overlaps.

## Motion variant (~11 s film)

A pen draws the sheet while a camera moves; `render(t)` is a pure function of time, 1920×1080, 60fps.

1. 0-2.3s: ~4.4× close-up on the header as it draws.
2. 2.3-4.2s: log-zoom back to ~1.7× while the plan and dims draw.
3. 4.2-7.2s: layers lift into the exploded view, strokes first, fills after (no white flash).
4. 7.2-9.2s: out to the full sheet; notes, tables, details draw in 0.3-0.5s bursts.
5. Hold with a slow push.

Strokes animate `stroke-dashoffset` 1 → 0 on `pathLength=1`; dashed lines and text fade. Ease-in-out for camera and strokes, ease-out for fades, no bounce, no color. Runs in Claude's Motion artifact or headless via Playwright + ffmpeg.
