# The AI-UI tells and their fixes

> Condensed from: Impeccable (https://github.com/pbakaus/impeccable), Open Design (https://github.com/nexu-io/open-design), Taste Skill (https://github.com/Leonxlnx/taste-skill), Hallmark (https://github.com/Nutlope/hallmark)

A tell is a default produced without a reason; a pinned brief or DESIGN.md can earn any back except (ban) items. Removing tells is not enough: fill the gap with a product-specific idea, real content and imagery. Machine checks: `detectors.json`.

## The 10 worst offenders

1. Purple/indigo-to-blue gradients (`from-purple-500 to-blue-500`, `#6366f1`) · gradient-clipped headline text.
2. Inter/Roboto/Poppins as the only voice · tiny tracked-caps eyebrow above every heading.
3. Three equal cards of rounded icon tile + heading + blurb · thick coloured `border-left` on rounded cards.
4. Emoji as icons (🚀 ✨ ⚡) · glow shadows, blurred orbs and glass panels as decoration.
5. Buzzword copy (unlock, seamless, elevate) with invented proof ("10,000+ happy customers", ★★★★★) · "Get started" + "Learn more".

## Typography

- **Default face** (Inter, Roboto, Poppins, Montserrat, Space Grotesk, Plus Jakarta Sans, DM Sans, Outfit, Geist; the "tasteful" wave: Fraunces, Playfair, Instrument Serif, Newsreader) → you stopped looking → **Fix:** pick a face from the subject's world; max 2 families; h1/h2 via `var(--font-display)`, never bare `system-ui`. Operate/Read surfaces may use a tuned system stack on purpose.
- **Gradient text** (ban) → decoration in place of hierarchy → **Fix:** solid ink; emphasis by size or weight.
- **Flat scale** (steps under 1.25×, 9 near-equal sizes, bold everywhere) → nothing leads → **Fix:** ratio 1.2-1.25, 5-6 sizes; body→headline jump ≥3×; ≤3 sizes above the fold; weights 400 read / 500-550 UI / 600 headings.
- **Eyebrow / kicker** (ban): tiny uppercase tracked label or pill over a heading → the default SaaS section opener → **Fix:** delete it; fold real info into the heading.
- **Accented word**: one word in italic serif, colour or gradient inside a roman heading → **Fix:** set the head one way; use a line break or a second line at a second size.
- **Sentence-size display headline** (3-4 lines at text-6xl+) → eats the viewport → **Fix:** ~5-word title, max 2 lines, rest in a lede; display max 6rem.
- **Tracking extremes** → **Fix:** body 0; caps labels 0.06-0.1em; 32px+ heads -0.01 to -0.02em; 48px+ display -0.02 to -0.03em; floor -0.04em. CJK: tracking 0, display leading 1.3-1.4.
- **Tiny text** → **Fix:** body 16px (15-18), small 13-14px, caption 12px; nothing functional under 11px.
- **Unbounded measure, tight leading, justified text** → **Fix:** prose 45-75ch (`max-width: 65ch`); body leading 1.5-1.65, display 1.0-1.2; `text-wrap: balance` on heads, `pretty` on body; left-aligned.
- **Mono as costume** for labels/meta → **Fix:** mono only for code, data, measurements; `font-variant-numeric: tabular-nums` for figures.

## Color

- **AI palette**: violet/indigo gradients, blue→cyan two-stop "trust" gradient, neon cyan on near-black → **Fix:** one anchor hue mixed in OKLCH for this product; flat fills.
- **Framework default accent** (`#6366f1`, `#4f46e5`, `bg-indigo-600`, Tailwind blue-500) → **Fix:** `var(--accent)` from DESIGN.md.
- **Accent flood** → an accent in ten places means nothing → **Fix:** neutrals 70-90% of pixels, one accent 5-10% (≤2 visible uses per screen), semantic 0-5%, effects under 1%.
- **Pure #000 / #fff** → vibration, framework feel → **Fix:** dark bg `#0f0f0f` + fg `#f0f0f0`; light bg `#fafafa` + fg `#111`; or OKLCH chroma ≥0.005 toward the anchor hue.
- **Gray text on colour** → washed out, fails contrast → **Fix:** darker shade of the surface hue or near-white; body 4.5:1, large text/UI/focus 3:1.
- **Cream + serif + terracotta** (`#faf9f5` + `#d97757`) → the third-wave "warm editorial" fix became the look → **Fix:** move one axis: accent first, paper second, display face last.
- **Glow**: zero-offset coloured shadows, radial halos, blurred orbs → **Fix:** depth by a lightness step or neutral offset shadow (`0 1px 2px` + `0 8px 24px` at 6-16% black).
- **Theme by category** ("dev tool = dark") or inverted dark mode → **Fix:** one sentence of physical use scene decides light/dark; design dark elevation explicitly; dark borders `rgba(255,255,255,.08)`.

## Layout & composition

- **Template skeleton** (hero → logos → 3 features → testimonial → pricing → FAQ → CTA) → **Fix:** order by the argument; add one non-stock section (inline demo, comparison vs status quo).
- **Three equal cards** as structure → **Fix:** use the real count; lead item large, rest as list or table; vary widths and heights.
- **Everything centred** (over ~70%) → no shared edge → **Fix:** left-anchor on 2-3 reused x-positions; one centred moment.
- **Monotonous spacing** → **Fix:** 4px-based scale; tight inside groups; section gaps ≥120px at 1440 and varied; space above a heading ≥2× space below.
- **Same layout every section** (name each in one word; a repeat in a row is the template) → **Fix:** vary composition per section.
- **Hero misfit**: `h-screen`, headline + lede + action + visual not all visible at 1280×800, >80 words per screen, dead band >160px → **Fix:** `min-h-svh`; headline, one sentence, actions, visual.
- **Index numbering** (01 / 02 / 03, "Step 02") → **Fix:** order by position and scale; `<ol>` for real sequences.

## Components & surfaces

- **Icon tile above heading** (`h-12 w-12 rounded-xl bg-*-100`) → the universal feature card → **Fix:** icon inline beside the heading, or none.
- **Side-stripe border** (ban): `border-left` ≥2px on rounded cards/alerts → **Fix:** tinted background, icon + label, or full 1px border.
- **Nested cards** (ban) → **Fix:** one containment layer; separate with space, type, dividers.
- **Cards everywhere / ghost card** (rounded-2xl + shadow-xl on all; 1px border + wide shadow) → **Fix:** declare elevation once, edge OR shadow; nothing at rest wears a shadow; card radius 12-16px.
- **Glass by default** → **Fix:** one sticky bar may blur; cards opaque, one tone step from the ground.
- **Hero-metric template** (big number, small label, stat row) → **Fix:** pair each real figure with the sentence that says what it means.
- **Fake product** (styled-div dashboards, traffic-light chrome, device frames) → **Fix:** real screenshot or live component in a plain `<figure>`.
- **AI chrome**: wordmark/links/button nav with hairline, 4-column footer, closing email sign-up, modal by reflex → **Fix:** decide each for this product; end on what the visitor came to do.

## Icons & imagery

- **Emoji or unicode glyphs as icons** (ban), two icon libraries → **Fix:** one library, 1.5-1.8px stroke, `currentColor`; decorative SVG gets `aria-hidden="true"`.
- **Placeholder imagery**: grey boxes, picsum/placehold.co, pravatar faces, empty `src` → **Fix:** real verified photos (one decisive photo beats five); reserve space with `aspect-ratio`.
- **Drawn illustration and decorative backgrounds**: SVG scenes from primitives, sketchy SVG, grain, grid/stripe/blob backgrounds → **Fix:** photograph, the product itself, or type at scale; SVG for geometry and diagrams.
- **Type-only marketing page** → reads unfinished → **Fix:** show the subject in ≥4 real pictures.

## Copy

- **Buzzwords** (unlock, unleash, supercharge, seamless, elevate, empower, revolutionize, cutting-edge, next-gen, world-class, all-in-one, effortless, streamline) → **Fix:** the specific verb and noun.
- **Filler openers** ("In today's fast-paced world", "Built for the modern team") → **Fix:** start with the claim.
- **Manufactured cadence** ("Not a tool. A teammate.", "X. No Y." repeated, threes everywhere) → **Fix:** say it once, plainly; use the count the content has.
- **Generic CTAs** (Get started, Learn more, Book a demo, Submit, glued arrows) → **Fix:** name the action: "Start tracking", "See the plans".
- **Invented proof** (user counts, 10× claims, 99.99% uptime, logo walls, ★★★★★) → **Fix:** sourced proof, or show the product working; label samples.
- **Placeholders** (lorem ipsum, "Feature one", Jane Doe, Acme, Sarah Chen) → **Fix:** plausible full-density content, listed for the client to confirm.
- **Furniture text** ("Field notes", "Quietly trusted by", "Scroll to explore", "Available for work", "Est. 2024", A · B · C strings, "X theater") → **Fix:** plain section names; delete.
- **Em-dash habit** (more than ~4 per page) → **Fix:** full stops, commas, colons.

## Motion

- **Fade-up on every block**, staggered hero entrances, hover lift on every card → **Fix:** one authored focal moment; content visible by default; reveal once, ≤900ms; one hover signal per element.
- **Bounce/elastic/overshoot** (`animate-bounce`, `cubic-bezier(.34,1.56,.64,1)`), ease-in or `scale(0)` entrances → **Fix:** `cubic-bezier(0.16,1,0.3,1)` from scale 0.95-0.98 + opacity 0.
- **Arbitrary durations** → **Fix:** feedback 100-150ms, state 150-300ms, overlays 200-300ms, view transitions 300-500ms, focal entrance 500-800ms; exits faster; frequent hovers ≤200ms; mobile 20-30% shorter.
- **`transition: all`**, animating width/height/top/left/margin → **Fix:** name properties; transform, opacity, bounded blur/clip-path/mask.
- **Meaningless loops**: pulsing dots and CTAs, marquees, typewriter heads, custom cursors, preloaders → **Fix:** static; pulse only for live data; pause control past 5s.
- **No reduced-motion path** → **Fix:** `prefers-reduced-motion: reduce` drops translate/scale/parallax, keeps opacity/colour state changes.
- **Hidden at rest** (`.reveal{opacity:0}` waiting on JS) → **Fix:** hide only under `.js`, or animate from visible with `@starting-style`.

## Interaction & states

- **Happy path only** → **Fix:** default, hover, focus, active, disabled, loading, error, success, empty; errors name the problem and the recovery.
- **Loading by availability** → **Fix:** under 300ms nothing; 0.3-2s subtle spinner; 2-10s layout skeleton or labelled spinner; 10s+ determinate bar + cancel; stop at 60s with retry.
- **Blank empty state** ("No data") → **Fix:** headline + one value sentence + primary action; no-results echoes the query.
- **Focus removed** (`outline-none`, ring fades in) → **Fix:** `:focus-visible` ring ≥2px at ≥3:1, instant.
- **`<div onClick>`**, `<a>` without href → **Fix:** `<button>` / `<a href>`.
- **Targets and controls** → **Fix:** ≥24×24px (AA), aim 44×44; marketing controls 44-52px tall, app 32-40px with hit expansion; inputs and buttons share height.
- **Raw browser defaults** (selection, caret, scrollbars, underline offset), fake success messages → **Fix:** theme them from the palette; no success state until the form is wired.
