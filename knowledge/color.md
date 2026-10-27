# Color

> Condensed from: Taste Skill (https://github.com/Leonxlnx/taste-skill), Open Design (https://github.com/nexu-io/open-design), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), Hallmark (https://github.com/Nutlope/hallmark)

Hex values and ratios below are computed from the OKLCH shown (WCAG 2.x, vs white unless stated).

## Plan four layers before any CSS

| Layer | Share of pixels | Tokens |
| --- | --- | --- |
| Neutrals | 70-90% | `--bg --surface --surface-2 --ink --muted --border --rule` |
| Accent (one) | under 5% of any screen, max 2 visible uses | `--accent --accent-ink --focus` |
| Semantic | 0-5% | `--positive --negative --warning --info` + pill pairs |
| Effects | under 1% | scrims, one chart fade |

- Name tokens by role, never hue (`--accent`, not `--blue-500`). A raw hex in a component starts a second palette.
- No greys between roles: quieter text is `--muted`, quieter panel is `--surface`.
- Write values in `oklch()`.

## Neutrals with a tint

Tint every grey toward one anchor hue, chroma 0.004-0.015. Example ramp, hue 250:

| Role | OKLCH | Hex | Note |
| --- | --- | --- | --- |
| `--bg` | `oklch(98.5% .004 250)` | `#f8fafd` | Light ground L 97-98.5 |
| `--surface` | `oklch(100% 0 0)` or `oklch(96% .006 250)` | `#fff` | 2-6 L points from ground |
| `--border` | `oklch(92% .006 250)` | `#e2e5e8` | ~1.2:1, card edges |
| `--control` | `oklch(88% .008 250)` | `#d4d8dd` | Input borders, one step stronger |
| `--muted` | `oklch(54% .012 250)` | `#6a6f76` | 5.05:1 on white, 4.84:1 on ground |
| `--ink` | `oklch(21% .012 250)` | `#14191e` | 17.7:1 |

- Ink L 16-24% on light. Never `#000` text or `#fff`/`#000` grounds unless the direction is a stark two-tone.
- Lightest grey that still passes 4.5:1 on white and `#f9fafb`: about `#6b6b6b` (L 53%). L 56% already fails on the ground.
- Warmth = low-chroma stone or bone: `oklch(95% .010 75)` `#f2eee7`, ink `oklch(22% .010 75)` `#1d1a16`. Chroma under 0.015.

## The one accent

- Chroma 0.12-0.22. Hue from the subject (the product's material, place, brand), not a default.
- Two variants: a text-safe one (≥4.5:1) and a bright fill. Blue example: text `oklch(55% .18 255)` `#026fd7` 4.93:1; fill-only `oklch(62% .17 255)` `#3186e9` 3.68:1 (fails as small text). Green: text `oklch(45% .11 155)` `#036639` 7.05:1.
- `--accent-ink` on the fill: verify ≥4.5:1 (body) or 3:1 (≥24px).
- `--focus`: accent hue, chroma 0.18-0.22, L within 5% of the accent, 3:1 vs adjacent colours.
- Where it goes: the primary action plus one recurring thing (active nav, selected state, the chart's main series). Not headings, icons, bullets, borders or decorative underlines. Hover and focus rings count toward the budget.
- If a CTA is on screen, links become ink with an underline.
- Neutral buttons are normal: 52% of strong sites use black/white/grey primaries; 12 of 23 studied app screens have no filled primary. Near-black `#1d1f20` is a valid primary.

## Postures (declare one)

- **Restrained** (default): rules above.
- **Committed**: one colour covers 30-60% via full section fields; accent stays a signal.
- **Full palette**: 3-4 named roles (field, signal, seal, ink), each with a job and footprint.
- **Drenched**: the ground is the colour; ink and rules derive from it.
- Section fields: change the whole ground per section, hard edge (nothing fades), neighbours differ in lightness not only hue, each field has its own ink. Never `--muted` grey on a coloured field; use the field's ink at 70% opacity only if it still passes.

## Contrast gates

| Pair | Minimum |
| --- | --- |
| Body and UI text | 4.5:1 (target 7:1 for ink on ground) |
| Large text (≥24px regular or ≥18.5px bold; 18px regular is NOT large) | 3:1 |
| Icons, input borders, focus rings, chart marks | 3:1 |
| Placeholders, disabled labels that carry meaning | 4.5:1 (house rule) |

- Inclusive thresholds; 2.99:1 fails. Re-measure any text opacity change. Hover and focus raise contrast, never lower it.
- APCA Lc ≥60 for body is a useful parallel design check; WCAG 2.2 AA stays the compliance floor.
- Text over photos: measure at the text's actual position.

## Semantic colours

| Role | Text-safe value | Pill (bg / text) |
| --- | --- | --- |
| Positive | `oklch(52% .12 150)` `#287c42` 5.2:1 | `#dcfae5` / `#04250e` |
| Negative | `oklch(55% .19 27)` `#c9302d` 5.3:1 | `#ffedea` / `#831c1e` |
| Warning | `oklch(50% .11 60)` `#905211` 6.2:1 | `#fffbeb`, border `#fde68a` / `#92400e` |
| Info | `oklch(52% .14 250)` `#116bb5` 5.5:1 | tint of the same hue |

- Amber as text fails (`#e49e22` 2.3:1); use it only as a fill or border.
- Never colour alone: pair with icon, sign or word. Never red/green as the only signal.
- Status colour is for status only. Deltas: colour by good/bad direction (rising errors = negative), not up/down; zero or undefined change = grey.
- If the accent is green, `--positive` IS the accent (no two competing greens).
- A pale notice tint is never a page ground.

## Banned families (generated look)

- Indigo/violet accents, esp. Tailwind `#6366f1` (`oklch(58.5% .204 277)`).
- Two-stop "trust" gradients: purple→blue, blue→cyan, purple→pink. Cyan on dark.
- Yellow-cream ground (hue 22-62, noticeably saturated) + terracotta/rust/clay accent.
- Neon on dark, glows, chromatic halos, aurora/mesh blobs.
- Navy or slate dark themes and dark saturated sidebars on light apps (0 of 17 studied screens).
- Exception: the brand already owns the colour. Keep it, document it.

## Gradients that don't look generated

Default: none. Study: gradient fills on 22% of top sites vs 52% of weak; gradient text 2% vs 13%. Allowed:

- Neutral scrim over a photo behind text only: ink/black 35-65%, or a solid block at 40-55%.
- Area under one line chart: flat ≤14% tint, or a fade to transparent over 150-200px.
- Max 3 stops, same hue family (hue shift ≤20°), interpolated in OKLCH: `linear-gradient(in oklch, oklch(62% .15 155), oklch(55% .11 165))`.
- Never on buttons, text, cards, KPI tiles or empty backgrounds.

## Surfaces

- Separate by tone step first; a border or a shadow, never both.
- Shadows only on floating things (menu, popover, dialog). Max one resting shadow: `0 1px 2px oklch(20% .01 250 / .05)`.
- Elevated surfaces are never darker than their canvas.
- When photos carry the colour, UI stays neutral, ink from the image's darkest tone. Never wash photos in the brand hue.

## Dark palette (summary; full rules in dark-mode-dataviz.md)

Re-derive, never invert. Ground `oklch(16-18% .008-.012 h)` (`#0f1215`), +3% L per elevation level, ink L 93-95% (`#e7ecf0`), muted L 65-75%, borders L 27-32% or `rgba(255,255,255,.08)`, accent chroma -0.02 to -0.04 and L +5 to +10 (`oklch(70% .14 255)` `#5fa1f3`, 7.3:1 on that ground). Hue never moves. `color-scheme: dark`.

## Token block

```css
:root{
  --bg: oklch(98.5% .004 250); --surface: oklch(100% 0 0);
  --border: oklch(92% .006 250); --control: oklch(88% .008 250);
  --ink: oklch(21% .012 250); --muted: oklch(54% .012 250);
  --accent: oklch(55% .18 255); --accent-ink: oklch(99% 0 0);
  --focus: oklch(57% .18 255);
  --positive: oklch(52% .12 150); --negative: oklch(55% .19 27);
}
```
