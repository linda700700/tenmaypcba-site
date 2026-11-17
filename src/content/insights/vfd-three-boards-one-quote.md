---
title: "Quoting a VFD as three boards or as one set"
seoTitle: "VFD Assembly: Quote the Three Boards or the Whole Set?"
description: "A drive is a control board, a power board and a keypad. Quoting them as separate lines and as one set answer different questions, and buyers usually need both."
date: 2026-11-17
tags: Sourcing, VFD, Costing, Decision
summary: "Line-by-line tells you where the money is; set pricing tells you what a drive actually costs to build. Ask for both, then decide which number you are managing."
cover: "/assets/images/case-vfd.webp"
coverAlt: "Variable frequency drive with its cover removed showing the control board, IGBT power stage and DC bus capacitors"
---

A variable frequency drive is three boards with three different process profiles: a control board with isolated gate drive, an IGBT power board carrying the DC bus and current sensors, and a keypad board. A drive missing one board is not shippable. That single fact drives the whole quoting decision.

## Two ways to price the same build

| Approach | What it answers | Where it misleads |
| --- | --- | --- |
| Three separate lines | Where the cost sits: which board carries the through-hole work, which carries the coating, which is trivial | You cannot tell what a shippable drive costs |
| One set price | What a drive costs to build and ship | It hides an expensive board inside a blended number |
| Both, with the set as the commercial unit | Everything above | Nothing much — it just takes more paper |

Buyers usually ask for one or the other. The useful enquiry asks for both, because they support different decisions: the line breakdown is what you need to redesign cost out, and the set price is what you need to plan a purchase order.

## Why the set is the real unit

The keypad board is small and cheap until it is not. Membrane tails, a segment or dot-matrix driver and one harness connector: low value, high nuisance. A wrong footprint there turns into a hand-reworked batch and the drive still cannot ship.

Compare that with the power board, which may run up to the largest panel this floor handles and carries the IGBT stage, the DC-bus electrolytics and the current sensors. It is heavy copper, large thermal mass, through-hole terminals and bus bars that must be soldered without cooking the devices beside them.

Three boards, three very different cost drivers, one shipment. If a supplier quotes you a keypad price and a power board price but cannot state a set price, they have not priced the thing you are buying.

## The reorder question is where set pricing pays

On drives, the demand shape is not consumer growth. It is spare-board and maintenance orders arriving in tens and hundreds rather than thousands, and a build measured in days rather than weeks. The buyer's real question is "how fast can I restock a drive", not "what is the cheapest board".

Which is why the first-order quote and the reorder quote should be separated in the paperwork. The band here is 50 sets to 500 sets. The first order pays for stencil, programme, profile development and first-article approval. The reorder, on an unchanged revision, does not. A supplier who keeps the programme and the approval on file can quote a reorder against that same revision, and the number drops for a reason that is visible rather than negotiated.

## What the through-hole content does to the price

Drives carry terminal blocks, relays and bus connections that have to be hand or selectively soldered. A pure placement house subcontracts exactly this step, which is why drives are a comfortable fit for a floor that runs it in-house and a poor fit for one that does not.

Two questions expose this quickly:

- **Is the through-hole work done in-house, or subcontracted?** If subcontracted, the schedule has a second party in it.
- **Is conformal coating done in-house?** Drives usually specify it; masking connectors and test points by hand is real labour, not a rounding error.

## What inspection proves here, and what it does not

SPI runs before reflow on the fine-pitch side, AOI after reflow, and X-ray on the IGBT and thermal-pad joints where voiding under a power device is invisible from the surface and presents later as a hot drive.

What none of it proves is that the drive works. In-circuit and functional test with a load bank are not assembly operations — the pass criteria belong to the firmware and the motor. If your process requires full functional test at the assembler, that is a different supplier category, and saying so early saves both sides a month.

## What to put in the enquiry

1. **Gerber, BOM and centroid** for all three boards, plus the stack-up for the power board.
2. **Which board runs to the largest panel size**, so the line assignment can be confirmed against the size limit.
3. **The coating requirement** and which connectors and test points must stay clear.
4. **First-order and reorder quantities separately**, since they are priced differently and honestly so.
5. **Whether a set price is available**, in addition to the three lines.
6. **Whether functional test is expected at the assembler.** Ask it explicitly; do not let it be discovered at handover.

The [VFD and inverter page](/applications/vfd.html) states the three-board split, the batch band and the standard build time from kitted parts. The [servo drive family](/applications/servo.html) shares the power stage and adds an encoder front end, and the [treadmill control board](/applications/treadmill.html) is the other family where the largest board size is the deciding capability. [Why a fifty-piece run costs more per board](/insights/fifty-piece-run-cost.html) is the arithmetic behind the first-order versus reorder gap.

Ask for the set price. Then ask what the second order costs. The two numbers together tell you more about a supplier than either one alone.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Send a drive board set for quoting: [WhatsApp](https://wa.me/8617361058693)*
