# Handoff: Rob Taylor — personal website

## Overview
A five-section personal site for a psychologist writing about statistics, probability and
mathematical modelling: home, writing (index + post), software (incl. a working LaTeX-to-image
editor), publications, and about. Plus a newsletter signup with real states, a 404, and two
send-ready HTML emails.

## About the design files
The files in this bundle are **design references authored in HTML** — prototypes that show the
intended look and behaviour. They are not production code to lift. The task is to **recreate these
designs in the target codebase's own environment** using its established patterns. If no codebase
exists yet, a static-site generator is the right shape for this project (Astro, Eleventy, or Hugo):
the content is posts, publications and a couple of interactive islands, not an application.

`Rob Taylor - Site Mockups v3.dc.html` is a single-file prototype with a hand-rolled screen
router. **Do not reproduce that structure.** In the real site each screen is a route/page, and the
post content — which lives in a `blocks` array in the prototype — becomes Markdown/MDX.

The two email files ARE production-shaped: table-based HTML meant to be pasted into a sending
platform. Use them close to as-is.

## Fidelity
**High fidelity.** Colours, type, spacing and interaction states are final. Recreate pixel-faithfully.
The design follows the **Classical** design system (editorial serif, hairline rules, colour as
stroke never fill, outlined buttons, matted photographs). Where the codebase already has a token
layer, map to it; otherwise take the tokens below verbatim.

---

## Design tokens

### Colour
| Role | Value | Use |
| --- | --- | --- |
| Page ground | `#f8f4f4` | body background |
| Surface (email/plate mat) | `#f3f2f2` | email card, plate mat |
| Text | `#201f1d` | body and headings |
| Text secondary | `#444141` | long-form paragraphs |
| Text muted | `#605d5d` | subtitles, blurbs |
| Text quiet | `#6a6666` | kickers, dates, meta |
| Accent | `#b68235` | rules, active marks, borders |
| Accent light | `#e1ad66` | hairline accent rules, year rules |
| Accent text | `#7d5411` | links, outlined buttons (passes on this ground) |
| Accent pressed | `#5e3f0c` | button `:active` |
| Accent tint | `rgba(225,173,102,0.22)` | button hover fill |
| Row hover tint | `rgba(225,173,102,0.12)` | post-row hover |
| Divider | `rgba(32,31,29,0.14)` | every hairline rule and card border |
| Divider strong | `rgba(32,31,29,0.2)` | secondary button border |
| Error | `#9a3b28` | form error text + field border |

There is exactly one accent. Never fill a surface with it.

### Type
- Headings/UI: **Cormorant Garamond** (400 for display, 600 for interface headings). Never bold.
- Body: **Lora**.
- Emails: Georgia / 'Times New Roman' / serif — Cormorant is not a safe email font.
- Numerals set tabular (`font-feature-settings:'tnum'`) in kickers, dates, table columns and
  display figures. **Not** in running prose.
- Scale in use: display `clamp(30px,6.4vw,52px)` · h1 post `clamp(32px,6.4vw,54px)` ·
  h2 section `clamp(24px,3.4vw,30px)` · h2 in-post `27px` · body `18px/1.6` ·
  post body `18.5px/1.65` · list subtitle `17.5px/1.55` · meta `14.5px` · kicker `11.5px`
  with `letter-spacing:0.2em` uppercase.
- Body copy in posts is `text-align:justify`. Headings are flush left. Use `text-wrap:pretty`
  on standalone paragraphs.

### Spacing, radius, motion
- Page gutter `clamp(18px,4vw,32px)`; content max-width `1040px`; prose measure `700px` / `56–62ch`.
- Section padding-top `clamp(34px,5vw,64px)`; rail gap `clamp(26px,4vw,56px)`.
- Radius `4px` everywhere; `2px` on images.
- Transitions `.18s ease` (colour/width), screen fade `.35s ease`.
- No shadows anywhere. Elevation is a border.
- Minimum touch target `44px` on every nav item, button and field.

---

## Screens

### 1. Home — **build the Editorial layout**
The prototype carries two home directions behind a `homeLayout` prop. **Editorial is confirmed —
build that one.** Set `homeLayout: "editorial"`; the index variant is reference only and does not
need to ship.
- **Editorial (build this)** — a lead intro (max 620px) with two outlined buttons, then a
  "Latest posts" list with a 40px tabular index number per row, then the right-hand rail.
