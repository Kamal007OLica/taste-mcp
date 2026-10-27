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
