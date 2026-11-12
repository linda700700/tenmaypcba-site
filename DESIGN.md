---
version: alpha
name: Precision Grid Blue
description: Light-first industrial documentation system for a Shenzhen turnkey PCBA manufacturer. White and light-grey sheets, one deep corporate blue for brand and action, hairline construction instead of shadow, and monospace evidence inside dense capability tables. Evolves the graphite/orange Precision Grid into a white, blue, spec-sheet language for the Capabilities route.
colors:
  primary: "#004B93"
  primary-hover: "#003C76"
  primary-pressed: "#002C58"
  primary-deep: "#062B4D"
  primary-tint: "#EAF1F8"
  line-inverse: "#1D476B"
  on-primary: "#FFFFFF"
  paper: "#F5F6F8"
  surface: "#FFFFFF"
  row-alt: "#F2F6FA"
  row-hover: "#E6EEF7"
  line: "#E2E6EB"
  line-strong: "#7A8794"
  ink: "#111A24"
  ink-secondary: "#4A5765"
  ink-muted: "#5F6B78"
  ink-inverse: "#FFFFFF"
  ink-soft-inverse: "#D6E2EE"
  muted-inverse: "#A9BACB"
  border-inverse-control: "#6F8DAB"
  surface-hover-inverse: "#E9EFF5"
  focus: "#1A6FD4"
  focus-inverse: "#8FC2F5"
  error: "#B3261E"
typography:
  display-hero:
    fontFamily: Archivo
    fontSize: 44px
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: -0.02em
  headline-section:
    fontFamily: Archivo
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.015em
  headline-band:
    fontFamily: Archivo
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.015em
  headline-row:
    fontFamily: Archivo
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
  table-cell:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.01em
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.1em
  data-md:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.01em
    fontFeature: "\"tnum\" 1, \"zero\" 1"
  data-sm:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0.02em
    fontFeature: "\"tnum\" 1, \"zero\" 1"
  sidebar-link:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.35
  button:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.08em
rounded:
  none: 0px
  sm: 2px
  md: 4px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  gutter: 24px
  container: 1280px
  columns: 12
  sidebar: 280px
  doc-gutter: 40px
  hairline: 1px
components:
  page-hero:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.ink-inverse}"
    padding: 72px
    height: 324px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 20px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    height: 48px
  button-primary-active:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    height: 48px
  button-inverse:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 20px
    height: 48px
  button-ghost-inverse:
    backgroundColor: "transparent"
    textColor: "{colors.ink-inverse}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 20px
    height: 48px
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    height: 44px
  sidebar-group:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label-caps}"
    padding: 12px
    height: 40px
  sidebar-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.sidebar-link}"
    padding: 12px
    height: 44px
  sidebar-item-hover:
    backgroundColor: "{colors.row-hover}"
    textColor: "{colors.primary}"
    typography: "{typography.sidebar-link}"
    height: 44px
  sidebar-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.sidebar-link}"
    height: 44px
  tier-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 28px
  table-header:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    padding: 12px
    height: 44px
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.table-cell}"
    padding: 12px
    height: 44px
  table-row-alt:
    backgroundColor: "{colors.row-alt}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.table-cell}"
    height: 44px
  table-row-hover:
    backgroundColor: "{colors.row-hover}"
    textColor: "{colors.ink}"
    typography: "{typography.table-cell}"
    height: 44px
  format-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.data-sm}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 36px
  step-number:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.data-md}"
    rounded: "{rounded.none}"
    size: 44px
  step-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: 24px
  customer-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 28px
  cta-band:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.ink-inverse}"
    padding: 72px
  table-scroller:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.none}"
    width: 100%
---

# Precision Grid Blue — Capabilities Documentation System

## Overview

This is the design language for the `/capabilities` route of a Shenzhen turnkey PCBA and electronics manufacturer. It is a **documentation surface, not a marketing surface**: the page exists so an engineer or sourcing lead can read a 30-row tolerance table on a laptop at 3 pm and a 375px phone on a factory floor at 11 pm, and come away knowing exactly what the factory can and cannot build.

Precision Grid Blue is an **evolution of the project's existing Precision Grid system**, not a replacement. It keeps every structural decision of the parent: the 12-column 1280px grid, the three-role type system (Archivo for statements, Public Sans for reading, IBM Plex Mono for evidence), 1px hairlines instead of shadows, machined geometry (0px panels, 2px controls), and dense table-driven composition. What changes is surface polarity and signal color, because the brand is a clean white/light-grey industrial company whose accent is deep blue `#004B93`, not graphite and orange.

**Deliberate deviations from the parent system — all scoped to this route:**

