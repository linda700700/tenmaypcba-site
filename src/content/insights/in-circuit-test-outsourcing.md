---
title: "What to do when your PCBA supplier does not run in-circuit test"
seoTitle: "PCBA Supplier Without In-House ICT: What to Do"
description: "If your assembler has no in-circuit test, the fixture still has to exist. Three arrangements, what each costs you, and four clauses that protect the order."
date: 2026-11-17
tags: Testing, Sourcing, Quality
summary: "Outsourcing the test step is workable if the fixture, the program and the per-serial record are all specified in writing. What you lose is same-day feedback; what you must never accept is a visual check standing in for electrical proof."
cover: "/assets/images/xray-inspection.webp"
coverThumb: "/assets/images/xray-inspection-thumb.webp"
coverAlt: "X-ray image of BGA solder joints on screen at the inspection station"
---

If your assembler does not run in-circuit test, the fixture still has to exist somewhere. The workable arrangement is a test partner who builds the fixture, runs the program and reports per serial number, managed by the assembler as one line on the quote. What you lose is same-day feedback. What you keep is a documented electrical record. What you must not accept is "we check it visually" standing in for electrical proof.

## Why ICT decides which assemblers can even quote

Two plants with identical placement equipment are not interchangeable the moment your BOM requires electrical test. In-circuit test needs a bed-of-nails fixture, a program derived from your netlist, and a tester — capital and engineering that a placement-focused plant often does not carry.

So the honest first question is not "how good are your lines" but **"who owns my test step"**. If the answer is "nobody, we just don't do it", you are not buying an assembly service, you are buying half of one.

## Three arrangements, and what each one actually costs you

| Arrangement | What it looks like | You gain | You lose |
|---|---|---|---|
| In-house ICT at the assembler | Fixture and program built and run on the same site | Same-day feedback, one PO, one schedule | Higher unit price; smaller plants rarely offer it |
| Partner test, managed by the assembler | Fixture built by a qualified test house, run there, results returned per serial, quoted as its own line | One commercial contact; test record still documented; assembly keeps its 50-piece minimum | Boards travel once more; feedback is hours-to-a-day, not immediate |
| Test at your own plant or your ODM | Boards ship untested electrically | Full control of test coverage and data | You carry freight, re-test logistics and the cost of catching defects late |

There is no fourth option. A visual-only release is not a test arrangement; it is an absence.

## How to specify the partner arrangement in a purchase order

When the test step is outsourced, the risk moves into the wording. Four clauses make the difference:

- **Fixture ownership.** State who owns the fixture and where it is stored. Owning it yourself is what makes a second source possible later.
- **Program source.** The test program derives from your netlist. Require it delivered to you, with the revision it was built against.
- **Record format.** Results **per serial**, not a pass/fail count. Ask for the columns before the first lot, not after.
- **Failure handling.** What happens to a board that fails — reworked how, logged where, re-tested by whom. A batch-level "reworked" note is not a record.

## What records to demand

For each lot, four documents. If any is missing, the test did not happen in any auditable sense:

1. First-article result with the fixture ID and program revision
2. Per-serial results file for the full lot
3. Failure log with the disposition of every failed board
4. The calibration status of the tester used, dated inside the lot window

## When ICT is genuinely unnecessary

ICT is not a virtue in itself. It is worth its cost when a fault is expensive to find later and cheap to find now.

- **Skip it** when the board is simple, the batch is small, and a functional check at your own bench catches what matters. A 50-piece run of a keypad board rarely justifies a fixture.
- **Skip it** when your product's real pass criteria live in firmware and mechanics, not in net continuity. A VFD is the clearest case: the drive's load test belongs with the drive builder, whose firmware defines pass and fail.
- **Never skip it** when the board is dense, double-sided, 01005 with 0.3 mm pitch, and the failure mode is an intermittent that only shows up in the field. On a robot vacuum mainboard, ICT is usually the requirement that decides which assemblers can quote at all.

That last point is why our own capability page states plainly that in-circuit and functional test are not run in-house. It costs us enquiries from buyers who need one roof. It saves the ones who would have found out at the tooling stage.

## What we do instead, here

Solder joints are covered inside the building: in-line 3D SPI before placement, AOI after reflow on every board, X-ray on BGA, QFN and power-device joints read by an operator rather than a green light, with images filed against the lot. Thickness, warpage and finish are checked on incoming bare boards. Every first article is photographed and filed.

What is not covered inside the building is electrical proof of function. That runs through a qualified test partner, coordinated by us, quoted as a separate line. We say so at quotation, not at shipment.

Table 03 on [capabilities.html](/capabilities.html) lists what each inspection step proves and where it stops. For the general shape of the problem, [what AOI and X-ray still cannot catch](/insights/what-aoi-xray-cannot-catch.html) is the companion note.
