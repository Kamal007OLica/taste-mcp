# Core taste rules

> The 25 rules that matter most, in priority order. Every other guide in this kit elaborates one of them.

> Condensed from: all 14 sources (see list_sources). Where they disagree, the more specific rule won.

## Decide before you draw
1. **Write the one-line brief first:** who it is for, and the one thing the screen must make them feel or do. If you cannot write it, ask before building.
2. **Commit to one direction** (`pick_direction`) with a named signature move: a type treatment, a layout idea, a material, a motion moment. Generic is what a non-decision looks like.
3. **DESIGN.md is law.** If the repo has one, follow it. If it does not, write one (`write_design_md`) before the second screen, so every later session builds in the same style.

## Type
4. **Two families at most** (plus an optional mono). Inter, Roboto, Arial or bare system-ui as the only face reads as "default"; if you keep a neutral sans for UI, pair it with a display face that has a voice, or set it with conviction (tight tracking, big size contrast).
5. **Use a modular scale:** about 1.2 for apps, 1.25 to 1.333 for marketing. Display tracking -0.02em to -0.04em; body 0. All-caps only for short functional labels (table headers, tags) at 11 to 12px with +0.06em to +0.1em; never a tiny tracked-caps eyebrow above every heading.
6. **Readable text:** body 16 to 18px on the web (13 to 14px only for dense app UI), line-height 1.5 to 1.65 for body and 1.05 to 1.2 for headings, line length 45 to 75 characters. Tabular numerals wherever numbers align.
7. **Hierarchy comes from size and weight,** not colour. Three weights at most.

