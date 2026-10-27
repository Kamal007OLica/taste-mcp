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
