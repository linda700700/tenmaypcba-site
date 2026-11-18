const e=`---
title: "What a PCBA quote should contain — and what a bare number leaves out"
seoTitle: "What a PCBA Quote Should Contain: 11 Lines to Check"
description: "A single unit price hides the assumptions that decide the real cost. These eleven lines show whether a PCBA quote can be compared, or only admired."
date: 2026-11-17
tags: Quoting, Costing, Buying
summary: "Two quotes for the same board are rarely the same offer. The difference is in what each one leaves unsaid: test, yield, material ownership, and what happens when a part is short."
cover: "/assets/images/final-check-packing.webp"
coverThumb: "/assets/images/final-check-packing-thumb.webp"
coverAlt: "Completed boards being checked against paperwork and packed into trays before dispatch"
---

A unit price answers one question: what does one board cost. A buyer actually needs four answers — what is included, what is excluded, who carries the risk, and what makes the number move. A quote that gives only the first is not wrong; it is just not comparable to anything else.

## The eleven lines

Ask for these as separate lines, not folded into one number. A supplier who can produce them has quoted the job; one who cannot has given an estimate.

| Line | Why it changes the comparison |
| --- | --- |
| Quantity and revision | A price without the Gerber and BOM revision it belongs to cannot be re-ordered at the same number |
| Board specification | Layers, thickness, surface finish, copper weight. A quote that does not state it is quoting a default you have not seen |
| Component cost and ownership | Turnkey (supplier buys), consigned (you ship in), or mixed. This is the largest single variable and the one most often hidden |
| Component sourcing basis | Authorised distribution, or broker. Same part number, different traceability and different failure rate |
| Assembly charge | Placement and soldering, split by side if the board is double-sided |
| Setup and one-time charges | Stencil, programming, first-article. Whether they recur on a reorder matters more than the amount |
| Test and inspection | Which of SPI, AOI, X-ray, ICT, FCT are included, and which are extra |
| Yield and rework policy | Who pays for boards that fail inspection, and at what point a board becomes your loss |
| Coating, potting, conformal | Masking labour is real labour; the quote should say whether it is in or out |
| Packaging and documentation | Tray, ESD bag, desiccant, lot labels, first-article report |
| Validity and lead time | Component prices move; a quote with no validity date is not a commitment |

## Where the two numbers usually diverge

**Material ownership.** A turnkey price and a consigned price can differ by more than the parts, because turnkey carries sourcing risk, inventory and obsolescence. Comparing them without stating which is which is comparing two different products.

**Test scope.** SPI, AOI and X-ray inspect solder joints. They do not power the board. If one quote includes functional test and another stops at AOI, the cheaper one has not covered the same ground — and the gap is real work, not margin.

**Yield.** A quote that assumes 100% first-pass yield on a board that will not achieve it is a lower number with a hidden second invoice. Ask what happens to the boards that fail.

**Setup recurrence.** On a fifty-piece run the setup is a meaningful share of the unit price. Whether it is charged again on the reorder, and under what conditions, decides the cost of the second year rather than the first order.

## What to do with a quote you cannot compare

Send the same file and the same question to every supplier, and ask each one to answer in the same structure. Two effects follow: the numbers become comparable line by line, and the supplier who does not answer the structure tells you something useful before you spend a week on samples.

If a quote arrives as one number, the fastest useful reply is not a request for a discount — it is a request to break it into the lines above. On a real job that reply usually changes the number in both directions.

## What we put in a quote

We quote assembly, setup and inspection as separate lines, state whether the components are ours or yours, name the distributor when the part is critical, and say plainly when a test is not run here. On a family page, the panel headed *where we are the wrong shop* exists for the same reason: a quote that hides a mismatch costs both sides a month.
`;export{e as default};