- **Surface polarity flips to light-first.** The documentation body sits on white and `#F5F6F8` sheets. Graphite is retired as a page surface and survives only as `primary-deep` (`#062B4D`), a blue-black used for exactly two full-bleed bands: the page hero and the closing CTA.
- **The signal accent is Corporate Blue (`#004B93`).** It replaces Signal Orange as the single chromatic voice: primary CTA fill, active sidebar row, table header, step numerals, focus. No orange appears anywhere in page content; where the global header or footer still carries the legacy treatment, it is a separate, out-of-scope surface family and must not bleed into this page's bands.
- **Typography gains a body-scale table voice.** The parent set every table value in IBM Plex Mono. A 4-column table with multi-line prose cells cannot carry 13px monospace for 30 rows, so table **labels and prose** are Public Sans 13px and only genuine **values, units, codes and step numerals** stay IBM Plex Mono. This is the single most important local rule on the page.
- **Section headings are smaller and the rhythm is tighter.** The parent's 44px band headlines would turn a 30-row spec sheet into a sequence of posters. Section heads are 28px, and blocks separate with 1px rules at 64px rhythm instead of 96px bands.
- **The sidebar is sticky.** The reference site's left navigation scrolls away with the page; here it persists (`position: sticky`), because on a 6,000px-tall document the reader needs to know which capability set they are inside.

**Reference translation.** The inspected reference (`pcbway.com/capabilities.html`) gave the layout skeleton: a 340px dark full-bleed hero with a 40px white H1, a 1200px container split into a 245px left navigation rail and a 900px reading column at a 40px gutter, 24px section headings with 20px bottom margin, 1px `#EEE` section rules, 12px table body text at 20px line-height with 8px cell padding and a `#F4F7FA` zebra, 40px sidebar rows with a solid dark-green active row, and customer blocks built from a 48px bordered icon tile sitting beside a bold inline label and one paragraph. Its typographic taste — high density, small type, hairlines, no shadows, no radius — is inherited here. Its brand colors, green palette, logo, iconography and body copy are not. The reference has **no mobile layout at all** (no viewport meta; a 1232px document width at a 375px viewport), so every responsive behavior below is designed here rather than copied.

**What the page must feel like.** Like a controlled drawing package handed over by a process engineer: white paper, blue revision stamp, mono annotations in the margin, nothing decorative, nothing floating, nothing that cannot be measured. Density is the credibility. Air is spent only where it protects a number.

**Copy density and length budget.** Copy is written by our engineers about our own factory; none of the reference's marketing prose is reproduced. Every block has a hard budget:

- **Hero:** one paragraph, 38–55 words. It must name Shenzhen, the turnkey scope (fabrication, sourcing, assembly, test), and the real upper limit of the shop (layer count, finest pitch, smallest passive). No second paragraph, no bullet list, no logo strip.
- **Tier block:** two panels, ≤ 28 words each, one sentence of definition plus one clause of consequence.
- **Table cells:** item labels 1–4 words; Standard and Advanced cells 2–12 words and never more than two lines at 960px; Remarks ≤ 18 words and never more than three lines. If a caveat needs more room, it becomes a numbered footnote under the table rather than a fatter cell.
- **File block:** ≤ 70 words total plus the five format chips.
- **Process steps:** heading ≤ 5 words; paragraph 22–38 words, carrying one process fact and one control fact (what the machine does, what is inspected).
- **Customer cards:** 22–30 words each, naming the sector and one verifiable service property.
- **Closing CTA:** headline ≤ 10 words, support line ≤ 14 words.
- **Tone:** unit-bearing and verifiable ("0.4mm pitch BGA", "IPC-A-610 Class 3", "±0.075mm"), never a superlative. No "world-class", "leading", "cutting-edge", "one-stop solution". If a figure has not been supplied by the factory, render `DATA PENDING` in mono rather than inventing it.

## Colors

A two-surface document palette and one blue signal. Everything else is a neutral step or a hairline.