- ~~Index~~ — a denser numbered list of all posts, no lead imagery. Not chosen.

Right-hand rail (both layouts, `flex:1 1 260px`, hairline left border, `padding-left:20px`,
`position:sticky; top:96px`):
- **"Recently"** — the news strip. Kicker, then up to 3 items, each: tabular uppercase
  month-year, one line of text, and an optional outbound link with an 11px NE-arrow icon.
  Items older than **183 days** are filtered out; if all are stale the entire block is hidden.
- A short "Elsewhere" link set and a Bayes-rule glyph.

Newsletter block (below, max-width 1040px, outlined card) — see *Newsletter states*.

### 2. Writing index
Header (h1 "Writing" + intro), then a filter row: a search input and category chips
(`All` + the 7 most-used categories, derived from post counts). A view toggle switches between
**list** and **cards**. `{n} of {total}` count label, tabular.
- List row: optional 104×78 plate thumbnail, title `clamp(22px,3vw,27px)`, subtitle, category
  line, right-aligned date. On hover: `rgba(225,173,102,0.12)` row tint plus an 18px accent rule
  and uppercase "Read" appearing in the right column.
- Card: `repeat(auto-fit,minmax(min(100%,250px),1fr))`, gap `clamp(20px,3vw,28px)`, 150px plate,
  outlined, border goes `#b68235` on hover.
- **No results**: kicker "Nothing here", a large restatement of the failed query, a consoling
  line naming the total post count, and a "Clear search and filters" outlined button.

### 3. Blog post
Title block (category line, h1, subtitle, meta) then a full-width 340px plate with credit.
Two columns: a sticky TOC rail (`170px`) and the article (`max-width:700px`).
- **TOC scroll-spy**: every in-post `h2` carries `id="sec-N"` and `data-sec="sec-N"` with
  `scroll-margin-top:110px`. On scroll, the active section is the last heading whose
  `getBoundingClientRect().top <= 140`. The active TOC entry goes `#201f1d` and grows a 14px
  accent rule to its left (from `0px`, `.18s ease`); inactive entries are `#605d5d`.
  Clicking scrolls smoothly to `top - 110`. Use `IntersectionObserver` in the real build.
- **Series card** (when the post belongs to a series): outlined, `border-top:2px solid #e1ad66`,
  part list with roman numerals; the current part is plain text with an italic accent
  "— you are here", the others are links.
- Block types the article renderer must support: heading, paragraph, pull-quote, figure with
  caption and "Figure N" label, code with language label, data table, display math, inline math,
  footnote reference, and a "noted" paragraph. Math is rendered by MathJax to SVG.
- Footnotes list, a citation/bib line, and previous/next post links in a two-up footer.

### 4. Software
Header, then **two stacked full-width outlined cards**, max-width 800px, gap 28px. Border goes
`#b68235` on hover.
- **LaTeX editor** — badge "Live", justified description, Type/Stack meta, and a link into the
  working editor screen.
- **StatsLearnR** — badge "In progress" (neutral border, not accent, so Live reads stronger),
  Type "R package & Shiny app", closing italic line pointing at the newsletter. No links yet.

### 5. LaTeX editor (working prototype)
Textarea of LaTeX, live MathJax SVG preview, controls for display/inline mode, font size,
export width, padding and background, then a PNG export with a download link. Cmd/Ctrl+Enter
re-renders. This is real behaviour, not a mock — read the prototype's `renderMath` /
`texToImg` methods for the export pipeline (MathJax SVG → canvas → PNG data URL).

### 6. Publications
Header, then entries grouped by year. Each year: a `30px` tabular numeral and an `#e1ad66`
hairline filling the remaining width. Each entry is a flex row: citation text with the venue in
italic `#605d5d`, and a right-aligned pair of `doi` / `pdf` links — `12px`, uppercase,
`letter-spacing:0.12em`, accent, hairline underline that strengthens to `#b68235` on hover,
`target="_blank" rel="noopener"`.
**Open item:** every `doi`/`pdf` href is currently `#`. The client must supply real DOIs and PDF
URLs; the data shape expects `doi` and `pdf` fields per publication.
Right rail ("At a glance"): count, publication window, Google Scholar link.

### 7. About
Two columns: prose biography, and a sticky profile rail (portrait plate, name, role, links).
Below: a "Selected publications" list showing the **five most recent** papers only, with an
"All 10 papers" link to the Publications page.