## Colour
8. **Tinted neutrals plus one accent.** Give the grey ramp a slight warm or cool hue, and keep the accent to roughly 10% of the screen: primary action, focus, the key datum.
9. **No pure #000 on #fff:** use near-black (#111 to #1c1c1c) and an off-white. Text contrast 4.5:1, large text and UI parts 3:1.
10. **No purple-to-blue gradients, no gradient-filled headline text, no rainbow glows.** A gradient is fine when it stays in one hue family (a few % of lightness) or is part of the actual brand.
11. **Dark mode is not inverted:** raise surfaces with lighter tones instead of shadows, desaturate the accent a little, and use off-white text (about #e6e6e6), not #fff.

## Layout and space
12. **4px grid.** Scale 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 96 to 160px on desktop, 56 to 96px on mobile.
13. **Proximity groups things:** the space inside a group is at most half the space between groups.
14. **Few alignment edges.** Left-align text by default; centre only short hero lines and single CTAs.
15. **Break the template.** Avoid hero, three identical icon cards, logo strip, testimonials, CTA in that order. Vary section anatomy, use asymmetry, and give each screen one oversized element.
16. **Contain it:** page content about 1200 to 1280px wide, text columns 600 to 720px.

## Surfaces and components
17. **One shape family:** two or three radii, and a nested radius equals the outer radius minus the padding. Separate with borders or with shadows, not both at full strength; shadows are soft, layered, low opacity and tinted toward the background.
18. **Icons:** one family, one stroke width (1.5px at 24px), sized to the text they sit beside. Never emoji as UI icons.
19. **Every control has hover, focus-visible (2px ring, 2px offset), active (scale 0.97 or one shade darker) and disabled states.** Touch targets are at least 44px.
20. **Design the states,** not only the happy path: empty (with a first action), loading (skeletons shaped like the content), error (what happened and how to fix it), success.

## Motion
21. **Animate to explain change, not to decorate.** 150 to 250ms for UI and 300 to 500ms for large surfaces; ease-out on enter, for example cubic-bezier(0.23, 1, 0.32, 1); never ease-in for UI; animate transform and opacity only; never `transition: all`; honour prefers-reduced-motion.
22. **One signature motion moment per page.** No bouncing or pulsing CTAs, and no fade-up on every section.

## Copy and content
23. **Specific beats clever:** name the user, the job and the number. Banned: "Unlock", "Elevate", "Seamless", "Revolutionize", "Supercharge", "cutting-edge", "In today's fast-paced world", and a "Get Started" plus "Learn More" pair.
24. **Real content only:** real product screenshots, realistic data, honest proof. No lorem ipsum, no invented logos, stats or testimonials.

## Verify
25. **It is not designed until you have looked at it.** Screenshot at 390px and 1440px, squint for a single focal point, run `audit_ui`, fix, and look again.

---

# How a tasteful build runs

> Condensed from: Impeccable (https://github.com/pbakaus/impeccable), Taste Skill (https://github.com/Leonxlnx/taste-skill), Hallmark (https://github.com/Nutlope/hallmark), Open Design (https://github.com/nexu-io/open-design)

Brief → context → direction → build → critique → polish → ship check.

## 0. Name the mode (decides how much ambition)

| Mode | Surfaces | Ambition shows as |
|---|---|---|
| Persuade | landing, pricing, campaign | bold, committed world; real imagery |
| Operate | app, dashboard, settings, admin | precision, scanability, familiar patterns |
| Read | docs, articles, changelog | measure, structure, wayfinding |
| Experience | portfolio, gallery, showcase | the artifact leads, UI recedes |

Choose by surface: a dev tool's landing page is Persuade.

## 1. Brief

- Ask 2-3 questions per round, 1-2 rounds max: who arrives and in what state; the one primary action; what is uniquely true here; what real content, proof and assets exist; which states matter (empty, error, loading, overflow); what must stay untouched.
- Never ask for CSS values or style menus; assert the likely reading and invite correction.
- Output 3-5 bullets: job + audience, outcome + proof, scope, states, constraints. Confirm, then build.

## 2. Context files

- **PRODUCT.md** (durable truth): users, purpose, positioning, operating context, constraints, brand commitments, evidence on hand plus explicit absences that must not be fabricated. No visual decisions.
- **DESIGN.md** (visual system, Google design.md format: YAML tokens + prose; tokens normative). A missing DESIGN.md does not mean greenfield: if the code has a coherent identity, document it before extending it.
- Refinement preserves the incumbent look; redesign replaces it, never polishes it.

## 3. Direction

- Colour strategy before colours: Restrained (tinted neutrals + 1 accent), Committed (one saturated colour on 30-60% of the surface), Full palette (3-4 named roles), Drenched (the surface is the colour).
- Light or dark from one sentence of physical scene (who, where, what light), never from category.
- Faces from the subject's world. A pick from the reflex list (Fraunces, Playfair, Space Grotesk, Inter-as-display, DM Sans, Outfit, Plus Jakarta Sans, Instrument Sans) needs a reason no other face satisfies.
- Self-check: if someone could guess the look from the category alone, or from category plus the avoid list, rework. Known ruts: cream + serif + terracotta; near-black + neon + glow; hairlines + italic serif + mono labels; flat ink + hard offset shadows.
- 80/20: proven patterns plus one bold move, product-specific microcopy, one memorable micro-interaction, one insider detail.
- First viewport is a thesis: show the mechanism working. Memory test: what would a visitor describe an hour later?
- Write a ~150-word direction contract: world, first viewport, visitor path, signature interaction, honest risk.

## 4. Build

- Read `anti-slop.md` immediately before editing UI. Real content at full density; prove, don't claim; author assets, never substitute chrome (gradients, glass, icon tiles) for missing content.
- Pre-emit critique (Hallmark): score Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety 1-5; revise anything under 3 before writing code.
- Run `detectors.json` after every UI edit; fix mechanical hits immediately.

## 5. Critique (fresh eyes, on screenshots)

- Settle animations; capture desktop, mobile and the user's viewport. Judge pictures, not code.
- Passes: 1 s and 5 s glance (one focal answer); squint (2-3 masses); cover the logo (could a competitor use it?); count left edges (2-3); section gap > any inner gap; headline ≥3× body, ≤5 sizes; accent on one action; images doing jobs; layout word per section (no repeats); phone is its own composition; nothing covers text; one live thing.
- Score: design 40%, usability 30%, creativity 20%, content 10%. Caps: any eyebrow, decorative gradient, 01/02/03 or resting shadow → ≤6.5; placeholder → content ≤5. Nielsen 10 heuristics 0-4 (real UIs land 20-32/40).
- Run design review and detector scan independently (separate subagents) so findings don't anchor judgment.
- Fix order: idea → hierarchy → composition → type → imagery → colour → detail → motion. 2-3 rounds max; stop when a stranger would notice nothing; report scores under 7.5 honestly.

## 6. Polish and ship check

- Triage: broken tasks and inaccessible paths → missing states → flow/hierarchy/system drift → visual/motion → code cleanup.
- Ship gate: all states; contrast 4.5:1 / 3:1; visible instant focus; keyboard path; targets ≥24px (aim 44); reduced-motion path; no horizontal scroll 320-1920px; no console errors or layout shift; detectors clean or waived with a page-specific reason. Nothing ships with an open floor-level failure.

## Impeccable's 24 commands by phase

| Phase | Command | Does | Reach for it when |
|---|---|---|---|
| Context | `init` | writes PRODUCT.md from repo + short interview | first run on any project |
| Context | `document` | generates DESIGN.md from existing code | coherent UI exists, no DESIGN.md |
| Context | `extract` | promotes patterns used 3+ times into tokens/components | repeated hard-coded values |
| Brief | `shape` | discovery interview → confirmed brief, no code | new surface or feature is ambiguous |
| Build | `craft` | deprecated alias for a normal new-work build | (just ask for the surface) |
| Build | `overdrive` | proposes 2-3 ambitious technical directions, builds the chosen one | a moment should feel extraordinary |
| Iterate | `live` | pick elements in the browser, cycle variants | dev server running, visual tuning |
| Iterate | `generate` | N variants of a named element in the live browser | "give me 3 hero options" |
| Evaluate | `critique` | design review: specificity verdict, heuristics, personas | before polishing, after a build |
| Evaluate | `audit` | scored a11y/perf/theming/responsive/integrity report, no fixes | pre-release technical check |
| Refine | `typeset` | fonts, roles, scale, measure | type feels default or flat |
| Refine | `layout` | spacing rhythm, grouping, structure | sections feel samey or cramped |
| Refine | `colorize` | strategic colour roles, contrast | UI is gray or colour lacks meaning |
| Refine | `animate` | one focal motion + feedback, reduced-motion path | static or motion is scattered |
| Refine | `clarify` | rewrites labels, errors, microcopy | copy is vague or generic |
| Refine | `adapt` | rethinks for other devices/inputs | mobile or touch is an afterthought |
| Refine | `harden` | long text, i18n, errors, offline, 1000+ items | before real users and data |
| Refine | `onboard` | first-run, empty states, path to first value | activation or empty screens |
| Refine | `optimize` | measures and fixes LCP/INP/CLS, bundle, jank | it feels slow |
| Tune | `bolder` | amplifies one section with the system's own moves | safe or bland |
| Tune | `quieter` | reduces saturation, weight, motion, noise | loud or overstimulating |
| Tune | `distill` | strips to one primary goal per screen | cluttered or feature-creep |
| Tune | `delight` | one humane, product-specific moment | functional but lifeless |
| Ship | `polish` | final consistency, states and system alignment pass | before shipping |

## Commands you can emulate by asking

| Ask the agent | It should |
|---|---|
| "Shape this first" | ask 2-3 questions, return a 3-5 bullet brief, write no code |
| "Critique this page" | screenshot desktop + mobile, run passes + scores, list top 3 fixes with evidence |
| "Run the slop check" | apply `detectors.json` to changed files, fix or justify each hit |
| "Audit it" | score a11y, performance, theming, responsive, integrity 0-4 each (/20), tag P0-P3 |
| "Make it bolder / quieter" | change only the named target, reusing the system's own type, colour and motif |
| "Distill it" | cut to one primary action per screen, ≤4 options per decision point |
| "Harden it" | test long, empty, RTL, error, slow and permission states; add the missing ones |
| "Polish it" | triage in the order above, then run the ship gate |

---

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

---

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

---

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

---

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

---

# Layouts: page macrostructures

> Condensed from: Hallmark (https://github.com/Nutlope/hallmark)

Design the page from its job first (what the visitor came to do: sign up, buy, book, hire, subscribe, try), then name the shape. Never default to hero, three features, CTA band, footer. Numbers assume 1440 x 900, 12 columns, 1312px container (64px gutters), 32px column gap. "Screen" = 900px.

## Pick by domain (choose the one least like your last build)

| Domain | Candidates |
| --- | --- |
| SaaS / platform / B2B | bento-grid, workbench, stat-led |
| Dev tool, API, CLI, docs | workbench, long-document, component-playground |
| Fintech | stat-led, workbench, long-document |
| Shop / DTC | catalogue, photographic, bento-grid |
| Studio / portfolio | portfolio-grid, split-studio, index-first |
| Personal / founder | long-document, letter, index-first |
| Cause / event | manifesto, quote-led, marquee-hero |
| Marketplace / community | ecosystem-index, index-first, catalogue |
| Dashboard / admin | app-screen |

## The shapes

**bento-grid**: many equal entry points (feature-rich SaaS). Skeleton: hero (1 screen, grid's first row visible inside it) > 6-9 tiles, mixed spans (8+4 over 4+4+4), rows 280-360px, one lead tile > spec table > pricing > FAQ > footer. Hero: head on cols 1-7, outlined action. Avoid: equal tiles, icon-over-heading cards, one-idea pages.

**long-document**: philosophy, case study, founder post. Skeleton: corridor hero > continuous prose, 60-65ch, line-height 1.65+, inline bold run-in heads > one inline image at measure > colophon footer. Hero: one column, link inside the first paragraph is the action. Avoid: transactional pages.

**marquee-hero**: the brand or person is the message. Skeleton: poster fold with type clamp(4rem, 10vw, 9rem) > thick rule or paper change > rows/grid of work > footer. Hero: statement fills the fold; sentence and one action small at its foot. Avoid: products needing explanation in 5 seconds.

**stat-led**: the user gave a real number. Skeleton: figure hero > 2-4 sections each anchored by a supporting figure or chart > qualifier rows > close. Hero: figure at graphic scale plus a worded headline saying what it means; tabular nums. Avoid: any invented or derived number.

**workbench**: the product UI is the pitch. Skeleton: stage hero (capture on cols 6-12, 560px+) > 3-5 captures, each a figure with a one-fact caption > pricing > band close; optional sticky bar after capture 3. Hero: real screenshot, no device or browser chrome. Avoid: service businesses.

**conversational-faq**: scepticism, regulated or educational fields. Skeleton: hero asks the first question > 6-10 question heads (real `?`), 1-2 short paragraph answers, hairlines between > one outlined CTA. Hero: the question is the h1. Avoid: as the only shape on a launch page.

**manifesto**: sell a belief before a product. Skeleton: poster hero in caps > 4-6 one-claim sections, paper changes between > one solid action at the foot. Hero: declaration plus the action in the fold. Avoid: checkout, tours.

**photographic**: hospitality, fashion, food, places. Skeleton: full-bleed poster photo > alternating photo band / material section (menu rows, hours table, statement), photos at most 45% of page > close on the job (booking, address). Hero: head and sentence on a small paper plate at the image base. Avoid: two photo sections in a row; subjects with nothing to photograph.

**quote-led**: a real, supplied customer quote. Skeleton: quote as statement at display-s with attribution > more supplied quotes as rows > quiet feature list > close. Avoid: writing or paraphrasing quotes.

**specimen**: only type, publishing, a journal or press. Skeleton: large serif phrase > asymmetric spans (narrow margin column for dates and notes, wide content) > hairline rules > typographic link CTA. Avoid: any other prompt (most-copied look).

**catalogue**: variants of one thing (SKUs, palettes, fonts). Skeleton: one-line head > uniform grid 3-5 per row, each card image, name, price, action > footer. Hero: products start above the fold. Avoid: products with hierarchy; empty image frames.

**letter**: founder note, pivot, appeal. Skeleton: salutation (1.5-2x body) > 50ch prose > signature > letter close footer. Avoid: commerce.

**index-first**: docs hubs, archives, link pages. Skeleton: short hero-size head plus one line > 6-20 hairline rows with facts in columns, filter row above, lead row larger. Avoid: hard sells.

**narrative-workflow**: a real sequence of use. Skeleton: hero > 3-5 stages, number inside the h2 or a real `<ol>`, each with a different full-size object (capture, timer, table) > action again. Avoid: three stages with identical visuals (reads as three features).

**split-studio**: every claim wants proof beside it. Skeleton: 3-5 split rows, proof keeps one side, ratios vary (7/5, 6/6, 5/7 weights), one lead row. Avoid: zigzag (mirror once max), photo brands.

**feature-stack**: premium paced story. Skeleton: per section a sticky left pane (head, action) plus 3-6 scrolling captures right; unpins under 60rem. Avoid: mobile-first audiences without a fallback.

**type-specimen**: a custom typeface is the product. Skeleton: the face at several sizes > body size, italics, language coverage, OpenType features, each captioned below > buy action. Avoid: off-the-shelf fonts.

**portfolio-grid**: studios where work is the product. Skeleton: one short line > filter row > project grid (same size or slight variation) > contact. Avoid: products; blank thumbnails (set projects in type instead).

**map-diagram**: system maps, floor plans, flows. Skeleton: orientation head plus action > one large SVG map with legend and hover states (real data) > supporting rows. Avoid: decorative maps; under 60rem collapse to an ordered list.

**ecosystem-index**: marketplaces and communities. Skeleton: positioning line > 3-5 rails or grids (featured, latest, by category, by people), each with its own h2 and a "See all" link. Avoid: single products; fake listings.

**component-playground**: design systems, snippet libraries. Skeleton: category h2s > preview plus code blocks, framework tabs, Copy button (label flips to "Copied" 2.5s). Avoid: marketing pages; mono outside code.

**app-screen** (dashboards, admin, settings): no hero, no fold, no word budget. Top bar unless 7+ destinations earn a sidebar. Lead with the one object the tool is known by (queue, ledger, timeline), tables before cards, controls 32-40px with 44px hit area, fixed 1.125-1.2 type scale, every data region drawn in loading, empty, error and full states, filters in the URL. Avoid: greeting over four KPI cards.

## Hero anatomy

- Exactly one screen at 1440 x 900; next section starts between y 760 and 900.
- Content: h1 of 7 words or fewer (50 chars), one sentence of 12 words or fewer at lead size (21px), one or two actions (one filled, one quiet going elsewhere). All visible at 1280 x 800.
- Postures: Settled (6/6 split), Stage (text 5 cols, visual 7 cols at 60-75% screen height, may bleed off edge), Banner (50-60% height, docs), Ledge (head resting at base), Corridor (one 44ch column), Poster (full-bleed photo 92-100dvh), Counter (the action is the visual: buy box, booking times), Index (the list is the visual).
- Space below content = 1.0 to 1.5x space above; no more than 160px dead band above the fold.
- Visual: 6-7 columns, 520px+ tall, centre within 60px of the text block, 48-120px gap. Use the real product, user photo, or type at full scale. Never a gradient blob, empty box, drawn illustration or eyebrow pill.
- Use `dvh`/`svh`, never `vh`. One entrance, 400-800ms total, from visible.

## Section rhythm

- 6-9 sections including hero and footer (5 on thin prompts); 450 visible words max; about 80 words per 900px window.
- Section gaps 120 / 144 / 176px mixed (80-120 under 60rem, 56-96 under 40rem); a band of changed paper takes 120px padding. Never one gap everywhere.
- Section head h2 at 48-56px (never under 40px), 6 words or fewer, 16-24px to its one lead line, 48-64px to the body.
- Every body has mass: visual 360px+ tall, or 3-4 items across, or 3+ rows across 10 columns, or a statement at h2 size. Widest row reaches 10 of 12 columns.
- Use 3-6 different compositions; never the same twice in a row. Follow a dense section (grid, table, bento) with a quiet one (statement, showcase).
- Vary dividers by seam: whitespace, hairline, tinted well, card (border or shadow, never both). Never a card inside a card.
- Photos cover 25-33% of the page below the hero (45% on photographic or portfolio shapes).
- End on the job (booking, buy box, download, next date), never an email band by default. Footer 200-400px.
- Squint test: blur the words; each section still has a shape and the page alternates heavy and light.

---

# Motion

> Condensed from: emilkowalski/skills (https://github.com/emilkowalski/skills): animate, review-animations, improve-animations, find-animation-opportunities, animation-performance, animation-vocabulary, emil-design-eng

## 1. Gate: should it animate at all?

| How often seen | Rule |
| --- | --- |
| 100+/day (shortcuts, ⌘K toggle, tab switch) | No animation. Instant. |
| Tens/day (hover, list nav, row select) | Near-imperceptible (<150ms, tiny delta) or nothing |
| Occasional (modal, drawer, toast, popover) | Standard animation |
| Rare (onboarding, success, empty state, celebration) | Delight budget lives here |

- Keyboard-initiated actions never animate (Raycast has no open/close animation; correct).
- Name the purpose in one word: feedback, spatial consistency, state indication, preventing a jarring change, explanation (marketing only), delight (rare tier only). Can't name it: don't build it.
- Data the user reads or acts on (dashboard charts, tables) does not move for style.
- Cheapest tool that works: CSS transition → `@starting-style` → CSS keyframes (predetermined, stays smooth while page is busy) → WAAPI `el.animate()` → Motion (springs, layout, exit, gestures). No library for a fade.
- Reuse the codebase's easing/duration tokens; never fork a parallel set.

## 2. Duration

| Element | Duration |
| --- | --- |
| Press feedback | 100-160ms |
| Tooltip, small popover | 125-200ms |
| Dropdown, select, menu | 150-250ms |
| Modal | 200-300ms |
| Drawer, sheet | 300-500ms or spring |
| Stagger step | 30-80ms per item |
| Marketing, explanatory | Longer is fine |

UI stays under 300ms unless it is a drawer or marketing. A 180ms dropdown feels faster than a 400ms one.

## 3. Easing

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);     /* enter, exit, default */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* moving/morphing on screen */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);  /* iOS-like sheet */
}
```

- Enter/exit: ease-out. On-screen move: ease-in-out. Hover/color: `ease`. Progress, marquee, hold-fill: `linear`.
- Never `ease-in` on UI: it stalls the first frames, the exact moment the user watches.
- Built-in keywords are too weak for deliberate motion. Need another curve: take one from easing.dev or easings.co; don't invent or default to `cubic-bezier(0.4,0,0.2,1)`.

## 4. Springs

Use when a pointer/finger drives it, it can be interrupted or reversed, it should feel alive, or it is decorative pointer-tracking.

| Use | Motion config | Apple terms |
| --- | --- | --- |
| Default settle | `{ type: "spring", bounce: 0, duration: 0.4 }` | damping 1.0, response 0.4 |
| After a flick/throw | `{ type: "spring", bounce: 0.2, duration: 0.4 }` | damping 0.8 |
| Sheet, drawer | `{ type: "spring", bounce: 0.2, duration: 0.3 }` + release velocity | damping 0.8, response 0.3 |
| Physics form | `{ stiffness: 100, damping: 10, mass: 1 }` | |

Bounce 0.1-0.3 max and only when the gesture carried momentum. A menu that faded in never overshoots. Pointer-follow: `useSpring(v, { stiffness: 100, damping: 10 })`, not raw mapping.

## 5. Properties and physicality

- Animate `transform` + `opacity`. `clip-path` is the sanctioned fourth. `height` only for short accordions. Never `width/height/margin/padding/top/left`. Animated `box-shadow` → `filter: drop-shadow()`.
- Never `transition: all`; list properties.
- Never `scale(0)`. Enter from `scale(0.95-0.97)` + `opacity: 0`.
- Popovers, dropdowns, tooltips, menus scale from the trigger: `transform-origin: var(--transform-origin)` (Base UI) or `var(--radix-popover-content-transform-origin)` (Radix). Modals stay `center`.
- `translateY(100%)` is relative to the element itself; prefer over px for sheets/toasts.
- Motion `x/y/scale` shorthands run on the main thread. If the animation plays during route changes or hydration, use `animate={{ transform: "translateX(100px)" }}`.
- Never drive child transforms through a CSS variable on a parent (style recalc on every descendant). Set `transform` on the element.
- React: no `setState` per frame. Write `ref.current.style.transform` or a motion value.
- Animated blur under 20px (2-5px is enough). `will-change: transform` only after you see a 1px shift or measured drops.
- Frame budget: 16.7ms at 60Hz, 8ms at 120Hz. Judge on a mid-range phone.

## 6. Enter/exit, interruption, stagger

- Transitions retarget from the current value; keyframes restart from zero. Anything fired rapidly (toasts, toggles, expand) uses transitions or springs.
- Exit the way it entered (in from bottom, out through bottom).
- Asymmetry: slow where the user decides, snappy where the system answers. Hold-to-delete: 2s linear press, 200ms ease-out release. Exits faster than enters.
- Never lock input mid-transition; start new motion from the on-screen value.
- Stagger is decorative: 30-80ms, never blocks interaction, never on lists seen all day.
- Tooltips: delay the first; once one is open, neighbours open with `transition-duration: 0ms`.
- Crossfade shows two objects? Add `filter: blur(2px)` during the swap.
- Scroll reveal: marketing only, fire once (`useInView(ref, { once: true, margin: "-100px" })`).

## 7. Reduced motion and hover gating (ship with the animation)

```css
@media (prefers-reduced-motion: reduce) {
  .panel { transition: opacity 200ms ease; transform: none; }
}
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-2px); }
}
```

Reduced means fewer and gentler, not zero: keep opacity/color, drop translate, scale, parallax, overshoot. React: `const reduce = useReducedMotion()`.

## 8. Perceived performance

- Feedback on `:active` / `pointerdown`, never only on `click`.
- ease-out at 200ms feels faster than ease-in at 200ms.
- A faster-spinning spinner makes the same load feel shorter.
- Skeletons must match the final layout exactly.

## 9. Vocabulary (prompt with the exact word)

Origin-aware animation · Scale in vs Pop in (overshoot) · Reveal (clip-path/mask) · Crossfade vs Morph vs Shared element transition vs Layout animation · Direction-aware transition · Stagger · Orchestration · Rubber-banding · Momentum · Velocity handoff · Interruptible animation · Swipe to dismiss · Hold to confirm · Text morph · Number ticker + tabular numbers · Skeleton/shimmer · Perceptual duration · Asymmetric easing · Anticipation · Follow-through.

## 10. Review checklist

Block on: animation on a keyboard/100+/day action · `ease-in` on UI · `scale(0)` · `transition: all` · UI >300ms without reason · centered origin on a trigger-anchored popover · keyframes on toasts/toggles · layout-property animation · Motion shorthands on busy pages · parent CSS var driving child transforms · ungated `:hover` motion · no reduced-motion · symmetric press/release timing · everything entering at once. Fix order: delete → reduce → easing → origin → interruptible → GPU → asymmetry → polish → a11y. Feel-check at 2-5× duration, frame by frame, on a real device, again next day.

## 11. Recipes

**Button press**

```css
.btn { transition: transform 160ms var(--ease-out); }
.btn:active { transform: scale(0.97); }
```
Tailwind: `transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]`

**Dropdown from its trigger (Base UI)**

```css
.menu {
  transform-origin: var(--transform-origin);
  transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
}
.menu[data-starting-style], .menu[data-ending-style] { opacity: 0; transform: scale(0.95); }
```
Tailwind v4: `origin-(--transform-origin) transition duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0`

**Toast enter (prefer Sonner over hand-rolling)**

```css
.toast {
  transition: transform 400ms ease, opacity 400ms ease;
  @starting-style { opacity: 0; transform: translateY(100%); }
}
```
Transitions, not keyframes, so a new toast retargets the stack mid-flight. Exit through the same edge.

**Drawer with flick-to-dismiss**

```css
.drawer { transition: transform 500ms var(--ease-drawer); }
.drawer[data-closed] { transform: translateY(100%); }
```
```js
el.style.transform = `translateY(${dy}px)`;           // during drag, on the element itself
const v = Math.abs(dy) / (Date.now() - startTime);   // px/ms
if (dy > THRESHOLD || v > 0.11) close(); else snapBack();
```
Pointer capture on start, ignore extra touches, rubber-band past the top edge.

**Skeleton shimmer done right**

```css
.skel { position: relative; overflow: hidden; background: var(--gray-3); border-radius: inherit; }
.skel::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgb(255 255 255 / .35), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.4s linear infinite;
}
@keyframes shimmer { to { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .skel::after { animation: none; } }
```
Shimmer moves via `transform` (composite only), not `background-position` (repaints). Same box sizes as the loaded content so nothing shifts.

**Number ticker**

```jsx
import NumberFlow from "@number-flow/react";
<NumberFlow value={total} format={{ style: "currency", currency: "USD" }} />
```
Always `font-variant-numeric: tabular-nums` (Tailwind `tabular-nums`). Never re-render text per frame through state.

**Height auto (accordion)**

```jsx
<AnimatePresence initial={false}>
  {open && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      style={{ overflow: "hidden" }}
    />
  )}