- **Primary — Corporate Blue (`#004B93`):** the single chromatic voice. Primary CTA fill on light sheets, table header row, active sidebar row, step numerals, inline links, and the 2px top rule on the Advanced tier panel. Hover `#003C76`, pressed `#002C58`. Never used as a decorative wash, a gradient stop, or a background behind body copy.
- **Primary Deep — Blue-Black (`#062B4D`):** the machine band. The hero and the closing CTA are the only two surfaces that use it. It carries white text at 14.4:1 and is the reason the page reads as "industrial" without going grey. `line-inverse` (`#1D476B`) is the only structural hairline permitted on it.
- **Primary Tint (`#EAF1F8`):** reserved for two things only — the "Advanced" tier panel's header strip and the resolved state of an upload drop target. It is a 5% blue wash, never a full card background.
- **Paper (`#F5F6F8`) / Surface (`#FFFFFF`):** the two light steps. `surface` is where reading and data live (table rows, cards, prose blocks). `paper` is the page canvas and the sidebar group-header strip. A white table on a paper canvas is already "above" it; no shadow is needed.
- **Row layers: `row-alt` (`#F2F6FA`) and `row-hover` (`#E6EEF7`).** Zebra striping is required for any table over 12 rows; hover is one step stronger than the stripe, never a blue fill and never an accent color. Hover must not change the row's height.
- **Line (`#E2E6EB`) / Line Strong (`#7A8794`):** `line` is the structural hairline — table rules, section rules, sidebar row borders, card frames. `line-strong` is the only acceptable boundary for inputs, chips and the upload zone, because interactive boundaries must clear 3:1 (3.7:1 on white).
- **Ink (`#111A24`) / Ink Secondary (`#4A5765`) / Ink Muted (`#5F6B78`):** three text weights. `ink` carries headings and table item names; `ink-secondary` carries table values, remarks and body copy (7.4:1 on white); `ink-muted` is reserved for captions, units, footnote markers and metadata (5.4:1 on white, 5.0:1 on paper). Never approximate these with a mid-grey.
- **Inverse — `ink-inverse` (`#FFFFFF`) / `ink-soft-inverse` (`#D6E2EE`) / `muted-inverse` (`#A9BACB`):** text on `primary-deep`. `ink-soft-inverse` carries the hero paragraph, `muted-inverse` carries mono labels, eyebrow lines and the CTA band's contact line. All three are measured against `#062B4D`, not against paper. `border-inverse-control` (`#6F8DAB`) is the only border value permitted for a ghost control on the dark band, and `surface-hover-inverse` (`#E9EFF5`) is the only hover fill for a white button.
- **Focus (`#1A6FD4`) / Focus Inverse (`#8FC2F5`):** the focus ring on light surfaces and on `primary-deep` respectively. Neither is ever replaced by a browser default, and neither is ever removed.
- **Error (`#B3261E`):** rejected file types and validation only. Always paired with a mono message and an inline icon so meaning never depends on hue.

**Measured contrast pairs (WCAG 2.1, all verified)**

| Pair | Ratio | Use |
|---|---|---|
| `#111A24` on `#FFFFFF` | 17.6:1 | Headings, table item names |
| `#FFFFFF` on `#062B4D` | 14.4:1 | Hero and CTA band text |
| `#FFFFFF` on `#004B93` | 8.6:1 | Primary button label, table header label, active sidebar label |
| `#004B93` on `#FFFFFF` | 8.6:1 | Inline links, step numerals, tier labels |
| `#004B93` on `#F5F6F8` | 8.0:1 | Links on the paper canvas |
| `#4A5765` on `#FFFFFF` | 7.4:1 | Table values and remarks |
| `#4A5765` on `#F2F6FA` | 7.0:1 | Table values on a zebra row |
| `#D6E2EE` on `#062B4D` | 10.9:1 | Hero paragraph on the dark band |
| `#A9BACB` on `#062B4D` | 7.2:1 | Mono labels on the dark band |
| `#6F8DAB` on `#062B4D` | 4.2:1 | Ghost button border (non-text) |
| `#8FC2F5` on `#062B4D` | 7.7:1 | Focus ring on the dark band |
| `#B3261E` on `#FFFFFF` | 6.5:1 | Error text |
| `#5F6B78` on `#FFFFFF` | 5.4:1 | Captions, units, footnotes |
| `#5F6B78` on `#F5F6F8` | 5.0:1 | Captions on paper |
| `#1A6FD4` on `#FFFFFF` | 4.9:1 | Focus ring on light surfaces |
| `#7A8794` on `#FFFFFF` | 3.7:1 | Control and chip borders (non-text) |
| `#E2E6EB` on `#FFFFFF` | 1.2:1 | Structural hairlines only, never text or boundaries of controls |

Blue text is **forbidden on `primary-deep`**: `#004B93` on `#062B4D` measures 1.6:1. On the dark band, anything that must read as blue is either the focus ring (`#8FC2F5`) or a solid `#8FC2F5` 2px mark. Orange, green, teal and purple are absent from this page's palette; error red is the only additional hue and appears exclusively on upload failures.

Color never carries meaning alone. The active sidebar row reads as active through fill **and** a 6×6px inverse square marker **and** a 600-weight label. A rejected file carries a border change, a mono word `REJECTED`, and an icon.

## Typography

Three families, three jobs, unchanged from the parent system.

- **Archivo — statements.** Hero H1, section H2, band headline, row titles. Weight 600 only. Its squared terminals read as machined signage above 20px and as an equipment label at 20px.
- **Public Sans — reading.** Body copy, table labels and prose, sidebar links, captions. Weights 400 and 500. Institutional, quiet, and it does not compete with Archivo.
- **IBM Plex Mono — evidence.** Step numerals, table values with units, tolerances, codes, format chips, table headers, eyebrow labels, buttons, footnote markers. True tabular figures keep `±0.075mm` columns optically aligned, which is the entire reason a spec table works.

