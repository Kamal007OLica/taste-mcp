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
