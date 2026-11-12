---
title: "What is HMLV in PCBA — and when does it cost more than high volume?"
seoTitle: "What Is HMLV in PCBA? Definition and Cost Impact"
description: "HMLV means high-mix, low-volume PCBA: many part numbers, small batches each. What it changes, when it costs more than volume builds, and when it does not."
date: 2026-11-07
tags: HMLV, Costing, Production
summary: "HMLV is a production model, not a batch size. The cost difference comes from setup amortisation and changeover time, and both can be measured."
cover: "/assets/images/feeder-kitting.webp"
coverThumb: "/assets/images/feeder-kitting-thumb.webp"
coverAlt: "Operator loading a component reel onto an SMT feeder cart, with racks of reels behind"
---

HMLV stands for high-mix, low-volume. It describes a production model where a factory runs many different products in small batches, rather than one product in large batches. The cost of HMLV comes from setup and changeover being repeated far more often; the benefit is that a small order can be built at all.

## Is HMLV a quantity, or a model?

It is a model, and quantity is only one signal of it. The defining feature is **how often the line stops and reconfigures**. A factory building eighty different assemblies a month in batches of fifty is HMLV. A factory building one assembly in batches of fifty thousand is not, even though some of its individual orders are small.

The practical consequence: HMLV work is priced on *reconfiguration*, not on board area. If you ask for a quote and the reply is built from square centimetres and component count, it is a high-volume quote wearing a small-batch hat.

## Where the extra cost actually sits

Four activities repeat once per order rather than once per batch of ten thousand:

| Activity | When it happens | Scales with quantity? |
| --- | --- | --- |
| Stencil fabrication | Once per assembly revision | No |
| Machine programming and feeder setup | Once per assembly | No |
| First-article inspection and sign-off | Once per assembly | No |
| Component kitting and verification | Once per order | Partly |

Add changeover — unloading the previous product's feeders and loading the next — and you have the whole difference. Solder, components and placement time per board are close to identical between a fifty-piece run and a fifty-thousand-piece run.

## So how much more does a small batch cost per board?

The arithmetic is simple once the fixed part is known. Suppose a setup consumes four hours of line time before the first board is placed. Spread over fifty boards, that is 4.8 minutes of setup per board. Over five thousand boards, it is 2.9 seconds.

That is the entire mechanic. The percentage uplift depends on how much assembly time each board needs — a dense board with two hundred placements dilutes setup faster than a simple one — which is why a per-board price quoted without knowing the batch size is guesswork.

## When does HMLV *not* cost more?

Three cases:

1. **When the product never changes.** If the same assembly repeats every month, the stencil and programme are already on file, and only the kitting repeats. The fixed cost has effectively been paid.
2. **When volume would create inventory you cannot sell.** A ten-thousand-piece run halves the unit price and doubles the capital tied up in finished goods. For a product with uncertain demand, the cheaper unit price is the more expensive decision.
3. **When the design is still moving.** Re-running a large batch after an engineering change is the most expensive outcome in this business. Small batches absorb revisions.

## What to ask a supplier to find out which one you are buying

- Which of the setup steps are charged separately, and which are absorbed?
- Is there a price break, and at what quantity does it start?
- If the same assembly is reordered next quarter, what does the second run cost compared with the first?

That last question separates a genuine HMLV operation from one that simply tolerates small orders at a penalty. A factory set up for mixed production keeps the programme and the stencil, so a repeat order should not pay the full setup again.

## What this looks like on a real line

At the Shenzhen facility of Shenzhen Tengmei Technology, high-mix work is the normal case: eight Yamaha YSM20/YSM10 lines, batches from fifty pieces, and feeder carts loaded per order. The visible cost of HMLV is the kitting bench — the reels being loaded in the photograph above — because that is where changeover becomes labour.

If you want the process side of this rather than the commercial side, the [assembly](/assembly.html) page covers what runs in line, and [capabilities](/capabilities.html) lists the placement limits that decide whether your design fits a small-batch line at all.
