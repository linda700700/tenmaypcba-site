---
title: "Should you buy the e-bike controller and display from one assembler?"
seoTitle: "E-bike Controller and Display: One Supplier or Two?"
description: "Splitting the controller and the display across two assemblers is often right. What it costs is a harness nobody owns, unless you write the drawing yourself."
date: 2026-11-17
tags: Sourcing, E-bike, Decision
summary: "Two boards, one shipment date, two different revision rhythms. The split is usually the right call; the mistake is leaving the harness drawing with a supplier."
cover: "/assets/images/case-ebike.webp"
coverThumb: "/assets/images/case-ebike-700w.webp"
coverAlt: "E-bike controller with heatsink and sealed enclosure beside a handlebar display unit and its cable harness on a light work surface"
---

An e-bike controller is a 6S to 13S battery management stage, a MOSFET bridge and an MCU in a sealed box; the display is a thin double-sided board on the handlebar. They leave the factory on the same date, which makes them look like one product. They are not. They change for different reasons at different times, and that is what decides whether one assembler should build both.

## The two boards move on different clocks

The controller changes when the battery or the motor changes. That is a hardware decision, taken once per platform, and it can sit still for two years. The display changes when the brand wants a new look, a new button layout, or a new model-year badge — a decision taken in marketing, sometimes annually.

Put both boards on one approval cycle and the fast one waits for the slow one. That is the real argument for splitting them, and it has nothing to do with price.

## What a split buys and what it costs

| Decision | One assembler for both | Two assemblers |
| --- | --- | --- |
| Approval cycle | Coupled — a display restyle reopens the controller file | Independent, one file each |
| Quote lines | Usually bundled into one set price | Two unit prices, comparable across suppliers |
| Harness ownership | Someone at the assembler already has the drawing | You own the drawing, or nobody does |
| Minimum order | One setup shared across both boards | Each board carries its own setup cost |
| Schedule coupling | Both boards slip together | A slip on one does not stop the other shipping |
| Field-failure arbitration | One party answers for the complete unit | Two parties, and the harness in between |

The last row is the one buyers underestimate. When a unit fails in the field and the controller and display came from different shops, the first two months are usually spent establishing whose board it was. That cost is real and it does not appear on any quote.

## The harness is the joint that cannot be split

The controller end of an e-bike harness carries one wire per cell tap plus the motor phases and the hall signals. A single transposed tap reads to the BMS as a cell fault — or, worse, as nothing at all until a cell drifts months later. The connector keying will not save you, because the same crimp housing accepts the wrong order.

Two rules follow. First, the harness drawing has a named owner before the first batch, and if the boards are split that owner is the buyer, not either assembler. Second, wire order is verified against the drawing at first article rather than assumed from the connector.

An assembler who builds both boards can own that drawing and it stays coherent. Split the boards and you have taken on a document you may not have the resource to maintain — which is a perfectly good reason to keep them together.

## When one assembler is the better answer

Keep both boards in one place when most of these are true:

- Both boards sit in the same batch band, for example the 200 sets to 2,000 sets this family is normally built in.
- Both ship on the same container date and a slip on one would stop the other anyway.
- The unit is potted or fully coated, and you want one coating specification and one mask drawing rather than two.
- You do not want to hold the harness drawing, or you do not have an engineer who can own it.

Split them when the display is cosmetic and versioned independently, when the two boards would naturally land in different batch bands, or when you already hold the interconnect documentation.

## What to put in the enquiry

Whether you split or not, the enquiry needs the same five things, and all five change the price:

1. **Gerber, BOM and centroid** for each board, as separate files even if they share a purchase order.
2. **The pack series range** the controller must support, from 6S to 13S. A 13S board has more sense channels and a different connector, so it is not the same quote as a 6S board.
3. **Coating or full potting**, and which connectors, terminals and programming pads must stay clear. This is a mask drawing, not a sentence in an email.
4. **What the display must survive** — clamp torque, handlebar water, the harness pull — because the field failures in this family are mechanical, not solder joints.
5. **Whether the display is on the same purchase order.** If it is, say so; a supplier quoting them together can price the shared setup, and one quoting separately cannot.

The [e-bike and e-scooter controller page](/applications/ebike.html) states this floor's batch band, pack range and in-house coating capability. Two families that share the same problem — a heavy-current board beside a light logic board — are the [jump starter](/applications/jump-starter.html) and the [treadmill control board](/applications/treadmill.html). If the split is being driven by small quantities rather than by revision speed, [why a fifty-piece run costs more per board](/insights/fifty-piece-run-cost.html) shows which part of the gap is real and which is not.

Send the files and ask for a separate line per board. Even if you intend to buy both from one shop, the two lines tell you what the split would cost — and that is the number the decision actually turns on.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Questions on a specific board: [WhatsApp](https://wa.me/8617361058693)*