| Role | Token | Spec | Where |
|---|---|---|---|
| Hero statement | `display-hero` | 44 / 600 / 1.06 / −0.02em | Page H1 only, max 2 lines |
| Section head | `headline-section` | 28 / 600 / 1.2 / −0.015em | Each documentation section |
| Band head | `headline-band` | 32 / 600 / 1.15 | Closing CTA only |
| Row title | `headline-row` | 20 / 600 / 1.3 | Process step headings, customer card titles |
| Intro paragraph | `body-lg` | 18 / 400 / 1.6 | Hero paragraph, section decks (max 62ch) |
| Body | `body-md` | 16 / 400 / 1.6 | Prose blocks, file requirements |
| Dense body | `body-sm` | 14 / 400 / 1.55 | Remarks in cards, footnote blocks, sidebar captions |
| Table cell | `table-cell` | 13 / 400 / 1.55 | All four columns' prose |
| Caption | `caption` | 12 / 400 / 1.5 | Image captions, legal, disclaimers |
| Eyebrow / column head | `label-caps` | 11 / 500 / 1 / 0.1em, uppercase | Table headers, sidebar group headers, section indices |
| Spec value | `data-md` | 13 / 500 / 1.4, tabular | Step numerals, inline measurements, chip labels |
| Code / unit | `data-sm` | 12 / 400 / 1.45, tabular | Units, file extensions, footnote markers, IDs |
| Sidebar link | `sidebar-link` | 14 / 500 / 1.35 | Sidebar items and the mobile disclosure trigger |
| CTA label | `button` | 12 / 500 / 0.08em, uppercase | Every button and chip control |

**Rules**

- Uppercase is always IBM Plex Mono at ≥ 0.08em tracking. Uppercase Public Sans or Archivo is forbidden.
- Only three weights exist: 400, 500, 600. Never 700, never 300. Numerals are never italic.
- Display sizes ≥ 28px take negative tracking (−0.015em to −0.02em); body, table and mono text never do.
- Body copy is capped at 62ch, hero paragraph at 58ch, table remarks at 34ch inside their cell, sidebar labels at 24ch with a single-line ellipsis fallback and a `title` attribute.
- Every table figure, tolerance, unit, step numeral and file extension sets `font-feature-settings: "tnum" 1, "zero" 1`.
- **Inline mono inside table cells.** A cell's sentence is `table-cell`; any measurement, unit, code or file extension inside it is wrapped in a `data-sm` span in `ink` (not `ink-muted`). One row may therefore mix both families — that mixing is the system, not an accident.
- Fallback stacks are mandatory: `"Archivo", "Helvetica Neue", Arial, sans-serif`; `"Public Sans", "Helvetica Neue", Arial, sans-serif`; `"IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace`. Load at most three weights per family and preload Archivo 600 for the hero.
- **Mobile steps:** `display-hero` → 32px / 1.1; `headline-section` → 24px; `headline-band` → 26px; `headline-row` → 18px; `body-lg` → 16px. `table-cell` and `data-sm` never shrink below 13px and 12px. Never let the hero H1 exceed three lines at 375px.

## Layout

**Grid.** A 12-column fluid grid inside a 1280px max container, 24px gutters and 24px outer padding (20px on phones). The documentation region is a fixed asymmetric split: **280px sidebar + 40px gutter + fluid main column (960px at max width)**, aligned to column 4 so the reading column starts on a grid line at every breakpoint.

**Bands.** Three full-bleed surfaces in sequence: `primary-deep` hero (324px tall), the long `paper` documentation body, and a `primary-deep` closing CTA. Bands meet with a hard 1px seam — `line-inverse` against the dark, `line` against the light. No shadow, no curved divider, no gradient.

**Vertical rhythm.** Inside the documentation body: 64px between major sections with a 1px `line` rule above each section head, 32px between a section head and its first block, 24px between sibling blocks, 16px between a paragraph and a table, 12px between table and its footnote block. The hero takes 72px vertical padding (56px on phones); the CTA band takes 72px (48px on phones). This is roughly twice the reference's 30–40px spacing — deliberately, because our tables are taller and our type is one step larger.

**Signature compositions**

