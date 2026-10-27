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