### 8. 404
Kicker "Error 404" (tabular), h1 "This page has been mislaid.", a 72px accent rule, one
paragraph, then "All writing" (accent outline) + "Home" (neutral outline) buttons. Right rail
lists the three most recent posts. Reachable at any unrecognised path.

---

## Newsletter states
Outlined card, heading + one line of copy, then the form (`flex:1 1 300px`).
1. **Idle** — 44px-min email input (`1px solid rgba(32,31,29,0.14)`) + outlined "Subscribe".
   Enter submits.
2. **Error** — same form, field border `#9a3b28`, message below in `#9a3b28` at `14.5px`.
   The input is **never unmounted** between idle and error — the user keeps their text and caret.
   Editing the field clears the error.
   Validation: empty → "Enter an email address."; fails
   `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` → "That doesn't look like an email address.";
   already subscribed → "That address is already on the list."
3. **Success** — form replaced by a block with a `1px solid #b68235` left rule: "Check your
   inbox." + "A confirmation went to {email}…" + a small "Use a different address" reset link.

Real backend: **Buttondown** (free to 100 subscribers) — chosen because it owns double opt-in,
unsubscribes and an archive, which the success state promises. Post the address to its
subscribe endpoint; the "already on the list" branch maps to its duplicate response.

---

## Emails
`Newsletter Email.html` (one post per send) and `Confirmation Email.html` (double opt-in).
600px table layout, `#e9e7e4` desk / `#f3f2f2` card, Georgia stack, hidden preheader span,
bulletproof outlined CTA (bordered `<td>` with a block-level `<a>`), `mso-line-height-rule:exactly`
throughout, one `@media max-width:620px` block. Buttondown merge tags:
`{{ subscriber.email }}`, `{{ unsubscribe_url }}`, `{{ subscriber.confirmation_url }}`
— confirm the last against Buttondown's current variable list.
**Before sending:** replace the plate placeholder cell with a hosted `https://` image
(1120×700, real alt text) and fill in the postal address in the footer.

---

## Responsive
The prototype uses a **container query** (`@container site (max-width:900px)`) plus a matching
media query to drop every sticky rail to `position:static` — the rails are marked `[data-rail]`.
Without this, page content scrolls underneath the pinned rail. In a real build a plain media
query at 900px is enough; keep the breakpoint.
Below 900px: rails stack under their content, the nav row scrolls horizontally
(`overflow-x:auto; scrollbar-width:none`), and card grids collapse to one column.

## State
Prototype-only: `screen`, `postId`. Real routing replaces both.
Genuinely needed in the build: `cat` + `query` + `blogView` (writing index), `subEmail` +
`subState` + `subErrMsg` (newsletter), `activeSec` (TOC scroll-spy), and the LaTeX editor's
`latex` / `display` / `size` / `exWidth` / `pad` / `bg` / `exportUrl`.

## Interaction states — required, not optional
Every interactive element needs a themed hover and pressed state from the accent, and
`:focus-visible { outline: 2px solid #b68235; outline-offset: 2px; }`. Never ship the default
blue focus ring. Disabled controls drop to 45% opacity.

## Assets
- Post and hero photographs live in `assets/` and are wrapped in the Classical `.plate` class
  (thin `#f3f2f2` mat + warm archival grade). Every content photograph goes through it.
- Icons: **Lucide**. The only inline SVG in the prototype is Lucide's arrow-up-right,
  used for outbound links in the news strip.
- Fonts: Cormorant Garamond + Lora, both on Google Fonts.
- MathJax is loaded from CDN for the LaTeX editor and post math.

## Files in this bundle
| File | What it is |
| --- | --- |
| `Rob Taylor - Site Mockups v3.dc.html` | The full site prototype — all 8 screens |
| `Mobile Screens.dc.html` | The same screens in a phone frame |
| `Newsletter Email.html` | Issue email, send-ready |
| `Confirmation Email.html` | Double opt-in email, send-ready |
| `assets/` | Photographs used in the mockups |

Open the prototypes in a browser. Screens are reachable by hash: `#home`, `#blog`, `#post`,
`#code`, `#about`, `#pubs`, `#app`, `#404`.

## Open decisions for the client
1. Real DOI and PDF URLs for all ten publications.
2. Post search: not designed. Unnecessary at 10 posts, needed by ~50.
3. Hosted image URL + postal address for the emails.

*(Home layout is settled: Editorial.)*
