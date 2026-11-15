---
title: "Why does a 50-piece PCBA run cost more per board than 5,000?"
seoTitle: "Why a 50-Piece PCBA Run Costs More Per Board Than 5,000"
description: "Setup, stencil, programming and first-article work do not change with batch size. Here is where the money goes on a small run, and which parts of the gap are not real."
date: 2026-11-06
tags: Costing, HMLV, Quoting
summary: "Fixed cost divided by quantity is most of the answer. The rest is changeover, kitting and material minimums — and knowing which one you are actually paying for."
cover: "/assets/images/hero-line-aisle.webp"
coverThumb: "/assets/images/hero-line-aisle-thumb.webp"
coverAlt: "SMT line aisle with placement machines, feeder carts loaded with component reels, and an operator at a machine console further down the line"
---

The gap is arithmetic, not a small-order penalty. Every job carries work that happens once regardless of batch size — stencil, programming, first-article inspection, changeover, kitting. Spread that over fifty boards instead of five thousand and the per-board number rises sharply even when nothing about the process changed.

## Which costs are fixed per job?

These are incurred once, whether the run is fifty panels or five thousand:

| Fixed cost | What it is | Scales with quantity? |
| --- | --- | --- |
| Stencil | A laser-cut stencil made for the job's apertures | No |
| SMT programming | Feeders loaded, positions taught, part libraries checked, vision recipes tuned per part | No |
| First-article inspection | The first boards checked against drawing and BOM before the run continues | No |
| Line changeover | Previous product off, new one on: cleaning, setup verification, paste and feeder changes | No |
| Kitting and material verification | Reels counted against the BOM, part markings checked, wrong reel caught before it runs | Partly |
| Process documentation | The setup record — paste type, reflow profile, nozzle choice — that lets the job repeat | No |

Divide that list by fifty and the number looks alarming next to a five-thousand-piece unit price. Divide it by the same list over five thousand and it nearly disappears. On a high-mix floor, programming and changeover dominate the fixed side; on a single-product line they effectively vanish because they are paid once and amortised for years.

## How much of the gap is just division?

A worked example, with round numbers, because the mechanic matters more than the figure. Suppose setup consumes four hours of line time before the first good board appears. Those four hours do not shrink because the order is small.

| Batch | Setup time per board | What it looks like on a quote |
| --- | --- | --- |
| 50 boards | 4.8 minutes per board | A visible line item, or a unit price that jumps |
| 500 boards | 29 seconds per board | Noticeable but tolerable |
| 5,000 boards | 2.9 seconds per board | Effectively invisible |

That is the entire mechanic. The percentage uplift depends on how much assembly time each board needs: a dense board with two hundred placements dilutes setup faster than a simple one. Which is why a per-board price quoted without knowing the batch size is guesswork.

## What does not explain the gap?

Three things get blamed for small-batch pricing that usually are not the cause:

| Suspect | Reality | What to ask instead |
| --- | --- | --- |
| Machine time | Fifty boards may take under an hour on the line; placement time is small at both quantities | What is the actual line time, in hours? |
| Component cost | Roughly equal per unit at fifty and at five thousand, unless a reel minimum forces over-buying | Is the material priced at unit cost or at purchased reel quantity? |
| Handling | Real work, but linear — it does not produce a multiple | How many handling hours are in the quote? |

If a supplier cannot separate fixed cost from variable cost, the small-batch number is not verifiable. Ask for the split.

## How do reel minimums change the number?

This is the item that catches buyers out. A part may only exist in a reel of five thousand. A build of fifty boards using twenty of them consumes one thousand pieces; you buy five thousand, and the balance sits in stock with someone paying for it.

| Material policy | Who owns the balance | Best for |
| --- | --- | --- |
| Consigned material | You supply the parts and keep the excess | Expensive or long-lead parts |
| Turnkey with a stocking charge | The assembler buys; excess is billed or held for your next run | Repeat builds of the same design |
| Partial-reel sourcing | Cut quantities from a distributor or broker | Prototypes, with a provenance question attached |

Agree which of these applies, in writing, before the run starts. On a small order the material policy can move the total more than the assembly price does.

## When is a fifty-piece run the cheaper decision?

The comparison is not one-sided. A five-thousand-piece run carries costs a small run avoids:

- **Inventory risk.** Five thousand boards are five thousand boards. If the design changes or demand does not arrive, the money is already spent.
- **Design lock-in.** A small run can be built, tested in the field and revised. The second revision is cheaper than one expensive mistake repeated at volume.
- **Cash cycle.** Fifty boards ship and invoice quickly; five thousand tie up working capital for months.

For a product still finding its market, paying more per board to avoid a large commitment is usually the better trade. The mistake is treating a small-batch unit price as directly comparable to a volume price — they answer different questions.

## What we will not put in a quote

- No per-board price for a run size that has not been stated, because the fixed side cannot be allocated without it.
- No yield or defect-rate percentage attached to a small-batch quote. The variables are the design, the BOM and the stencil — not the batch size.
- No material price presented as fixed when a reel minimum is what set it. If a reel minimum is driving the number, that line is shown separately.

## How do you make a fifty-piece quote land lower?

Four things move the number, in order of effect:

1. **Send complete data the first time.** Gerber, BOM and centroid in the formats the assembler asked for. A re-quote after a data gap costs a second setup review.
2. **Use approved alternates in the BOM.** Every proposed substitution needs a check; an approved-alternates column removes most of that work. The [BOM substitution checklist](/insights/bom-substitution-checklist.html) lists what actually forces a re-quote.
3. **Consolidate part numbers.** Two values that could be one reduces feeder positions, which is the dominant setup cost on a high-mix line.
4. **Say whether a repeat is coming.** A supplier who knows a second build is likely may set up once and keep the programme on file, so the next run does not pay full setup again.

For the wider picture — when a mixed-production model costs more than volume, and when it does not — read [what HMLV means in PCBA](/insights/what-is-hmlv-pcba.html). The [capabilities page](/capabilities.html) states the volume and timing window this floor runs today, including the fifty-piece minimum and three-day standard lead time.

A fifty-piece run is normal business on a high-mix line. It should be priced as arithmetic, not as a favour.
