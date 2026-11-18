const e=`---
title: "What is inside a PCBA price — the five lines, and which ones move with quantity"
seoTitle: "What Is Inside a PCBA Price? The Five Cost Lines"
description: "A PCBA price has five parts. Only two scale with quantity, and one of them is not the assembly. Why 50 pieces cost more per board without overcharging."
date: 2026-11-17
tags: Costing, Quoting, Buying
summary: "Bare board, component pass-through, placement points, tooling and testing. Four of the five behave completely differently when you negotiate, which is why a collapsed total cannot be audited."
cover: "/assets/images/feeder-kitting.webp"
coverThumb: "/assets/images/feeder-kitting-thumb.webp"
coverAlt: "Operator loading component reels onto a feeder cart before a production run"
---

A PCBA price has five parts: bare-board fabrication, component pass-through, placement points × rate, tooling and NRE, and testing. Only two of the five genuinely scale with quantity, and one of them is not the assembly. That is why a 50-piece run costs more per board than a 5,000-piece run without anyone overcharging you.

## The five lines

| # | Line | Driven by | Scales with quantity? |
|---|---|---|---|
| 1 | Bare-board fabrication | Layer count, material, copper weight, board size, surface finish | Partly — panel utilisation improves, but fab has its own minimums |
| 2 | Component pass-through | Your BOM, at distributor prices on the quoting date | Weakly — reel and order-multiple minimums dominate small batches |
| 3 | Placement points × rate | Number of placements, fine-pitch content, through-hole content | Yes — rate steps down as batch volume rises |
| 4 | Tooling and NRE | Stencil, machine program, fixture, panelisation | No — fixed per job, per revision |
| 5 | Testing and QA | Inspection coverage, programming cycles, fixture-based test | Partly — test time per board is roughly constant |

A quote that collapses these into one number cannot be audited. You cannot tell whether a difference came from the board, the parts, the placement rate or the setup — and those four have completely different negotiating dynamics.

## Which costs are fixed per job, and why that matters at small volume

Four things are charged once, whatever the batch size:

- **Stencil** — laser-cut, per revision. Changes when the paste layer changes.
- **Machine program and feeder setup** — per product, per revision.
- **First-article inspection** — a real cost in engineering time, not a formality.
- **Panelisation and tooling** — agreed at DFM, fixed for the revision.

Divide four fixed costs by 50 and each board carries a hundred times the setup of a 5,000-piece run. Divide them by 5,000 and they almost disappear. Nothing about the assembly itself changed.

This is the honest explanation of why small batches cost more per board — and it is also why **no repeat NRE on an unchanged Gerber and BOM revision** is worth more than a few percent off the unit rate. On a reorder, line 4 goes to zero. On a first order, it does not.

## Where reel minimums break the arithmetic

The most under-estimated line is components. Two mechanisms:

- **Reel and order multiples.** A part may only be sold in a reel of 3,000. You need 47. You buy 3,000, or you buy the reel minimum the distributor offers. The unused remainder is either stocked for you or lost.
- **Line-item minimums per part number.** Many distributors price a line, not just a part. A BOM with 180 part numbers has 180 chances to hit a minimum.

Which is why a BOM review matters before the quote, not after: consolidating to approved equivalents, and flagging long-lead or end-of-life parts early, changes the numbers more than negotiating the placement rate usually does.

## What a quote should show to be checkable

Six things. If a quote is missing more than two, treat the total as an estimate rather than a price:

1. **Bare board broken out** with layer count, material and finish
2. **BOM line by line**, with the distributor and the price used on the quoting date
3. **Placement points counted**, not estimated, with fine-pitch and through-hole content shown
4. **Tooling and NRE as its own line**, with what it covers and whether it recurs
5. **Test scope named** — what is inspected, what is electrically tested, and by whom
6. **Assumptions written down** — quantity, revision, lead time basis, what is excluded

The last one is the one buyers skip, and it is the one that causes the argument later. "Lead time three days" means nothing until it says *from kitted parts*, and separately states the component lead time.

## How we quote, as a worked example of the structure

Every quotation we send is itemised against those five lines, with the BOM showing the distributor and the unit price used on the day of quoting. Parts are bought through franchised channels or factory allocation where the part requires it. Shortage lists go out within one working day, and no substitution happens without written approval.

Reorders with an unchanged Gerber and BOM revision carry no repeat NRE. Lead time is stated as three working days from kitted parts, with component lead time called out separately, because that is usually what sets the real shipping date.

If a part can be bought cheaper on the same terms and date, the quote is reworked before the order is placed. That is a checkable promise: you can compare the BOM line against a distributor price yourself.

This note explains price structure, not price levels — those move with quantity, parts and date, and a number printed here would be wrong by the time you read it. For why the fixed lines hurt most at small volume, see [why a fifty-piece run costs what it does](/insights/fifty-piece-run-cost.html). For how to order at that size without paying for avoidable work, see [ordering fifty pieces of PCBA](/insights/fifty-piece-pcba-order.html).
`;export{e as default};