</AnimatePresence>
```
CSS-only: `display: grid; grid-template-rows: 0fr → 1fr` with `transition: grid-template-rows 200ms var(--ease-out)` and `min-height: 0` on the child, or use the primitive's measured var (`--radix-accordion-content-height`). Keep it short: height costs layout every frame.

**Hold to confirm**

```css
.fill { clip-path: inset(0 100% 0 0); transition: clip-path 200ms var(--ease-out); }
.hold:active .fill { clip-path: inset(0 0 0 0); transition: clip-path 2s linear; }
```

---

# GSAP, Scroll Worlds and WebGL over HTML

> Condensed from: greensock/gsap-skills (https://github.com/greensock/gsap-skills), oso95/scroll-world (https://github.com/oso95/scroll-world), DavidHDev/canvas-ui (https://github.com/DavidHDev/canvas-ui)

## When GSAP

- For: timelines with runtime control (pause, seek, reverse), scroll-linked motion, SVG draw/morph, split-text, FLIP layout changes. If the project already uses another library, keep it.
- Simple UI transitions stay in CSS (motion.md). GSAP runs on rAF: best for storytelling and marketing, not micro-interactions.
- All plugins are free in the public `gsap` package. Never add an `.npmrc` token or private registry.

## Core rules

- Durations in seconds. Transform aliases (`x, y, xPercent, yPercent, scale, rotation, rotationX`), never `left/top/width/height`.
- Fade with `autoAlpha` (hidden at 0, so invisible elements stop eating clicks).
- Eases: `power2.out` / `power3.out` for entrances, `power2.inOut` for on-screen moves, `"none"` for scrub. Exact UI curve: `CustomEase.create("ui-out", "0.23,1,0.32,1")`.
- Multiple `from()`/`fromTo()` on the same prop: `immediateRender: false` on the later ones.
- Retriggered tweens: `overwrite: "auto"`. Pointer followers: `gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })`.
- Hand control back to CSS after: `clearProps: "transform"`.
- Responsive and accessible: `gsap.matchMedia()` with `{ isDesktop: "(min-width: 800px)", reduceMotion: "(prefers-reduced-motion: reduce)" }`; skip or zero-duration when `reduceMotion`. Don't nest `gsap.context()` inside it.

## Timelines

- Sequence with a timeline, never chained `delay`. Shared `defaults: { duration, ease }` on the timeline; `addLabel()` for readable choreography.
- Position: `0` absolute, `"+=0.2"` gap, `"-=0.1"` overlap, `"<"` with previous start, `">"` after previous end, `"label+=0.3"`.

## ScrollTrigger

- `gsap.registerPlugin(ScrollTrigger)` once, at module level.
- ScrollTrigger goes on a timeline or top-level tween only, never on a child tween, never nested.
- `start/end`: `"triggerEdge viewportEdge"` (`"top top"`, `"bottom 80%"`), `"+=100%"`, `clamp(top bottom)`.
- `scrub: true` (locked) or `scrub: 1` (1s catch-up, smoother). Use scrub OR `toggleActions`, not both.
- `pin: true`: animate the pinned element's children, not the pinned element. Keep `pinSpacing` on.
- Create triggers top-to-bottom, or set `refreshPriority`. Call `ScrollTrigger.refresh()` after fonts, images or async content (resize is automatic).
- `snap: { snapTo: "labels", duration: 0.3, ease: "power1.inOut" }`.
- List reveals: `gsap.set(".card", { autoAlpha: 0, y: 16 })`, then `ScrollTrigger.batch(".card", { start: "top 85%", once: true, onEnter: els => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.08 }) })`.
- Third-party smooth scroll: `scrollerProxy()` plus calling `ScrollTrigger.update` on its scroll event.

```js
// Pinned, scrubbed story section
const tl = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: { trigger: ".story", start: "top top", end: "+=2000", pin: true, scrub: 1 },
});
tl.from(".story h2", { yPercent: 40, autoAlpha: 0 })
  .to(".story .device", { rotationY: -18, scale: 1.1 }, "<")
  .to(".story .caption", { autoAlpha: 1 }, ">-0.2");

