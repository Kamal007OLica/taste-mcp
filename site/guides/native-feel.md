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
