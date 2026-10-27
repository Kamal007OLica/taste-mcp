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