// Fake horizontal scroll: ease MUST be "none"
const track = document.querySelector(".track");
const dist = () => track.scrollWidth - window.innerWidth;
const h = gsap.to(track, {
  x: () => -dist(), ease: "none",
  scrollTrigger: { trigger: ".h-wrap", pin: true, scrub: 1, end: () => "+=" + dist(), invalidateOnRefresh: true },
});
gsap.from(".panel-2 img", { scale: 0.9, scrollTrigger: { containerAnimation: h, trigger: ".panel-2", start: "left center" } });
```
`containerAnimation` triggers cannot pin or snap.

## React and frameworks

```jsx
gsap.registerPlugin(useGSAP, ScrollTrigger); // outside the component
const root = useRef(null);
const { contextSafe } = useGSAP(() => {
  gsap.from(".item", { autoAlpha: 0, y: 16, stagger: 0.06 });
}, { scope: root, dependencies: [items.length], revertOnUpdate: true });
const onClick = contextSafe(() => gsap.to(".badge", { scale: 1.1 }));
```

- Always pass `scope`. Wrap handler-created tweens in `contextSafe`; remove listeners in the returned cleanup.
- Without `@gsap/react`: `const ctx = gsap.context(() => {...}, ref); return () => ctx.revert();`. Vue/Svelte: same, in `onMounted` / `onUnmounted`.
- No GSAP during SSR. Revert SplitText on unmount.

## Plugins worth knowing

- **Flip**: `Flip.getState(".item")` → change DOM → `Flip.from(state, { duration: 0.5, ease: "power2.inOut" })`.
- **Draggable + InertiaPlugin**: `{ type: "x,y", bounds, inertia: true, edgeResistance: 0.65 }`. **Observer**: swipe/wheel section changers.
- **SplitText**: `{ type: "lines", mask: "lines", autoSplit: true, onSplit: s => gsap.from(s.lines, { yPercent: 100, stagger: 0.05 }) }`; return the tween; keep `aria: "auto"`; no `text-wrap: balance`.
- DrawSVG, MorphSVG, MotionPath, ScrambleText, ScrollTo for set pieces. GSDevTools never ships.

## Performance and common mistakes

- `will-change` only on animating elements; `stagger` over N tweens; kill off-screen work; pin only what needs it; test scrub on a low-end phone.
- Mistakes: ScrollTrigger on a nested tween; `scrub` + `toggleActions`; eased horizontal scroll; animating the pinned element; no `refresh()` after images load; no cleanup in SPAs; `markers` left on.

## Scroll World: brand to 3D scroll landing

- **What it builds**: a scroll-scrubbed "fly through the world" hero. N AI isometric diorama stills (one shared style preamble) → N camera dive clips → N-1 connectors → a vanilla JS engine mapping scroll to `video.currentTime`. Apple product-page technique, pre-rendered video, no WebGL.
- **Pipeline**: interview (subject, 4-6 brand hex values, art direction, camera style, 5-7 scenes with eyebrow/headline/line/tags, mobile 9:16 opt-in, budget) → stills (gpt_image_2 via Higgsfield or Codex) → clips (Seedance 2.0 via Monid, Higgsfield fallback) → encode → mount → headless seam QA.
- **Rules for any scrubbed-video page**:
  - Seams frame-identical: connector endpoints are the real last/first frames extracted from neighbouring clips, never the stills. One video model per chain.
  - Forward-then-back camera at a seam reads as a rewind; realistic worlds use one continuous forward take.
  - Play clips from Blob object URLs (hosts without byte ranges pin `seekable` to `[0,0]`).
  - Encode native res, `-crf 20 -g 8 -an -movflags +faststart`. Phones: native 9:16, 720 wide, `-g 4`, crf 23.
  - Never set `currentTime` while `seeking`; still as poster until first paint; prime muted video on first touch (iOS); ignore height-only resizes on touch; reduced motion → stills.
  - Pacing: more scroll on hero/finale, `linger ≤ 0.6` so the camera settles while copy peaks.
- **Worth it** for a launch/brand hero with a real story and budget (about $27 of video for 6 scenes at 1080p, plus stills). **Not** for product UI, docs, content-heavy or SEO-critical pages.

## Canvas UI: WebGL over live HTML

- **How it works**: wraps your subtree in `<canvas layoutsubtree>`; Chrome's experimental HTML-in-Canvas (`drawElementImage()`) paints the live DOM into a texture for WebGL2 or WebGPU, and a shader distorts it. Text stays selectable, links clickable. Elsewhere (Safari, Firefox, Chrome without flag/origin trial) it falls back to a GPU overlay; without WebGL2, content renders unchanged. Engines pause when hidden or off-screen and ignore pointer input under reduced motion.
- **Install**: `npx shadcn@latest add @canvas-ui/liquid-react` (swap name, framework, add `-webgpu`). Source lands in `components/canvasui/`.
- **Effects**:
  - Fluid: Liquid (pointer fluid sim), Ripple (water rings per click), Cloth (page ripples like fabric), Droplets (rain running down), Bubble (metaball trailing cursor), Displacement (grid pushed by cursor).
  - Energy: Blaze (sparks, smoke, heat haze), Flame Wrap (fire border), Force Field (shield with click shockwaves), Laser (beam reveals content on scroll).
  - Optics: Glass (crystal lens follows cursor), Frost (ice melts under cursor), Magnify (scanner lens with HUD), Bend (page folds like a cube face), Peel (peels to a second layer), Clouds (mist parted by cursor).
  - Retro: VHS (tape wave, chroma bleed), Glitch (RGB tearing), Retro Dither (pixelating lens), Asciify (ASCII lens), Decrypt Reveal (cipher text at cursor), Glyph Rain (falling glyphs), ASCII Sweep (glyph band swaps content).
  - Particles: Particle Reveal (particles merge into UI), Particle Scroll (sand reassembles on scroll), Shatter (3D refracting shards), Grid (3D tiles ripple), Hex Float (hex tiles lift), Canvas (drag wet paint).
  - 3D objects from GLB/SVG/image, work in every browser: ASCII Object, Glass Object (dispersion), Particle Object, Dithered Object (1-bit), Liquid Object, Ink Object (hand-pressed ink).
- **Reach for it**: one signature moment on a hero, launch, 404 or portfolio.
- **Gimmicky when**: it wraps daily-use UI, distorts text being read, effects stack, or content depends on it. One effect per page, outside the reading path, Safari fallback checked. MIT + Commons Clause (don't resell components).

---

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

---

# States and accessibility

> Condensed from: Open Design (https://github.com/nexu-io/open-design), Taste Skill (https://github.com/Leonxlnx/taste-skill), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), Hallmark (https://github.com/Nutlope/hallmark)

Target WCAG 2.2 AA. Shipping only the populated state is the commonest generated-UI failure.

## Interaction states (every control)

| State | Spec |
| --- | --- |
| Hover | One contrast-raising signal (colour step or 1px lift), 120-220ms, inside `@media (hover:hover)`. No weight or layout change. |
| Focus | `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px }`, ≥3:1 vs adjacent colours, inset on inputs. Never `outline:none` without replacement; never animated. |
| Pressed | Feedback within 100ms: darker fill or `scale(.97)`, no layout shift. |
| Disabled | Native `disabled` + opacity 0.5-0.6 + `cursor:not-allowed` + visible reason ("Add a card to publish"). Read-only looks different. |
| Loading (button) | Keep width, spinner + label, block resubmit; announce via polite live region (not `aria-busy` on the button). |
| Selected | Active fill like the nav pill; distinct from hover and focus. |

## Data states (every list, table, card, form, panel)

| State | Must contain |
| --- | --- |
| Loading | Final layout, flat grey bars at real size (24px value → 24px bar), headers shown, no shimmer, no shift. Refresh keeps old values + freshness stamp. |
| Empty | Keep frame and header; sentence + why + one action, spanning the block (`grid-column: 1 / -1`). |
| Error | Inside the failing block, not full-screen: what failed, last good time, Retry. Input preserved. |
| Populated | Real density, totals computed from rows. |
| Edge | 200-char titles, missing avatar, 10,000 rows, long URLs (`overflow-wrap:anywhere`), +30-40% translated strings, RTL. |

- Real zero printed ("$0"); missing = grey dash at text size. Counts recompute per filter. Empty charts draw the zero line.

Loading thresholds:

| Duration | Indicator |
| --- | --- |
| 0-300ms | None |
| 300ms-2s | Skeleton or small spinner; once shown, keep ≥300ms (no flash) |
| 2-10s | Skeleton matching layout, or labelled spinner ("Loading payments…") |
| 10-60s | Determinate bar + Cancel; "Taking longer than expected" once at 15s |
| 60s+ | Stop animating; error with Retry/Cancel. Every request has a timeout. |

Match error scope: field, form (summary + per-field), section (panel + Retry), page, app (banner). Retry immediately, then 2s, 4s, 8s; after 3 failures show "Contact support" + copyable error ID.

## Forms

- Label above field, 14px/500, 8-10px gap. Placeholder is never the label.
- Inputs 38-44px tall (≥44px touch), 16px font on mobile. 16px between fields, 24px from description to first label.
- Persistent helper text; reserve `min-height: 1lh` for messages. Mark required fields.
- Right `type`, `autocomplete`, `name`. OTP/ZIP/card: `type="text" inputmode="numeric" pattern="[0-9]*"`, never `type="number"`.
- Timing: no errors while pristine or typing; validate on first blur; once invalid, re-validate on every input so it clears instantly; async checks debounce 250-500ms. Style `:user-invalid`, never `:invalid` (red on page load).
- Submit stays enabled until the request starts; then disabled with status. On failure focus the error summary (heading-led, `tabindex="-1"`, no `role="alert"`) or the first invalid field.
- Never clear input on error, block paste, or add "confirm email" fields. Support password managers and passkeys.
- One save model per view: autosave with a quiet "Saved", or one Save per panel. Never both.

```html
<label for="email">Email</label>
<input id="email" type="email" autocomplete="email" required
  aria-invalid="true" aria-describedby="email-hint email-error">
