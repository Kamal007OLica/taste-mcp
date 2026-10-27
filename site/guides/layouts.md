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
