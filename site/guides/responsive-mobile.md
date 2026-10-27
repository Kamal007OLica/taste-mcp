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