<span id="email-hint">Used for receipts only.</span>
<span id="email-error" role="alert">Email needs an @ and a domain.</span>
```

## Touch targets

| Bar | Size |
| --- | --- |
| WCAG 2.5.8 AA (web) | 24×24 CSS px (or 24px spacing circle) |
| WCAG 2.5.5 AAA | 44×44 CSS px |
| iOS | 44×44pt |
| Android | 48×48dp |

- Ship 44px for touch, 48px under `@media (pointer:coarse)`, ≥8px between targets. Extend hit areas with padding or `::before`, not bigger glyphs.
- Marketing buttons 44-52px; app controls 32-40px visual, 44px hit area.

## Keyboard and focus

- Native first: `<button>` for actions, `<a href>` for navigation. A bare `<a>` without `href` is not focusable.
- No `tabindex` >0; fix DOM order to match visual order.
- Modals trap focus until Esc or close, then return focus to the trigger. Route change: focus `<main>`.
- Skip link to main. Sticky headers must not hide focus: `scroll-padding-top` ≥ header height.
- Tooltips: 800-1000ms hover delay, 0 on focus. Drag/swipe always has a button alternative.

## Semantics

- `<html lang>`; one `h1`; no skipped heading levels (visual size and level are independent).
- Landmarks: `header nav main aside footer`.
- `alt` on content images, `alt=""` when decorative or named beside it; `aria-label` on icon-only buttons; charts get a text summary or table.
- ARIA order: native element → native restyled → APG pattern verbatim. Never invent ARIA (WebAIM 2026: ARIA pages average 59.1 errors vs 42 without).
- Live regions exist in the DOM before content is injected. Toasts: `role="status"`, same position every time, 3-5s, pause on hover/focus. Destructive confirms: `role="alertdialog"`.
- Colour is never the only signal: add icon, text or sign.

## Reduced motion

- Under `prefers-reduced-motion: reduce` strip translate, scale, rotate, parallax; keep ≤150ms opacity/colour fades. View Transitions need a manual override.
- Content visible without animation. No flashing >3 times per second. Loops >5s need a pause control.
- Durations: 100ms feedback, 150ms state default, 200-300ms entering UI, exits 60-75% of enter, >500ms only cross-screen. Ease-out enter, ease-in exit; M3 standard `cubic-bezier(0.2,0,0,1)`.

## Laws of UX, as numbers

| Law | Do |
| --- | --- |
| Fitts | Primary targets big and near; thumb arc on mobile; plus the platform floors above. |
| Hick / choice overload | 3-5 visible options per decision; pricing 3-4 tiers, exactly 1 recommended; settings ≤5 groups. |
| Jakob | Keep category conventions (logo top-left links home, cart top-right, settings gear). |
| Miller / Cowan | Working memory ~4 chunks: group fields under headings; persist filters, breadcrumbs. |
| Doherty | Feedback under ~300ms (the popular "400ms" isn't in the 1982 paper); tap feedback ≤100ms. |
| Proximity | 8-12px within groups, 32-48px between. |
| Common region | Enclose only when proximity fails; padding ≥16px. |
| Von Restorff | One item differs (recommended tier, active nav), with a non-colour cue too. |
| Serial position | Key nav items first and last. |
| Peak-end | Celebrate the end of a flow once; keep the middle calm. |
| Goal gradient | "Step 2 of 4" with real progress; never fake pre-progress. |
| Postel | Accept "555-0100", "5550100", "(555) 0100"; normalise; output one format. |

## RTL

- `<html dir="rtl" lang="ar">` (both). Mixed blocks: `<section dir="ltr" lang="en">`. User text: `dir="auto"`.
- Logical properties only: `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align:start`. Tailwind v4: `ms-* me-* ps-* pe-*`; v4.2 `inset-s-* inset-e-*`.
- Mirror: back/forward arrows, nav position, sliders, non-media progress bars, checkbox-label order.
- Don't mirror: clocks, refresh icons, media controls and scrubbers, charts, logos, photos.
- Phone, IBAN, card, email, URL: `<bdi dir="ltr">` / `<input dir="ltr">`.
- Arabic: no `letter-spacing`, no italics, body 14-18px at line-height 1.5-1.75. Prototype with real Arabic/Hebrew.

---

# Responsive and mobile

> Condensed from: Taste Skill (https://github.com/Leonxlnx/taste-skill), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), Hallmark (https://github.com/Nutlope/hallmark), Open Design (https://github.com/nexu-io/open-design)

## Approach

- Mobile-first CSS: base styles for 320-390px, `min-width` queries upward.
- The 390px screen is its own composition: re-author line breaks, re-crop to portrait, one dominant thing on screen 1.
- Faultless from 320 to 1920px; never horizontal page scroll.
- Test at 320, 375, 390, 414, 768, 1024, 1280, 1440, 1920, plus landscape and the largest system text size.

## Breakpoints

Two shared breakpoints in `rem` (they follow the user's font size); add a third only where content breaks.

| Range | Gutter | Section gap | Changes |
| --- | --- | --- | --- |
| <40rem (640px) | 16-20px | 56-112px | Display steps down, captions go inline, one column |
| 40-60rem (960px) | 24px | 80-120px | Grids → 1-2 columns, sticky panes unstick, sidebars fold |
| ≥60rem | 16-32px marketing, 24-40px app | 120-240px | Full grid; cap layout ~1760-1920px |

- Apps: treat 641-1100px (tablet) as its own band: sidebar folds to a top bar, tables keep 4-5 columns with secondary fields as sublines, two panels stack once either drops under ~340px.
- Capability, not width: `@media (hover:hover)` for hover styles, `@media (pointer:coarse)` for 48px targets.
- Never `px` breakpoints, user-agent sniffing, or hover-only interactions.

## Fluid type with clamp()

`font-size: clamp(MIN, INTERCEPT + SLOPE·vw, MAX)` where `SLOPE = (max−min) / (maxViewport−minViewport) × 100` and `INTERCEPT = min − SLOPE/100 × minViewport`.

```css
/* 32px @390 → 64px @1440 */
--step-head: clamp(2rem, 1.257rem + 3.048vw, 4rem);
/* body 16px @390 → 18px @1440 */
--step-body: clamp(1rem, .954rem + .19vw, 1.125rem);
/* poster display, full at 1440, held at 1920 */
--step-display: clamp(3rem, 1rem + 9vw, 9rem);
```

- Always keep a `rem` term so browser zoom still scales text (WCAG 1.4.4). Never `font-size: 5vw` alone.
- `clamp()` for sizes that change continuously; media queries for layouts that change discretely.
- Phone hero 32-48px (study median 40px); hero headline ≤2 lines at 390px means ≤~32 characters at 44px.
- Body ≥16px on mobile (smaller inputs trigger iOS zoom); labels ≥14px, sublines ≥12px; line length 35-60 characters.

## Units, viewport, safe areas

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

- Never `maximum-scale=1` or `user-scalable=no`.
- Heights meeting browser chrome: `min-height: 100dvh` (or `svh`), never `100vh` on a hero. Widths: `width:100%`, never `100vw` (scrollbar overflow).
- `overflow-x: clip`, not `hidden` (keeps `position: sticky` working).
- Fold insets into tokens: `--gutter: max(16px, env(safe-area-inset-left))`.
- Bottom bars: `padding-bottom: calc(12px + env(safe-area-inset-bottom))`; sticky headers: `top: env(safe-area-inset-top)`.
- Content under fixed bars gets matching `padding` / `scroll-padding` so nothing hides beneath them.
- Native: SafeAreaView (RN), `WindowInsets` (Compose), safe-area insets (SwiftUI).

## Touch and thumb zone

- Targets 44pt iOS / 48dp Android / 44px web touch, ≥8px apart. Inputs ≥44px tall.
- Primary and frequent actions in the bottom third (tab bar, bottom CTA bar, sheet actions). Top corners are the hardest reach: put rare actions there.
- Destructive actions away from the thumb arc, separated from primary ones. A floating button only if it's the one primary action and covers nothing.
- Press feedback within 100ms; `touch-action: manipulation` on controls.
- Horizontal swipe only for carousels; never fight system back. Gesture actions also get a visible button.
- Mobile motion 20-30% shorter than desktop. Never hijack touch scrolling.

## Navigation patterns

| Context | Pattern |
| --- | --- |
| Marketing phone | One row: wordmark + one action + a "Menu" text button opening a full-screen sheet. ≤3 links: move them to the footer. |
| App phone, 3-5 destinations | Bottom tab bar, icon + label always, ~56px + safe-area inset, active state by colour/weight. |
| App phone, many destinations | 48px top bar with the screen name, menu button → full-screen sheet (nav, workspace switcher, account), ≤1 action. |
| ≥1024px app | Labelled sidebar 224-240px; an icon rail becomes the bottom bar on phones. |

- A sidebar taking >30% of a phone's width fails. Never mix tab bar + sidebar + bottom nav at one level.
- Back restores scroll, filters and input. Every key screen has a deep link/URL.
- Tabs and segmented controls scroll sideways in their own row, never the page. A segmented control is as wide as its options; full width only under ~480px.
- Sheets: visible close + swipe-down; confirm before discarding unsaved input.

## App screen patterns on a phone

- Title stays (20-24px). Header actions collapse into a kebab, except the one primary.
- Filters collapse to one row of chips or a "Filters" sheet. The first list row starts in the top 60% of the screen.
- KPIs: a 2-column grid (even count after any full-width lead) or a label-left/value-right list. Never 4 squeezed columns.
- Max one row of controls above a chart. Charts full width, 160-200px tall, 3-4 x labels, legend dots above; y ticks in their own lane, never on the line.
- Tables become two-line rows below ~640px: identity + key number on line 1, other fields in 13px muted on line 2 ("fra1 · 1m 38s"), action at right. Fields move, never vanish. A table that must stay a table scrolls inside its own frame with the first column pinned.
- List + detail: one pane at a time; choosing a row pushes detail; back returns to the same scroll position.
- Right rail moves under the main column or into a tab. Settings: label column stacks above its panel.
- Blocks carrying an action move up, as a one-line summary ("5 items low · Review"), not below 20 orders.
- Row actions: text actions or one compact trailing button, plus one filled bulk action ("Approve 3"). Never a stack of 44px grey buttons.
- Virtualize lists over 50 items; persist state between tabs.

## Marketing page patterns on a phone

- Margins 16-20px; body 16-18px; one dominant element on screen 1 (a 20vw desktop wordmark may become 26vw over two lines).
- Splits put the picture first, full width. Full-bleed images re-crop to portrait via `<picture>` or per-breakpoint `object-position`.
- Phones carry more picture, not less: ~27% of the first phone screen vs ~17% on desktop.
- Horizontal gallery: one card at 75-80% width with the next one peeking.
- Fixed elements never cover content at any scroll position.

## Clickable text never wraps

Buttons, primary nav links and CTAs stay one line from 320 to 1920px. In order:

1. Shorten the label ("Read the documentation" → "Read the docs").
2. `white-space: nowrap` on the control; let the row reflow.
3. Collapse the row: links that no longer fit go behind the menu.

Chips and tags: `flex: none; white-space: nowrap`; the collection wraps, or overflows into an operable `+3` disclosure.

## Images and strings

- `srcset` with `w` descriptors and real `sizes`; `width`/`height` on every `<img>`; `loading="lazy"` below the fold, never on the LCP image.
- Strings 30-40% longer after translation; logical properties for RTL; locale-aware numbers and dates.
- Support Dynamic Type / font scaling without truncation; prefer wrapping, and give truncated labels a full-value path (tooltip or expand).

---

# Native Feel

> Condensed from: emilkowalski/skills (https://github.com/emilkowalski/skills): apple-design, mobile-native, animate-expo, write-swift, break-ui, pick-ui-library, ask-sonner

## Apple-grade interaction

- **Respond on press**: highlight on `pointerdown`/`:active`, commit on release. Feedback is continuous during a drag, never only at the end.
- **1:1 tracking**: `setPointerCapture`, keep the grab offset (no snapping to center). ~10px of movement before committing to a direction.
- **Interruptible always**: never lock input mid-transition; restart from the live on-screen value; separate X and Y springs.
- **Springs** (damping ratio / response): default `1.0 / 0.3-0.4` (no overshoot); after a flick `0.8 / 0.4`; sheet `0.8 / 0.3`. Reanimated: `{ duration: 400, dampingRatio: 1 }`, sheet `{ duration: 300, dampingRatio: 0.8, velocity }`, `overshootClamping: true` at hard edges.
- **Velocity handoff**: pass release velocity into the spring. **Project momentum**, then snap to the nearest point:

```js
const project = (v, d = 0.998) => (v / 1000) * d / (1 - d); // v in px/s
const rubberband = (over, dim, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));
```
- Decide commit vs cancel from velocity sign, not position. Rubber-band at edges; never a hard wall.
- **Hit areas**: 44×44pt iOS, 48dp Android. Grow with `hitSlop`/padding, not the visual.
- **Haptics** (expo-haptics): `selectionAsync()` for detents/pickers; `impactAsync(Light)` for snaps/commits; `Medium` for heavy or destructive; `notificationAsync(Success|Error)` for outcomes. Same frame as the visual, one per action, never the only feedback.
- **Materials**: translucent chrome with content scrolling under it.

```css
.bar { background: rgb(255 255 255 / .6); backdrop-filter: blur(20px) saturate(180%);
       border-top: 1px solid rgb(255 255 255 / .4); }
