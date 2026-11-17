---
title: "Why the second run costs less than the first — and where that stops"
seoTitle: "Why a PCBA Reorder Costs Less Than the First Run"
description: "Setup, programming, stencil and first-article approval are paid once. What carries over to a reorder, what is charged again, and what cancels the saving."
date: 2026-11-14
tags: Costing, Reorders, HMLV
summary: "A reorder is cheaper because the fixed work is already done, not because the supplier likes you. Four things must stay unchanged for that to hold."
cover: "/assets/images/feeder-kitting.webp"
coverThumb: "/assets/images/feeder-kitting-thumb.webp"
coverAlt: "Operator checking component reels against a printed BOM before loading them onto a feeder cart"
---

On a fifty-piece run, the one-time work is a large share of the unit price. On the same job a second time, most of it has already been paid. That is the whole mechanism — and it has conditions. When one of the conditions breaks, the saving disappears and buyers are usually surprised by how completely.

## What carries over

| Item | Carried over | What can cancel it |
| --- | --- | --- |
| Stencil | Yes, while the apertures are unchanged | Any change to pad geometry, or a worn stencil past its usable life |
| SMT programme | Yes, while the placement data is unchanged | Moving a part, changing a package, or a rotated footprint |
| Reflow profile | Yes, while the board construction is unchanged | Layer count, copper weight, or a large change in thermal mass |
| First-article approval | Yes, for the same revision | Any revision change, or a long gap that triggers a re-qualification |
| Kitting knowledge | Partly | A BOM change, or a part that was sourced from a specific distributor |
| Setup and changeover | **No** | Charged again on every run, because the line is reconfigured either way |

The last row is the one buyers misread. Setup is not a one-time charge that disappears on a reorder; changeover happens every time the line starts your job. What disappears is the *engineering* — the stencil, the programme, the profile development, the first article.

## The four things that must stay unchanged

**Same revision.** One resistor value change is enough to require a new stencil check, a re-verification of the programme and a fresh first article. It may be a ten-minute change at your desk and a re-qualification at the factory.

**Same process.** Switching a board from a single-sided to a double-sided build, or adding conformal coating, changes the routing, not just the price.

**Same supplier.** This is the honest one. Your stencil, programme and profile live with the factory that built the job. Moving to a cheaper supplier resets the engineering clock to zero, which is why a supplier switch on a mature product often costs more in the first order than it saves in the second.

**Same or equivalent material.** If a component goes on allocation, the reorder can be blocked at kitting even though nothing about the board changed. Naming an approved alternative on the BOM is the cheapest insurance available.

## Where the saving stops

Two limits are worth stating before a buyer plans around them.

**Volume.** Below roughly fifty pieces the setup and first-article work dominates, and the reorder saving is proportionally large. Above a few thousand pieces a month, a dedicated high-volume line with cheaper hourly rates starts to win on unit price, and the reorder advantage of a high-mix floor stops being the deciding factor.

**Product life.** A board that is revised twice a year never reaches the cheap state. The reorder saving assumes a design that has settled, and part of the value of a DFM review is getting a design to that state before the first order rather than after the third.

## What to ask for on a reorder quote

Ask for three things in writing: whether the stencil is still in usable condition, whether the programme and profile are the current revision, and whether any line on the BOM has moved to allocation since the last run. Those three answers determine whether the second price is a real reduction or an optimism.

We keep tooling and setup files against the customer's revision, and we quote the reorder against the same revision that was built. When a revision changes, the reorder is quoted as a first run, because that is what it is.
