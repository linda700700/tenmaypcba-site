---
title: "Why a fifty-piece run costs more per board than five thousand"
seoTitle: "Why a 50-Piece PCBA Run Costs More Per Board | TENGMEI"
description: "Setup, stencil, programming and first-article work are fixed costs spread over the batch. Here is where the money goes on a small run, and where it does not."
date: 2026-11-06
tags: Costing, HMLV, Quoting
summary: "Fixed costs divided by quantity is most of the answer. The rest is changeover, kitting and inspection, and knowing which one you are actually paying for."
---

A buyer comparing two quotes for the same board, one at fifty pieces and one at five thousand, is often surprised by how far apart the unit prices are. The gap is not a small-order penalty and it is not arbitrary. It is arithmetic.

Every job carries costs that do not change with quantity. Spread those over fifty boards instead of five thousand and the per-board number moves a lot, even when nothing about the process changed.

## The fixed costs, itemised

These are incurred once per job, regardless of batch size:

- **Stencil.** A laser-cut stencil is made for the job. One stencil, one charge, whether it prints fifty panels or five thousand.
- **SMT programming.** Feeders loaded, positions taught, part libraries checked, vision recipes tuned per part. On a high-mix floor this is the single largest setup item.
- **First-article inspection.** The first boards off the line are checked against the drawing and the BOM before the run continues. This does not scale down.
- **Line changeover.** The previous product comes off, the new one goes on. Cleaning, setup verification, and the paste and feeder changes in between.
- **Kitting and material verification.** Counting reels against the BOM, checking part markings, catching a wrong reel before it runs.
- **Process documentation.** The setup record — paste type, reflow profile, nozzle choice — that lets the job be repeated.

Divide that list by fifty and you get a number that looks alarming next to a five-thousand-piece unit price. Divide it by five thousand and it nearly disappears.

## What does *not* explain the gap

Three things get blamed for small-batch pricing that usually are not the cause:

**Machine time.** Fifty boards may take less than an hour on the line. Placement time is genuinely small at both quantities. If a quote implies otherwise, ask what the line time actually is.

**Material.** Components cost roughly the same per unit at fifty as at five thousand, unless a reel minimum forces you to buy more than the build consumes. That is a real effect, but it is a purchasing problem, not an assembly problem, and it should be shown separately rather than buried in a unit price.

**Handling.** Board handling is real work but it is linear. It does not explain a multiple.

If a supplier cannot separate fixed cost from variable cost on the quote, the small-batch number is not verifiable. Ask for it split.

## The reel minimum problem

This is the one that catches people out, and it is worth its own section.

A 01005 resistor may only exist in reels of five thousand. A build of fifty boards using twenty of them consumes one thousand pieces. You buy five thousand. The remaining four thousand sit in stock, and someone pays for them.

How this is handled varies, and it is worth agreeing in advance:

- **Consigned material.** You supply the parts, you keep the balance. Cleanest for expensive or long-lead parts.
- **Turnkey with a stocking charge.** The assembler buys, and the excess is either billed or held for your next run. Ask which, in writing.
- **Partial-reel sourcing.** Some distributors and brokers sell cut quantities. It reduces the outlay but adds a provenance question you should be comfortable with.

On a small run, material policy can matter more than the assembly price. It is the first thing to clarify on a fifty-piece enquiry.

## Where small batches are genuinely cheaper

The comparison is not one-sided. A five-thousand-piece run carries costs a fifty-piece run avoids:

- **Inventory risk.** Five thousand boards are five thousand boards. If the design changes or demand does not arrive, the money is already spent.
- **Design lock-in.** A small run can be built, tested in the field, and revised. The second revision is cheaper than the first expensive mistake.
- **Cash cycle.** Fifty boards ship and invoice quickly. Five thousand tie up working capital for months.

For a product still finding its market, paying more per board to avoid a large commitment is usually the better trade. The mistake is treating a small-batch unit price as if it were directly comparable to a volume price — they are answers to different questions.

## How to make a fifty-piece quote land lower

Four things move the number, in order of effect:

1. **Send complete data the first time.** Gerber, BOM and centroid in the formats the assembler asked for. A re-quote after a data gap costs a second setup review.
2. **Use approved alternates in the BOM.** Every substitution needs a check. An approved-alternates column removes most of that.
3. **Consolidate part numbers.** Two values that could be one reduces feeder positions, which is the dominant setup cost.
4. **Be explicit about what varies.** If this is the first of several builds, say so. A supplier who knows a repeat is coming may set up once and keep the program on file.

## Ask for the split

The practical advice for any small-batch enquiry: ask for the quote split into setup, material and per-board assembly. A supplier who can produce that split knows their own cost structure, and you can see immediately whether the number is explained by fixed costs or by something less comfortable.

A fifty-piece run is normal business on a high-mix line. It should be priced as arithmetic, not as a favour.
