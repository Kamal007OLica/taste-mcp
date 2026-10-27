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