- **Page hero.** `primary-deep` full-bleed. A `label-caps` eyebrow in `muted-inverse` (`CAPABILITIES · REV 2026.10`), a two-line `display-hero` H1 in white, a 58ch `body-lg` paragraph in `ink-soft-inverse`, then a single CTA row: a 48px white `button-inverse` ("Get an Instant Quote") and a `button-ghost-inverse` anchor link to the capability tables. Right side is empty by design — no illustration, no photograph, no product render. The column of empty navy is what makes the page read as a title sheet.
- **Documentation two-column.** Sticky sidebar, fluid main column. The sidebar holds two grouped lists; the main column holds everything else, with the first section head sitting on the same baseline as the sidebar's first group header.
- **Tier comparison.** Two squared panels sharing a single 1px vertical rule, full main-column width. Left: `label-caps` `STANDARD / QUICK-TURN`, a 20px definition, three mono spec lines. Right: same anatomy for `ADVANCED`, with a `primary-tint` header strip and a 2px `primary` top rule to state which tier the tables describe as default. On mobile they stack with a 24px gap and their shared rule becomes a horizontal one.
- **Specification tables.** Full main-column width, 4 columns (Item 22% / Standard 26% / Advanced 26% / Remarks 26%), header in `primary` with `label-caps`, 44px rows, zebra from row 2, sticky first column. Directly above: a mono index line (`TABLE 01 · PCB FABRICATION`), an H2, and a one-sentence deck. Directly below: numbered `data-sm` footnotes and a mono row count.
- **File requirements.** A 1px `line` framed panel on `surface`, split 8/4: left is two short prose paragraphs and a numbered list of what a complete package contains; right is a stack of five 36px format chips (`GERBER`, `.PCB`, `.PCBDOC`, `.CAM`, `.ZIP ≤ 50 MB`) and one `ink-muted` `caption` line stating the size limit. No dropzone here — uploading happens in the quote flow, and this block is documentation.
- **Process steps.** 18 rows, each a 3-part grid: a 64px number rail holding a 44×44px square `step-number` plate, a flexible text column (`headline-row` + 22–38 word paragraph), and a 216px image slot (16:10, 1px `line` frame, optional, with a `caption` rail underneath). Rows are separated by 1px `line` rules, not cards, and never alternate background — the sequence must read as one continuous flow.
- **Customer cards.** 2×2 grid of squared `surface` cards, 1px `line` frame, 28px padding, 24px gap: a 96×96px image slot, a `label-caps` sector index (`SECTOR 01`), a `headline-row` title, and a 22–30 word `body-sm` paragraph. The four cards share one visual weight; none is "featured".
- **Closing CTA.** `primary-deep` band, 8/4 split: `headline-band` plus one `body-sm` support line in `muted-inverse` on the left; the white `button-inverse` on the right, vertically centered. One action only.

**Responsive behavior**

| Width | Behavior |
|---|---|
| ≥1440px | Container 1280px centered; sidebar 280px sticky at `top: 96px`; 4-column tables at full 960px; step image slot 216px |
| 1024–1439px | Container fluid with 24px padding; sidebar 240px + 32px gutter; tables 4-column; step image slot 180px |
| 768–1023px | Sidebar collapses into a full-width disclosure above the main column (48px trigger, `ON THIS PAGE`, `sidebar-link` label, chevron; expands to the grouped lists, current item marked). Main column full width. Step rows drop the image slot to 160px |
| <768px | Single column, 20px padding. Tables become horizontal scrollers (see below). Tier panels stack. Step rows reflow: number plate in a 52px left rail, title and paragraph to its right, image full width below the paragraph. Customer cards 1-up. CTA band stacks and the button goes full width |
| <480px | Hero H1 32px; hero CTAs stack full width; table scroller shows only Item plus part of Standard, with the sticky first column doing the orienting; footnote block drops to 12px `data-sm` |

**Tables at 375px.** The table lives inside a `role="region"` scroller (`overflow-x: auto`, `-webkit-overflow-scrolling: touch`, `tabindex="0"`, `aria-label` naming the table and stating it scrolls horizontally). Column min-widths: Item 152px, Standard 200px, Advanced 200px, Remarks 224px — a 776px scroll surface. The Item column is `position: sticky; left: 0` with `background: inherit` so zebra and hover states survive the stick, plus a 1px `line` right border. Above the scroller sits a mono affordance in `ink-muted`: `SWIPE TO COMPARE →`, hidden once the scroller reaches its end. The scroller itself is never the only way to read a cell: every row is a real `<tr>` with `<th scope="row">` item labels, so a screen reader reads value, item and column header in order without any horizontal movement.

**Interaction geometry.** Every interactive target is at least 44×44 CSS px: sidebar items 44 (48 on mobile), table row links 44, format chips 36 tall but padded to a 44px hit area, buttons 48, the mobile disclosure trigger 48, the scroller focus target full width. Nothing interactive may be smaller than its row.

**Motion.** 140ms for hover and focus color changes, 220ms for the mobile disclosure expand, `cubic-bezier(0.2, 0, 0, 1)` for both. Sticky positioning is instant. No parallax, no scroll-triggered fades on text, no count-up numbers, no image zoom on hover. Under `prefers-reduced-motion: reduce` all durations become 0ms and the disclosure opens without height animation.

## Elevation & Depth

The system is **flat by construction**. Nothing floats; everything is pinned to the sheet. Depth is expressed in four ordered mechanisms:

1. **Tonal step.** `paper` → `surface` lifts reading and data forward. Inside `surface`, `row-alt` is a third micro-step used only for zebra.
2. **Hairline containment.** 1px `line` on light, 1px `line-inverse` on `primary-deep`. Panels are framed, not raised. When a block needs emphasis, one edge is thickened to 2px in `primary` (the Advanced tier panel's top rule) rather than blurred.
3. **Type and scale.** A 44px hero statement against 13px table cells creates more hierarchy than any shadow could, and it holds up when the page is printed.
4. **Overlay.** Two overlay values exist and no others: a scrim of `rgba(6, 43, 77, 0.72)` behind the mobile navigation drawer (global, out of scope here but shared), and one shadow, `0 8px 24px rgba(6, 43, 77, 0.16)`, permitted only on the mobile "On this page" panel when it expands over content.

Never apply shadows to cards, table rows, tier panels, step rows, images or buttons. Never use inner shadows, glows, accent halos, or a sticky sidebar that "lifts" on scroll. Hover on a framed block changes its border to `primary` and its background by one tonal step; it never translates, scales, or lifts.

For photography: 0px radius, 1px `line` frame, no gradient overlay, no vignette. If text must sit over an image it sits in a solid `surface` caption block, never on a scrim. Photographs are real macro shots of boards, stencils, reflow ovens and inspection benches — never illustrated circuits, never AI-rendered machinery.

## Shapes

Geometry is **machined, not rounded**. Radius encodes function and nothing else:

- **0px — panels, tables, table headers, tier panels, step number plates, customer cards, image frames, section blocks.** The default is square: a squared edge says "this is a document or a sheet-metal part".
- **2px — controls only: buttons, links-as-buttons, format chips, the mobile disclosure trigger, inputs in the quote flow.**
- **4px — the mobile navigation drawer surface**, and nothing inside it.
- **9999px — 8px status lamps only.** A dot is a circle; a badge is not.

Everything else is a 1px line. Never mix a pill control with a square card in the same band. Never use a rounded card with a colored left border. The only left-edge accent in the system is a 2px `primary` full-height rule marking the *open* FAQ row, which lives outside this route.

Two signature details, both drawn with borders rather than images:

- **Section index rule.** Each documentation section opens with a 1px `line` rule, and 12px below it a `label-caps` index (`03 · ASSEMBLY`) in `ink-muted` sitting on the same line as the H2's cap height. At most one such rule is visible per viewport.
- **Number plate.** The 18 process steps use a 44×44px square plate with a 1px `line` border and `data-md` numerals in `primary`; the plate is the only bordered square in the left rail, so the eye can run down the column of numerals without distraction.

Icons are 1.6px-stroke monoline SVGs in `currentColor`, 20px or 24px, square-capped: chevron, arrow-right, file, upload, check, alert. Never emoji, never filled or two-tone sets, never a competitor's glyph.

## Components

### Page hero

`primary-deep` full-bleed band, 72px vertical padding (56px on phones), content in the 1280px container. Stack: `label-caps` eyebrow in `muted-inverse` with 0.1em tracking; 24px later the H1 in `display-hero` white; 20px later a 58ch `body-lg` paragraph in `ink-soft-inverse`; 32px later the CTA cluster. The cluster holds exactly two controls: `button-inverse` (white fill, `primary-deep` label, 48px, min 200px, label "Get an Instant Quote") and `button-ghost-inverse` (transparent, 1px `border-inverse-control` border, white label, 48px, label "Browse capability tables" anchoring to the first table). Neither is blue-filled on navy — a `#004B93` fill on `#062B4D` would disappear. No image, no illustration, no third action.

### Documentation sidebar

A single sticky rail, 280px wide, `top: 96px` (72px header + 24px), `max-height: calc(100vh - 120px)`, `overflow-y: auto` when the lists exceed it. Two groups:

- **Group header** — 40px row, `paper` fill, `label-caps` uppercase in `ink-secondary`, 12px horizontal padding, 1px `line` bottom border. Labels: `PCB CAPABILITIES`, `PCBA CAPABILITIES`. 24px between groups.
- **Item** — 44px row, `surface` fill, `sidebar-link` 14/500 in `ink-secondary`, 12px horizontal padding, 1px `line` bottom border, a 16px chevron in `ink-muted` pinned right at 12px. Hover: `row-hover` fill, `primary` label, chevron `primary` — 140ms. Focus-visible: 2px `focus` ring at `-2px` inset so it is not clipped by the rail. Active: `primary` fill, white 600 label, chevron white, and a 6×6px white square marker 8px before the text; `aria-current="page"` is required and the 600 weight is the second, non-color cue. Pressed adds no transform.

Below 1024px the rail becomes a `details`/`summary` disclosure above the main column: 48px trigger row on `surface`, 1px `line` border, `label-caps` `ON THIS PAGE` at left and a 20px chevron at right rotating 90° on open; the expanded panel uses the same group headers and 48px items, full width, with the active item filled `primary`.

### Tier comparison block

Two `tier-panel` surfaces sharing one 1px vertical `line`, no gap, no radius, 28px padding. Each panel: a `label-caps` tier name (`STANDARD / QUICK-TURN`, `ADVANCED`), a `headline-row` one-line definition, then up to three rows of `data-md` spec lines separated by 1px `line` (for example `LAYERS  1–14`, `MIN TRACE  0.10mm`, `LEAD TIME  48h`). The Advanced panel carries a 2px `primary` top rule and a `primary-tint` strip behind its label. A 12px `ink-muted` `caption` beneath the pair states the relationship in one mono sentence (`STANDARD COVERS QUICK-TURN AND BATCH WORK; ADVANCED COVERS EVERYTHING BELOW IT IN THE TABLES.`). No icons, no checkmarks, no "best value" badge.

### Specification tables

`<table>` with `<caption>` (visually hidden, naming the table), `<thead>` with four `<th scope="col">` cells, and `<th scope="row">` for every Item cell. Header row: 44px, `primary` fill, `label-caps` white, 12px padding, left-aligned, bottom rule none. Body rows: minimum 44px, 12px padding, 1px `line` bottom border, `table-cell` in `ink-secondary`; Item cells in `ink` at weight 500. Zebra applies to every second row via `row-alt`. Hover applies `row-hover` to the whole row (`<tr>`), including the sticky cell, at 140ms; hover never changes row height, never underlines text, and never opens a tooltip. Long content wraps rather than truncates: cells are `overflow-wrap: anywhere` with `hyphens: auto`, and no column uses ellipsis except sidebar labels.

Cell anatomy: measurement-first. Write `±0.075mm` as a `data-sm` mono span inside a `table-cell` sentence, e.g. "Drill position, `±0.075mm` typical". `—` in `ink-muted` marks an intentional absence; an empty `<td>` is a defect. If a whole tier has no entries, render a single `<tr>` spanning all four columns with `data-sm` `NO ENTRIES IN THIS TIER · CONTACT ENGINEERING`.

Table chrome: 1px `line` frame around the scroller, no outer shadow. Above it, a toolbar row: mono index at left (`TABLE 01 · FABRICATION`), and at right a `data-sm` `ink-muted` row count (`36 ROWS`). Below it, footnotes as `data-sm` with superscript markers, and an optional `body-sm` "how to read this table" note capped at 80ch.

### Table scroller and sticky column

The scroll container is the framed wrapper, never the page. It receives `tabindex="0"` and a 2px `focus` ring at `outline-offset: -3px`, so keyboard users can focus it and scroll with arrow keys. The Item column is sticky at `left: 0`, inheriting its row's background and carrying a 1px `line` right border only while scrolled (toggled with a scroll listener or an `IntersectionObserver` on a sentinel). Scrollbars are styled thin and neutral; horizontal momentum is preserved on iOS. No gradient masks over the scroll edges — they would read as a fade, which this system forbids; the mono `SWIPE TO COMPARE →` hint carries the affordance instead.

### File requirements block

`surface` panel, 1px `line` frame, 0px radius, 40px padding, 8/4 split. Left column: an H3 at `headline-row`, two `body-md` paragraphs at 62ch, and a numbered `data-sm` list of what a manufacturable package must contain (Gerber X2 or RS-274X, drill files, BOM with MPNs, pick-and-place CSV, panelization notes). Right column: five `format-chip` rows, each 36px tall with a 44px hit area, `data-sm` `primary` labels in a 1px `line` frame, stacked with 8px gaps, plus a `caption` `ink-muted` line reading `MAX 50 MB PER ARCHIVE`. Copy must state which formats are accepted — Gerber, `.pcb`, `.pcbdoc`, `.cam` — and what happens to a rejected one (a mono `REJECTED · FORMAT` line in `error`, paired with an alert icon). Empty state: if no format list has been supplied, the right column renders a single `data-sm` `DATA PENDING` slot, not a blank panel.

### Process step row

An 18-row `<ol>` with `list-style: none`, each `<li>` a 3-part CSS grid: `64px | 1fr | 216px`, 24px column gap, 24px vertical padding, 1px `line` bottom border. Part 1 is the `step-number` plate (44×44, 1px `line`, `data-md` numerals in `primary`, numerals zero-padded `01`–`18`). Part 2 is `headline-row` (max 5 words) plus a `body-sm` paragraph capped at 62ch. Part 3 is the optional image slot: 16:10 `surface` frame with 1px `line`, `object-fit: cover`, and a `caption` rail below naming the equipment class (`AOI · POST-REFLOW`). Rows never stagger left/right; the rail must be a perfectly straight column of numerals. Hover (row is not a link by default) only darkens the number plate's border to `primary`; if a step is linkable, the entire row becomes a link with a 44px minimum height and a visible focus ring, and hover adds `row-hover` without shifting content. Empty image slot: keep the frame with a `primary-tint` fill and `data-sm` `IMAGE PENDING` centered — never collapse the column, or the numeral rail loses alignment.

### Customer card

`surface` card, 1px `line` frame, 0px radius, 28px padding, no shadow. Stack: 96×96px image slot (1px `line` frame, `object-fit: cover`, 0px radius), 20px gap, `label-caps` index in `ink-muted` (`SECTOR 01`), 8px gap, `headline-row` title in `ink`, 12px gap, 22–30 word `body-sm` in `ink-secondary`. Grid: 2×2 at ≥768px with 24px gaps; 1-up below. Hover: border to `primary`, background stays `surface`; no lift. The four cards are equal weight and equal height (align with `grid-auto-rows: 1fr`).

### Closing CTA band

`primary-deep` full-bleed, 72px padding, 8/4 split. Left: `label-caps` eyebrow in `muted-inverse`, `headline-band` in white (`Get a DFM review before you commit`), one `body-sm` support line in `muted-inverse` capped at 54ch. Right: one `button-inverse`, 48px, min 200px, vertically centered, plus a `data-sm` `muted-inverse` line under it (`REPLY WITHIN 1 BUSINESS DAY`). No second button, no form, no newsletter field.

### Buttons, links and focus

- **Primary (light surfaces only):** `primary` fill, white label, `button` type, 2px radius, 48px height, 20px horizontal padding, min 168px. Hover `primary-hover`; pressed `primary-pressed` with a 1px inward translate; disabled `paper` fill, `ink-muted` label, 1px `line` border, no hover.
- **Inverse (dark bands only):** white fill, `primary-deep` label, same geometry. Hover `surface-hover-inverse`. Never place a `primary`-filled button on `primary-deep`.
- **Ghost inverse:** transparent, 1px `border-inverse-control` border, white label. Hover border white and background `rgba(255,255,255,0.06)`.
- **Text link:** `primary` at 8.6:1, no default underline, 1px bottom border in `rgba(0,75,147,0.35)` that thickens to 2px `primary` on hover; 44px hit area. On `primary-deep`, use white with a `rgba(255,255,255,0.4)` rule.
- **Focus:** 2px solid `focus` at 2px offset on light surfaces, `focus-inverse` on `primary-deep`; inside scroll containers and rails use `outline-offset: -2px`. Focus is never removed, never replaced by a background change alone, and must be visible on zebra rows, active sidebar rows and white buttons.

## Do's and Don'ts

- Do keep `#004B93` as the only chromatic voice on this page: one filled primary action per viewport, one active-state signal, and the table header as the section's structural blue. Nothing else may be blue-filled.
- Do retire the parent system's Signal Orange inside page content; orange never appears in a band, a table, a step or a card on this route.
- Do put every measurement, unit, tolerance, file extension and step numeral in IBM Plex Mono with tabular figures, and every human sentence in Public Sans — mixing the two inside one cell is the intended pattern.
- Do stripe any table longer than 12 rows, and make hover exactly one tonal step stronger than the stripe, on the whole row, with no height change.
- Do keep the first table column sticky at 375px with an inherited background and a 1px right rule, inside a focusable, labelled horizontal scroller.
- Do give every table a real `<th scope="col">` per column and `<th scope="row">` per item, plus a visually hidden `<caption>`; horizontal scrolling must never be required to understand a row's meaning.
- Do keep the 18 step numerals in one perfectly straight rail — a broken numeral column reads as a broken process.
- Do hold the copy budgets: 38–55 word hero, ≤ 28 word tier panels, ≤ 18 word remarks, 22–38 word steps, 22–30 word cards.
- Do write unit-bearing, verifiable copy and mark unknown figures `DATA PENDING` instead of inventing a number.
- Do maintain ≥ 4.5:1 for all normal text and ≥ 3:1 for borders, icons and focus rings, using only the measured pairs in Colors.
- Do size every interactive target at 44×44 CSS px minimum and show a 2px focus ring with 2px offset that never disappears.
- Do use 0px radius for every panel, table, card and image frame, 2px for controls, 9999px only for 8px lamps.
- Do frame with 1px hairlines and express emphasis by thickening one edge to 2px in `primary`.
- Don't place `#004B93` text or fills on `#062B4D` — 1.6:1 is invisible; use white or `#8FC2F5` on the dark bands.
- Don't introduce a second accent, a success green, a gradient, a glow, or a decorative illustration anywhere on the page.
- Don't add shadows, lifts, scale transforms or image zooms to cards, rows, images or buttons; hover changes color and border only.
- Don't rebuild every section as a card; the tables, the tier block and the 18-step list are open sheet compositions divided by rules.
- Don't let tables stay as one 776px surface on phones without the sticky column and the swipe hint, and don't wrap them in a card that further narrows them.
- Don't exceed two lines in a Standard/Advanced cell or three in a Remarks cell — overflow becomes a footnote, not a taller row.
- Don't paraphrase the reference competitor's marketing prose; every sentence on this page is written about our own Shenzhen floor, our own equipment and our own measured limits.
- Don't set uppercase in Public Sans or Archivo, don't use weights above 600, and don't use emoji as icons.
