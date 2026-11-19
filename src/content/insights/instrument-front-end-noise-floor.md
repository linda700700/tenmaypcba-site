---
title: "An instrument board is fifty to five hundred pieces, and most of them are a revision"
seoTitle: "Test Instrument PCBA: Small Batches, Front-End Noise"
description: "Front end, control and panel boards at fifty to five hundred sets, where assembly decides the noise floor and metrology decides the number on the datasheet."
date: 2026-11-19
tags: Sourcing, Instruments, Decision
summary: "Bench instruments are low volume, revision-heavy and analogue. What the assembly step decides about noise, and the calibration that never happens in this building."
cover: "/assets/images/scene-instruments.webp"
coverThumb: "/assets/images/scene-instruments-700w.webp"
coverAlt: "Benchtop test instruments on a workbench, a waveform on the screen of the unit in front, knobs and BNC sockets with probes connected"
---

A bench instrument is the kind of product where the buyer is an engineer who will notice a 2 µV offset and write about it. The boards are two or three: a front end, a control board, and a panel with the encoder and the display. Volumes are fifty to five hundred sets, and a good share of those orders are revisions rather than repeats.

That combination — low volume, high scrutiny, constant revision — decides what the supplier relationship has to look like, and it is not the same relationship that suits a consumer product.

## Small batches are the product, not a phase before volume

Instrument makers sometimes apologise for ordering fifty. There is nothing to apologise for: fifty pieces with four revisions a year is a normal instrument programme, and it is the shape this floor is built for. The cost structure is the one described in [why fifty pieces cost more per board](/insights/fifty-piece-run-cost.html) — setup amortised over fifty, not over five thousand.

What makes it work is that the revisions are cheap. A stencil change and a re-profile on a fifty-piece run is a few hundred dollars; the same change on a five-thousand-piece run with tooling and test fixtures is a different conversation. A supplier who cannot do a fifty-piece revision economically will make you live with the design you have, which is worse for the instrument than the unit price is good.

## The front end is where assembly decides the noise floor

The analogue front end is a guarded, high-impedance, low-noise circuit, and the assembly contribution is decided by four things:

- **Cleanliness.** Residue across a guard ring is leakage, leakage is offset drift, and drift is a calibration failure six months later.
- **Thermal symmetry.** Two halves of a differential front end in different thermal environments read differently; the layout decides, but the reflow and the coating can make it worse.
- **Coating callout.** Coating over a sensitive divider changes its behaviour with humidity, sometimes for the better and sometimes for the worse — but never by accident.
- **Relay and switch joints.** Range switching relays and BNC sockets are through-hole and mechanically loaded, and they are the parts that get replaced in a service life measured in decades.

None of that appears on a placement report. All of it appears in a specification that says what is masked, what is washed, and how the joint is made.

## Relays, BNCs and the hand-work instruments still need

Instruments carry parts that no placer can handle: relays with large footprints, BNC and banana sockets, sometimes a rotary switch. Those are through-hole, often with a mechanical fixing to the panel, and the joint quality is inspected visually and by pull on the first article rather than by an AOI pass.

Where this matters is repeatability across revisions. If the through-hole work is redone by hand each time without a written method, revision three and revision five are different products that share a Gerber. That is the kind of drift that shows up as "the new batch doesn't match the reference unit".

## Calibration, accuracy and the parts that are not ours

The number on the datasheet is a metrology claim. It is produced by a calibration chain with references traceable to a national standard, and it does not exist in this building:

- **No calibration, no accuracy or uncertainty statement.**
- **No in-circuit or functional test of the finished instrument.**
- **No EMC or safety qualification.**
- **No potting or full encapsulation of the front end.** Coating is what this floor does.

What is delivered is boards assembled and recorded to a drawing, with first-article evidence and per-lot inspection data, so that your calibration step starts from a known build.

## What to send for a quote

Gerber with the stack-up, the BOM, the centroid, the through-hole parts list with the mechanical fixings, the coating and mask drawing with the guarded areas marked, and the quantity including the revision cadence if you want the reorder priced sensibly. At 50 to 500 sets a build is three working days from kitted parts.

The family page is [test and measurement instrument boards](/applications/instruments.html). For why a reorder prices differently, [why the second run costs less](/insights/why-the-second-run-costs-less.html), and for the DFM check that saves a stencil, [what a DFM review catches](/insights/dfm-review-before-the-stencil.html).
