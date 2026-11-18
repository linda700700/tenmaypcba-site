const e=`---
title: "What an EVSE control board audit actually asks for"
seoTitle: "EVSE Control Board Assembly: The Audit Record Set"
description: "On a charging point the certification depends on the build being repeatable, so the audit asks for records rather than capability. Here is the file to demand."
date: 2026-11-17
tags: Sourcing, EVSE, Compliance, Decision
summary: "Unit price is the wrong first question on a safety-related board. The right one is whether the assembler can produce a record set that ties one serial to one lot."
cover: "/assets/images/case-evse.webp"
coverAlt: "EV charging control board in its enclosure with the contactor, metering module and residual-current sensing circuit visible"
---

An AC charging point is a control board doing three safety jobs at once: generating the pilot signal that tells the vehicle how much current it may draw, detecting residual current including the smooth DC component a vehicle charger can inject, and driving the contactor that connects mains to the vehicle. Certification sits with the brand owner. The board is where the evidence is generated.

That inversion is the whole sourcing story for this family. On a consumer board, price leads and records follow. On an EVSE control board, the record set is the product, because without it the brand cannot produce the certification file.

## Why the audit comes before the order

Buyers in this category usually audit process records before placing a first order. The reason is structural: a charging point is type-tested once and then built for years, so the certificate is only as good as the assumption that every unit matches the tested sample. If the build drifts, the certificate does not automatically follow.

An audit therefore asks a different question from a capability questionnaire. Not "can you place 01005" but "show me that this board, built last month, can be tied back to its lot, its profile and its coating".

## The record set, item by item

| Record | What it proves | Who generates it |
| --- | --- | --- |
| Reflow profile, archived per shift | The thermal process that made the joints | Assembler |
| AOI and X-ray results by lot | Inspection was performed and passed | Assembler |
| Programming checksum | The firmware in the unit is the one tested | Assembler or brand, by agreement |
| Coating material, batch and thickness | The barrier is as specified | Assembler |
| Serial-to-lot mapping | This unit came from this build | Assembler |
| Material traceability | Components match the approved BOM | Assembler with supplier CoCs |
| Calibration certificates for metering | The meter is accurate to a stated tolerance | Not the assembler |

The last row is where buyers most often discover a gap mid-audit. Metering accuracy is a calibration function, and an assembly house that builds the metering board does not thereby calibrate the meter. If the product makes an accuracy claim, that evidence comes from a calibration process, not from an assembly record.

The second-to-last row is the one that is cheap to provide and expensive to reconstruct. If the assembler does not capture serial-to-lot at build, there is no retrospective way to create it.

## Isolation is held by process, not by layout

The design constraint on this family is isolation and residual-current sensing. Mains, the pilot signal and the low-voltage control side must stay separated by the distances the standard requires, while the contactor carries both current and heat. EVSE boards often look sparse and cost more than their area suggests, because the distance is the design.

Assembly can compromise all of it: coating bridging the barrier, solder balls in a slot, contactor joints that are through-hole and carry load, a current-sense path contaminated by flux. These are process controls, and on this family they are the first thing an audit looks at — which is exactly why the record set and the isolation argument are the same argument.

## Where a high-mix floor fits

This family is normally built in 100 sets to 1,000 sets. The market is regulated and moves slowly: a model is certified once and built for years, revisions come from a standards change or a new communications module rather than from fashion. Small batches, stable part numbers, and a buyer who values a repeatable build over the last fraction of a cent.

That is a good shape for a mixed-production floor, and a poor shape for a plant optimized around a single high-volume product. The point worth being explicit about: on this family the sales argument is process discipline, not price. A supplier who competes on unit price here has probably not understood what is being bought.

## What to put in the enquiry

1. **Gerber, BOM and centroid**, plus a drawing that marks the isolation barrier and the slot geometry.
2. **The standard you are certifying to**, so the assembler knows what the record set has to support.
3. **The record list you will audit against** — send it before the quote, not after the order.
4. **Whether the metering calibration is yours or a third party's**, because it changes where the board ships to next.
5. **The batch band and the expected model life**, since a stable multi-year build is what makes the documentation investment pay.

The [EV charging point control board page](/applications/evse.html) states the batch band, the isolation constraint and what this floor does and does not issue. The [HMI and PLC I/O family](/applications/hmi.html) has the same isolation discipline without the safety file, and the [portable power station](/applications/power-station.html) shows the same coupling between a board set and a single certificate. [What AOI and X-ray cannot catch](/insights/what-aoi-xray-cannot-catch.html) sets out where the inspection record stops being useful as evidence.

A supplier who says yes to everything and then hands over a thin file costs a certification cycle, not a batch. Ask for the file first.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Request the record set for an EVSE build: [WhatsApp](https://wa.me/8617361058693)*
`;export{e as default};
