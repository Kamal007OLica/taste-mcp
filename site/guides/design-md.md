# DESIGN.md, the Design Brief Agents Can Read
> Condensed from: google-labs-code/design.md (https://github.com/google-labs-code/design.md), VoltAgent/awesome-design-md (https://github.com/VoltAgent/awesome-design-md)

## Purpose

DESIGN.md is a plain-text design system for coding agents, introduced by Google Stitch (spec version `alpha`). `AGENTS.md` says how to build a project; `DESIGN.md` says how it should look and feel. It has two layers: YAML tokens, which are the exact normative values, and markdown prose, which explains why they exist and when to use them.

The prose carries the design. A specific reference ("a printed graduate seminar handout") beats adjectives ("modern, clean, premium") because a named object brings its own negative constraints: a handout has no glow, gradient or hero. Add a short, intentional Do's and Don'ts list; a long one means the reference was too vague.

## File anatomy

1. **Tokens.** Either YAML front matter fenced by lines containing exactly `---` at the top of the file, or fenced `yaml` code blocks inside the matching sections, or both. All blocks merge into one tree; each top-level key may appear only once (a duplicate rejects the file).
2. **Optional `# Title`.** Not parsed as a section.
3. **`##` sections.** Any may be omitted, but those present must keep this order:
   1. Overview (alias: Brand & Style)
   2. Colors
   3. Typography
   4. Layout (alias: Layout & Spacing)
   5. Elevation & Depth (alias: Elevation)
   6. Shapes
   7. Components
   8. Do's and Don'ts

Unknown sections (Motion, Iconography, Responsive Behavior, Voice) are preserved and ignored by the order check. A duplicated section heading rejects the file.

## Token schema

```yaml
version: alpha            # optional
name: <string>
description: <string>     # optional
omitted: [spacing]        # optional; or {section, reason} objects
colors:      {<name>: <Color>}
typography:  {<name>: <Typography>}
rounded:     {<level>: <Dimension>}
spacing:     {<level>: <Dimension | number>}
components:  {<component>: {<property>: <value | "{token.ref}">}}
```

- **Color:** any CSS color (hex, `rgb()`, `hsl()`, `oklch()`, `color-mix()`, named). Hex is recommended. Values convert to sRGB for contrast checks.
- **Dimension:** number plus `px`, `em` or `rem`.
- **Typography:** `fontFamily`, `fontSize`, `fontWeight` (number), `lineHeight` (dimension or unitless multiplier, unitless preferred), `letterSpacing`, `fontFeature`, `fontVariation`.
- **Reference:** `{colors.primary}`. Must resolve to a primitive, except inside `components`, where `{typography.label-md}` is allowed.
- **Component properties:** `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. States are sibling keys: `button-primary`, `button-primary-hover`, `button-primary-active`.
- **Recommended names:** colors `primary`, `secondary`, `tertiary`, `neutral`, `surface`, `on-surface`, `error`; typography `headline-display`, `headline-lg`, `headline-md`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-md`, `label-sm`; rounded `none`, `sm`, `md`, `lg`, `xl`, `full`.
- Custom top-level keys (for example `motion:`) are allowed and stay silent unless they look like a typo of a known key.

## How an agent should read and obey it

1. Read the whole file before writing UI. A project DESIGN.md outranks generic taste defaults; accessibility outranks both.
2. Use token values verbatim. Map them to CSS variables or the Tailwind theme (`export --format css-tailwind`) instead of retyping hex codes. Never invent a new color, font or radius.
3. Obey role rules in the prose ("accent appears only on the primary action") as strictly as the tokens.
4. Treat Do's and Don'ts as hard constraints.
5. When something is undefined, extrapolate from the Overview reference, not from your habits.
6. Follow unknown sections such as Motion or Responsive Behavior too.
7. If you change the design, update DESIGN.md in the same change and lint it.

## The CLI and linter

Package `@google/design.md` (Node 18+). Output is JSON by default; `-` reads stdin.

- `npx @google/design.md lint DESIGN.md` prints `findings` plus a `summary`; exits 1 on errors.
- `npx @google/design.md diff DESIGN.md DESIGN-v2.md` reports token adds, removals and modifications; exits 1 on regression.
- `npx @google/design.md export --format css-tailwind DESIGN.md > theme.css` (also `json-tailwind` for Tailwind v3, `dtcg` for W3C tokens).
- `npx @google/design.md spec --rules` prints the spec for prompt injection.
- On Windows: `npx -p @google/design.md designmd lint DESIGN.md`.
- In code: `import { lint } from '@google/design.md/linter'`.

The eleven rules:

| Rule | Severity | Flags |
|------|----------|-------|
| broken-ref | error | `{token}` references that resolve to nothing |
| missing-primary | warning | colors exist but no `primary` |
| contrast-ratio | warning | component text/background pairs below 4.5:1 |
| orphaned-tokens | warning | color families no component references |
| missing-typography | warning | colors but no typography (agents fall back to default fonts) |
| section-order | warning | known sections out of canonical order |
| unknown-key | warning | likely typos such as `colours:` |
| token-like-ignored | warning | unknown key holding token-like values |
| token-summary | info | token counts per group |
| missing-sections | info | spacing or rounded absent while other tokens exist |
| omitted-rules | info | invalid or redundant `omitted` entries |

## Brand files from awesome-design-md

The collection holds 84 brand files at `design-md/<slug>/DESIGN.md` (listed in `brands.json`). Drop one into the repo root and ask the agent to build in that style.

```bash
curl -o DESIGN.md https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/linear.app/DESIGN.md
```

74 files follow Google's format (front matter tokens, standard sections, plus extras like Responsive Behavior, Iteration Guide and Known Gaps). Ten older ones (kraken, lamborghini, lovable, mastercard, runwayml, sanity, spotify, starbucks, tesla, theverge) use a nine-section legacy layout with no front matter (Visual Theme & Atmosphere through Agent Prompt Guide), so the linter finds no tokens; read their prose and tables instead.

**Ethics.** Borrow structure and principles, not identity. Learn the restraint, single-accent discipline, type-scale ratios, spacing rhythm and surface ladder. Do not ship the brand's logo, wordmark, product names, copy, proprietary fonts or signature color as your primary. Shift the accent hue, swap licensed faces for open ones (Inter, Geist, IBM Plex, Public Sans), and write your own Overview reference. If a visitor could mistake the page for the brand, it went too far. The collection disclaims ownership and labels many files inspired interpretations.

## Template

```markdown
---
version: alpha
name: <Project>
description: <one sentence naming a specific reference, e.g. a 1970s field guide>
colors:
  primary: "#2F5D50"
  on-primary: "#FFFFFF"
  neutral: "#F6F3EE"
  surface: "#FFFFFF"
  on-surface: "#1C1B19"
  secondary: "#6B6760"
  error: "#B3261E"
typography:
  headline-display:
    fontFamily: <Display face>
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline-md:
    fontFamily: <Display face>
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
  body-md:
    fontFamily: <Text face>
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: <Text face>
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 12px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 24px
  caption:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
  alert-error:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
---

## Overview
<The reference, the audience, the feeling, the density. Three to five sentences.>

## Colors
- **Primary {colors.primary}:** <role; where it may and may not appear>
- **Neutral {colors.neutral}:** <page canvas>

## Typography
<Faces, scale ratio, casing, weights in use.>

## Layout
<Grid or flow model, max width, spacing rhythm.>

## Elevation & Depth
<Shadows, borders or tonal layers.>

## Shapes
<Radius logic.>

## Components
<Buttons, inputs, cards, nav: states and sizing.>

## Do's and Don'ts
- **Do** <the rule that protects the character>
- **Don't** <the most tempting wrong move>

## Motion
<Durations, easing, what never animates, reduced-motion behavior.>
```
