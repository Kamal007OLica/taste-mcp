# Dark mode and data viz

> Condensed from: Hallmark (https://github.com/Nutlope/hallmark), Taste Skill (https://github.com/Leonxlnx/taste-skill), Open Design (https://github.com/nexu-io/open-design), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)

## Part 1: Dark mode

### Stance

- A second designed rendering of one token system, never `filter: invert()`. Re-derive every token; hue never moves; every contrast pair still passes (fix the derivation, not the requirement).
- Ship dual mode only when asked or already present.

### Derivation (hex/ratios computed; ground = `#0f1215`)

| Token | Dark rule | Example |
| --- | --- | --- |
| Ground | L 16-18%, chroma 0.008-0.012 on the anchor hue. Never `#000`. | `oklch(18% .008 250)` `#0f1215` |
| Surfaces | Lighter by +3% L per level (light mode steps darker) | `21%` `#16191c`, `24%` `#1c2023`, `27%` `#24272a` |
| Borders | L 27-32%, check against surface-2 too; or `rgba(255,255,255,.08)` | `oklch(32% .008 250)` `#303337` |
| Ink | L 92-96%, tinted. Never `#fff` for body. | `oklch(94% .008 250)` `#e7ecf0`, 15.8:1 |
| Secondary text | L ~75% | `#aaaeb3`, 8.5:1 |
| Meta text | L ~65% | `#8c9094`, 5.8:1 on ground, 5.1:1 on surface-2 |
| Accent | Chroma −0.02 to −0.04, L +5 to +10 | light `oklch(55% .18 255)` = 3.8:1 here (fails); dark `oklch(70% .14 255)` `#5fa1f3` = 7.0:1 |
| Accent ink / focus | Re-verify ≥4.5:1 on the new fill; focus ring 3:1 vs both grounds | |

- Max two text greys, clearly apart (`#b4b4b4` + `#949494`).
- Status: hue on a dark tint of itself: positive `#3fc07a` on `#172a1d`, negative `#e5566f` on `#2c1a20`.
- Neutral chroma ≤0.012: navy/slate themes, neon, glows and glass read as generated.

### Dark discipline

- Elevation = lighter surface or `box-shadow: inset 0 0 0 1px var(--border)`. No drop shadows (they read as glow). Cards always lighter than canvas.
- All headings one colour (ink). Accent on data or one selected state; active nav by brightness (`#bbb` → `#fff`), not a coloured pill.
- Light-on-dark looks heavier: body weight −50 (400 → 350 on variable fonts) or +0.01em tracking, line-height +0.05.
- `color-scheme: dark` so scrollbars and form controls follow.
- Images: never auto-invert per mode; pick photos that hold on dark or set light ones in a surface-2 well.
- Re-measure scrims; define hover, pressed, focus, disabled and borders in both modes.

### Implementation

```css
:root{ color-scheme: light dark; /* light tokens */ }
[data-mode="dark"]{ /* only re-derived tokens */ }
@media (prefers-color-scheme: dark){
  :root:not([data-mode]){ /* same overrides for OS auto mode */ }
}
```

```html
<script>try{const m=localStorage.getItem('mode');if(m)document.documentElement.dataset.mode=m}catch(e){}</script>
```

Inline it in `<head>` before first paint (no wrong-mode flash). Update `<meta name="theme-color">` per mode. Test both modes separately.

## Part 2: Data viz and dashboards

### Pick the form first

| Question | Form |
| --- | --- |
| One value | Stat: big figure + worded qualifier. Never a one-bar chart |
| 2-5 values compared | Stat row, or sorted horizontal bars |
| Moving over time? | One line, straight segments (smoothing invents values) |
| How much per period? | Columns, square or ≤4px top radius at the data end, zero baseline |
| Who ranks? | Sorted horizontal bar list |
| Share of a whole | 100% stacked bar with 2px seams, or a thin ring (3-5px stroke) for 3-5 parts. Never pie, fat donut, gauge |
| Distribution | Histogram, equal bins |
| More than ~7 categories | A table |
| Progress to target | Bar at the true ratio, both ends labelled ("12.7k of 20.0k"), no stub at zero |
| Forecast | Dashed after today, end value labelled |
| Two units | Two small charts. Never dual y-axes |

Few numbers → no chart.

### Construction

- Plot 112-264px tall (median ~195), aspect 1.8-5.2:1.
- Lines 2px (1-3), no point markers except an 8px hover dot or annotated points.
- Area fill: none (7 of 10 studied charts) or ≤14% flat tint, or fade to transparent over 150-200px.
- Bars ≤24px thick, 2-4px gaps, zero baseline; a zoomed axis says so ("axis starts at 94%").
- Gridlines: 3-5 horizontal, 1px solid, `#e5e5e5` on light, `#2b2b2b` on `#111`. No y-axis line; the baseline is the one heavier line.
- Y ticks 4-7, round even steps (0/5/10/15%), top tick above the max, integers for counts, 11-12px muted, never larger than the data labels.
- X labels 4-8, never rotated, one regular step. Time on a time scale.
- Annotate any jump >3x the usual change: 1px marker + 12px label naming the cause ("Deploy a3f09c1"). Reference lines (budget, SLO) 1px dashed, labelled at the end.
- No shadows, 3D or gradients in marks. Tooltips: plain box, label + value, keyboard reachable.

### Colour

- One hue per chart: the accent on the main series (today, current period), the rest neutral grey.
- Multiple series: a lightness ramp on the accent hue, L steps 12-15%, chroma constant, fixed order (e.g. `oklch(40% .13 255)`, `52%`, `64%`). Context series in muted grey.
- Max 4 hues per screen (6 is a fail). One subject keeps one hue on every chart.
- Text never takes the data colour: labels in ink/muted, series identified by a swatch beside the label.
- Marks ≥3:1 vs background, text ≥4.5:1. Never red/green as the only distinction: add sign, shape, pattern or direct labels.
- Dark: marks re-derive like the accent (chroma down, L up), area fade at half opacity.

### Legends and labels

- Single series: no legend; the title or the selector names it.
- Otherwise ≤5 items: 5-8px dot + 12-14px muted label in the card header, or a legend-table (dot, name, value, change). The swatch is the mark, scaled down.
- Small datasets: label values directly.

### Numbers

- `tabular-nums`, right-aligned, fixed decimals (money 2, % 1-2, counts 0), locale formatting.
- Deltas 10-15px, never larger than the label; colour by good/bad direction, not up/down; zero or undefined = grey; from zero write "+4 (new)"; state the window ("vs prior 30 days").

### Dashboard composition

- Fewer, truer figures: one answer figure, one supporting chart, one table. The six-gauge KPI wall is the tell.
- KPIs: one container split by 1px dividers, label (12-16px, muted, above) + value 16-40px (median 24). The answer figure 30-36px and ≥1.3x its siblings (18-24px). Nothing ≥48px.
- No icon circles, sparklines or tinted tiles on KPIs. One series per chart; switch metrics with a segmented control.
- Tables: rows 36-53px (median 45); header 12px muted sentence case, no band, no zebra; 1px row rules 3-7% darker than surface; identity column 1/3-1/2 of width.
- Status pills ~20px, 11-12px/500, pale tint + dark same-hue text, one per row.
- Overview lists 2-5 rows + "View all" + total. 1000+ points: aggregate, offer drill-down.

### States and accessibility

- Loading: a skeleton the size of the plot. Empty: draw the zero line + one sentence. Error: message + Retry inside the card, never a broken axis.
- Every chart gets a text summary of its insight (`aria-label` or caption) and a table alternative; sortable tables set `aria-sort`.
- Interactive marks keyboard-focusable, ≥44px touch areas. No entrance animation under reduced motion.
