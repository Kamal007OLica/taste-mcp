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