@media (prefers-reduced-transparency: reduce) { .bar { background: #fff; backdrop-filter: none; } }
```
  Never glass on glass. Bigger surface = more blur + deeper shadow. Modal task: scrim + push background back; parallel panel: no scrim. Fade a blur mask at scroll edges instead of 1px dividers. Text on glass: heavier weight, higher contrast. Materialize (blur + scale), don't just fade.
- **Type**: system font first (`system-ui`); tracking by size (display `-0.02em`, body `0`); line-height ~1.05 display, ~1.5 body; spacing in `rem` so Dynamic Type scales layout. HIG default sizes (pt): Large Title 34, Title 28/22/20, Headline 17 semibold, Body 17, Callout 16, Subhead 15, Footnote 13, Caption 12/11.
- **Sheets**: native first (`presentation: 'formSheet'` in Expo Router). Web: Vaul, or `translateY(100%)` + `cubic-bezier(0.32, 0.72, 0, 1)` 500ms. Stacked sheets dim and push back each parent.
- **Expo/RN**: Reanimated, not core `Animated`; `Gesture.Pan()`, not `PanResponder`; no `setState` in gesture/scroll handlers; `scheduleOnRN` only in `onEnd`; tabs never slide; navigation uses native stack transitions; judge on a release build on the slowest device; set `CADisableMinimumFrameDurationOnPhone` for 120fps.
- **SwiftUI**: start `withAnimation` in the synchronous gesture callback (same frame); open a `Task` only for the slow work after.
- **A11y**: honor `prefers-reduced-motion` (crossfade instead of slide/spring), `prefers-reduced-transparency`, `prefers-contrast: more`.

## Web app that feels installed

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a">
```
```css
html { -webkit-tap-highlight-color: transparent; -webkit-text-size-adjust: 100%; overscroll-behavior: none; }
input, textarea, select { font-size: 16px; }            /* stops iOS zoom */
button, a, [role="button"] { touch-action: manipulation; user-select: none; -webkit-user-select: none; }
.app { height: 100dvh; }  .hero { min-height: 100svh; }
.sheet-body { overflow-y: auto; overscroll-behavior: contain; padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px)); }
.carousel { touch-action: pan-y; }                      /* or scroll-snap-type: x mandatory */
@media (hover: hover) and (pointer: fine) { /* every :hover rule */ }
```
- Never `user-scalable=no`; never `user-select: none` on body. Set `inputmode`, `enterkeyhint`, `autocapitalize="none"` on code/username fields. `theme-color` matches the header, not the brand. Test on real hardware (emulation hides sticky hover, tap delay, keyboard, safe areas).

## Break the UI before shipping

Feed realistic worst cases through the same data boundary (fixture/props), behind a dev-only "Demo / Worst case / Empty / One / 1,000 rows" toggle. Check at the real container width, 320px, widest, 200% zoom, dark, RTL, touch.

| Case | Examples |
| --- | --- |
| Names | `Aleksandra Wiśniewska-Kowalczyk`, `Jo`, `王秀英`, `نور الهدى`, `👩🏽‍💻 Priya`, missing name |
| Unbreakable | `bartholomew.fitzgerald@northwind-industries-holdings.example.com`, long URLs, UUIDs, `Benachrichtigungseinstellungen` |
| Counts | 0, 1 ("1 members"), 1,284, 1,000,000, negative, `NaN`/`null`, 142% |
| Collections | empty, one item, page size + 1, 1,000+ rows, one item 10× taller |
| Time | now, future, 3 years ago, timezone day-flip |
| Media / states | 404 avatar, panorama image, slow load, loading, API error, partial data, no permission, "You" |

Fixes: `flex-shrink: 0` on avatars/icons/badges/trailing actions; `min-width: 0` on text columns (`minmax(0, 1fr)`); `overflow-wrap: anywhere` on emails/URLs; `align-items: flex-start` once text wraps; `tabular-nums`; `Intl.NumberFormat`, `Intl.PluralRules`, `Intl.RelativeTimeFormat`; initials via `Intl.Segmenter`; `object-fit: cover` + `aspect-ratio`; skeletons sized like real content; virtualize big lists. Wrap identifying text, end-truncate secondary text (with a tooltip), middle-truncate file names, `line-clamp` previews, never truncate numbers.

## Pick the library, don't hand-roll

| Need | Use |
| --- | --- |
| Dialog, popover, menu, select | Base UI (keep Radix/shadcn if already installed) |
| ⌘K palette | cmdk |
| Toasts | Sonner: one `<Toaster theme="system" />` at root, `toast.promise`, `toast.custom` for design-system toasts |
| Drawer / bottom sheet | Vaul |
| OTP input | input-otp |
| Springs, layout, exit | motion |
| Animated numbers | NumberFlow |
| Charts | recharts; Liveline for streaming |
| Drag and drop | dnd kit |
| Long lists | Virtuoso |
| State / classes / theme | zustand / clsx, cva / next-themes |

Check `package.json` first and don't churn an existing competitor.

---

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

---

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

---

# Copy

> Condensed from: Taste Skill (https://github.com/Leonxlnx/taste-skill), Open Design (https://github.com/nexu-io/open-design), UI UX Pro Max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), Hallmark (https://github.com/Nutlope/hallmark)

## Write the argument before markup

One line each: who reads, what this is (as the maker would tell a friend), the one belief, the proof, the next action. Then list sections as claims with proof:

```
1. A three-legged oak stool, made to order.        → the stool, large
2. Each seat is cut from one board.                → three close-ups
3. Six weeks, and you can follow it.               → photographed stages
4. 240, delivered by the maker.                    → price, button
```

A section with no claim is filler: delete it. The argument's order replaces the stock hero, logos, features, testimonial, pricing, CTA.

## Headlines

- Two lines max at every width. Hero ≤32 characters (4-6 words) survives a 390px phone at 44px; ≤42 if the phone size drops to ~34px. Section heads 2-5 words.
- Budget: chars per line ≈ line width ÷ (font px × k); k = 0.40 condensed, 0.50 most faces, 0.58 wide or caps.
- Don't shrink to fit: 5 words at 64px beat 9 at 28px.
- Shapes that work (pick the plainest true one):
  - The name, huge, plus a one-line description (studios, hotels).
  - What it is: "Furniture for small rooms."
  - A claim a competitor couldn't sign: "Invoices that chase themselves."
  - An instruction, verb first: "Understand your money."
  - A place or moment: "Lisbon, since 1984."
- Tests for every line: can the reader picture it, could it be proven false, could only this business say it? "Software that works for you" fails; "Sourdough at four, gone by ten" passes.
- Sentence case. No full stop unless the voice uses them everywhere.
- Section heads say what the visitor gets ("Three loaves a morning", "Prices"), never a category label ("Features", "Why us", "Our story", "Field notes").

## Banned shapes

- Mad-lib: "The AI-powered platform for modern teams".
- Tricolon: "Fast. Simple. Secure." / "Plan. Build. Ship." Adjective triads anywhere.
- Correction: "It's not just a tool, it's a workflow", "More than a …".
- "X, reimagined / redefined / made simple", "Welcome to …", "Meet …", "Say goodbye to …", "Whether you're X or Y".
- A question the reader didn't ask. A colon title: "Ledgerly: invoicing for freelancers".
- One word styled differently (italic, serif, colour, underline, pill).

## Banned vocabulary

unlock, unleash, supercharge, elevate, empower, streamline, seamless, effortless, robust, cutting-edge, next-generation, world-class, all-in-one, blazing fast, game-changer, journey, reimagine, "Click here", "Enter your email below", "Oops".

## Banned furniture

- Eyebrows: tiny tracked caps label or pill above a heading ("NEW ·", "FEATURES"). 57% of weak sites vs 16% of strong use tiny tracked caps.
- "Est. 2024", coordinates, time strips, version strings, "Scroll to explore", fake photo credits, "Available for work" dots, words strung with middle dots.
- "Step 1", "Phase 02", "01 / 03" counters. Order by position or a real `<ol>`.
- Three of everything. Use the count the content has.
- Em dash as a habit. Use a full stop, comma, colon or parentheses.

## Supporting line and body

- Subhead: one sentence, 12-22 words: what it is, for whom, the one difference. Never restates the headline.
- Specific noun + real number: "ships in a week" not "fast delivery"; "38 seats" not "intimate"; "$240" not "affordable".
- Verbs over adjectives. One idea per sentence. Paragraphs of 2 short sentences on marketing pages.
- Page budget: ~450-575 visible words. Lists: 4 items (3-word label + ~10-word line); past 5, use a table.
- A large statement or quote is a `<p>`/`<blockquote>`, ≤25 words, ≤36px desktop / 24px phone. Bigger means it's a headline and gets 2 lines.

## Buttons and links

- Verb + object, 1-3 words: "Book a table", "See the plans", "Download for Mac", "Start free" (not "Get started free").
- The primary action keeps one name everywhere on the page. One primary per screen; second action is a text link.
- "Continue" only as the second step of a flow. Never "Submit", "Click here", or five "Learn more" links.
- Max one arrow glyph, on the primary only. Labels never wrap: shorten before shrinking.
- Destructive: name object and count, "Delete 3 invoices"; the confirmation names the consequence ("Members lose access immediately").
- Nav labels: single nouns, ≤5 links.

## Proof and sample data

- Never invent customers, named quotes, logos, user counts, ratings, benchmarks or "10,000+ teams".
- No proof supplied: show the thing large, explain how it works, use brief facts (price, place, year).
- Sample details are expected at real density (each room with a name, view and rate; each dish with a price) and listed in the handoff for confirmation.
- Sample data reads as sample: `example.com`, "Example Kitchen", round amounts, totals that sum from rows. Never Lorem ipsum, Acme, John Doe, "User 1".

## App titles

- A noun, not a greeting: "Analytics", "Invoices", the object's name. "Welcome back, Alex" plus a waving-hand emoji is a tell; no emoji in UI.
- Optional subline about the data, not the interface: "Revenue rose 12% vs prior 30 days", never "This page shows your metrics".

## Empty states (never "No data")

| Type | Pattern | Example |
| --- | --- | --- |
| First use | What's empty + why it matters + one action | "No invoices yet. Send one and we'll track when it's paid." [New invoice] |
| No results | Echo query + alternatives | "No results for "invioce". Try "invoice" or clear 2 filters." |
| Filtered / range | Keep frame, one sentence | "No channel usage in this range." |
| Cleared | Short, calm | "All caught up." |

## Errors

- What happened, why (if known), what to do: "Your card was declined: insufficient funds. Try another card."
- Never "Something went wrong", "Oops", exclamation marks, or blame ("You entered an invalid…").
- Field errors name the sub-rule: "Phone number is too short", not "Invalid phone". Ship 4-7 distinct messages for email, phone, card, postal code.
- Suggest the fix when knowable: "Use MM/DD/YYYY. Did you mean 05/03/2026?"
- Block errors carry freshness: "Couldn't load deployments. Last updated 09:14." [Retry]. After 3 failed retries: "Contact support" + copyable error ID.

## Feedback text

- Loading: label after 2s ("Loading payments…"); at 15s once: "Taking longer than expected."
- Success: past tense + object + undo: "Invoice deleted. Undo". Autosave: quiet "Saved".

## Numbers in copy

- Separators and fixed decimals: "$16,531.54" (money 2, % 1-2, counts 0).
- Sign on every change ("+10,100 (+0.20%)"); window in words ("vs prior 30 days"); from zero write "+4 (new)", never "+100%".
- Real zero printed ("$0"); missing value = grey dash. Capacity: "12.7k of 20.0k".
- Recency in words ("Today"); compared dates in ISO ("2024-02-15").

## Micro-typography

Curly quotes and apostrophes, a real ellipsis (…), non-breaking space before a headline's orphan word, caps for ≤3 words only, no text under 13px on pages.

## Voice

Write as the owner would say it across a counter: the brief's own nouns, a real place, the verb a customer uses. One pun per page max.

---

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

---

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

---

# Pre-ship visual review

> Condensed from: Hallmark (https://github.com/Nutlope/hallmark)

Run in a browser after the build, ideally in a fresh context. Judge screenshots, not intent. Highest impact first.

## 0. Capture

- Shots: 1440 x 900 fold, 1440 full page, 390 x 844 fold, 390 full page, plus 1280 x 800 and 1920 x 1080 folds. Light and dark if both modes ship.
- Real fonts loaded (no fallback face); `prefers-reduced-motion: reduce` on so reveals show end states. Blank or wrong frame: recapture first.
- Output: `ship`, `fix`, `rebuild` (first screen fails) or `recapture`, then up to 8 findings, worst first: what, where, fix.

## 1. Floor (any failure blocks ship)

- Contrast in both modes: body 4.5:1 (aim 7:1); large text (24px+, or 19px bold), icons, focus rings, input edges 3:1. Text on an accent uses its paired ink; never grey on a coloured fill.
- No horizontal scroll from 320 to 1920 (`overflow-x: clip` on html and body, no `100vw`).
- At 1280 x 800: h1, its sentence and the primary action visible without scrolling.
- Every interactive element shows `:focus-visible` instantly (2px outline, 2px offset).
- Reduced-motion fallback on every animation; content visible with JavaScript off.
- No invented metric, testimonial, logo wall or count. No "Thanks" without a real request.
- Every `<img>` loads and has width, height, alt. Button labels and primary nav never wrap.

## 2. Squint test and first screen

- Squint (or blur the shot 6px): one dominant mass per screen, head-body-action order readable, sections alternate heavy and light.
- Headline 7 words or fewer, passes the swap test (useless on a competitor's page).
- Hero is one screen: next section starts at y 760 to 900 (1440 x 900); space below content 1.0 to 1.5x space above; dead band 160px or less.
- Hero visual is real (product capture, user photo, or type at full scale), 6 to 7 columns, 60%+ of screen height, centre within 60px of the text block.
- The signature (strongest real thing) is on screen one. Delete-the-picture test: if nothing is lost, the picture is too weak.
- No template tells: eyebrow or tracked-caps label over a head; one coloured or italic word in a head; purple-to-blue gradient; glow, orb or mesh blob; four things on one centre axis; three equal icon cards; two filled buttons side by side; New/Beta pill; emoji icons; drawn browser chrome; `A · B · C` meta strings; arrow glued to link text; email band as the close of a non-subscription page.

## 3. Hierarchy and type

- h1 about 1.5x h2, h2 about 2x h3. Median h2 40px+ at 1440 (48 to 56 ideal); h1 36px+ at 390.
- Two families plus one single-role outlier at most; three weights or fewer.
- Body 16px+, line-height 1.5 to 1.65, measure 45 to 75ch; no line over about 88 characters.
- Display tracking -0.02 to -0.04em (0 to -0.015em condensed or heavy), line-height 1.0 to 1.15; wrapping caps never under 1.0.
- Labels, captions, table heads, nav: body face, one step smaller, sentence case, untracked. Mono only for code and measured values.
- No one-word last line in paragraphs or stub line in heads at 390 and 1280. Comparing figures use `tabular-nums`; heading levels never skip.

## 4. Spacing and alignment

- Every gap from the scale (2/4/8/12/16/24/40/64/96/144); three off-scale nudges at most.
- Section gaps 120px+ at 1440 and varied (120/144/176), 56 to 96 at 390. One identical gap everywhere fails.
- Space above a heading at least 2x the space below it.
- One container, left edges aligned nav to footer; at 1920 it caps at 1360 to 1520px, only gutters grow.
- Each section body spans 10 of 12 columns or is a statement; no narrow column beside an empty half. Split halves centre within 60px.
- Boxed text 16px+ from box edges; 16px minimum page gutter at 390. No orphan alone on a grid's last row.
- One radius per nesting level (inner = outer minus padding); one primary button style; one column gap; more left-aligned heading groups than centred.

## 5. Colour and surface

- Accent 5% or less of any viewport unless a committed or drenched posture is intended.
- No pure #000 or #FFF text or ground; neutrals tinted toward the brand hue.
- One shadow recipe; never hairline border plus wide soft shadow; no coloured glow on dark. No card in a card; vary dividers by seam (space, hairline, tinted well, card).
- Dark mode derived, not inverted: same hues, raised surfaces lighter, no shadows, softer accent.

## 6. States and interaction (click through)

- Every control: default, hover (inside `@media (hover: hover)`), focus, active (1px press), disabled (opacity 0.55 plus `not-allowed` plus the attribute), loading (width stable), error, success.
- Controls 44 to 52px on marketing pages, 32 to 40px in apps with a 44px hit area; inputs match the adjacent button; border width constant across states.
- Forms: labels above fields, validate on blur, errors say what broke and what to do, failed submit focuses the first invalid field.
- Data regions draw loading (skeleton), empty (what, why, one action) and error states.
- Tooltips 800 to 1000ms hover, 0 focus. Modals trap focus, close on Escape. Toasts only for failures.

## 7. Motion

- Only `transform` and `opacity`; never `transition: all` or animated width, height, top, left.
- 120 / 220 / 420ms (micro, short, long); exits 60 to 75% of the enter; ease-out `cubic-bezier(0.16, 1, 0.3, 1)`; no bounce on UI state.
- One page reveal at most (400 to 800ms total, 30 to 100ms stagger, once); one scroll-linked pattern at most; no parallax or cursor followers.
- Loops pause off-screen, on hover or focus, and under reduced motion; past 5s they get a visible pause control.

## 8. Copy

- None of: seamless, robust, empower, supercharge, elevate, effortless, unlock, unleash, next-generation, world-class, game-changer, journey; "It's not X, it's Y"; adjective triads; em or en dashes; Jane Doe or Acme.
- Buttons name the action ("Book a fitting"), never "Learn more" or "Get started" as a second action.
- Section heads say what the visitor gets, never "Features" or "Why us". Read only the heads: they tell this product's story.
- Each fact appears once. Curly quotes, real ellipsis.

## 9. Performance

- LCP image `fetchpriority="high"`, never lazy; other images lazy with `srcset`; layout shift near 0.
- Hero visual 2 MB or less; autoplay video `muted playsinline` with a poster.
- Only used font weights, `display=swap`, preconnect to the font host.

## 10. Accessibility and phone (390)

- `lang`, `<title>`, meta description set; decorative SVG `aria-hidden`; state never shown by colour alone.
- Hit targets 44 x 44 (48 on coarse pointers); inputs 16px text to stop iOS zoom.
- At 200% zoom nothing clips or overlaps; keyboard reaches every action in visual order.
- Compositions stack in reading order (head, then body; a split's visual after its text); sticky panes unstick under 60rem.
- Nothing (40+ words) shown at 1440 is hidden at 390; tables keep the row-name and action columns visible; nav collapses to a menu when links stop fitting.

End with one line naming what must not be diluted while fixing.
