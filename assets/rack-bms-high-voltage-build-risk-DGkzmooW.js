const e=`---
title: "The rack BMS board spends its life at high voltage and nobody ever looks at it"
seoTitle: "Rack BMS and Cluster Controller PCBA: Where Build Risk Sits"
description: "A storage cabinet is a BMU per pack, a rack BMS and a cluster controller. Where build risk sits, and the four things an assembler cannot certify for you."
date: 2026-11-19
tags: Sourcing, BESS, Decision
summary: "The boards in a battery cabinet are judged years after they are built, by something nobody on the assembly floor can run. What that changes about spacing, connectors, contactors and records."
cover: "/assets/images/tht-selective-solder.webp"
coverThumb: "/assets/images/tht-selective-solder-thumb.webp"
coverAlt: "Selective solder nozzle working on through-hole terminals on a power board"
---

A battery cabinet is the one product family where the board is expected to do nothing for years and then work exactly once, under fault conditions, with somebody's insurance looking at the result. That changes what a buyer should be checking at the assembly stage, and it changes what an assembler can honestly claim. The [energy storage family page](/applications/bess.html) carries the process side of that argument; this note is about where the build risk sits.

The three boards in the cabinet are the BMU on each pack, the rack BMS that aggregates them, and the cluster controller that talks to the PCS and the site. The contactor driver and the sensing head that decide whether the cabinet isolates sit on one of those three or on a fourth board of their own.

## What is actually on each board

The **BMU** measures cell voltages and pack temperature, balances, and reports upward over an isolated bus. It is a small board, repeated sixteen to twenty-four times per rack, and it is the one board where a single assembly defect is multiplied by the count.

The **rack BMS** aggregates the BMUs, drives the contactors, reads current, and holds the state machine that decides when the cabinet is allowed to close. It carries the isolated sense front end, the contactor driver and the interlock inputs.

The **cluster controller** is the communication and coordination board — CAN to the PCS, Modbus or Ethernet to the site SCADA, and the logging that somebody will read after an event.

None of these is a difficult board to place. The difficulty is that all three live in a cabinet where the working voltage is hundreds of volts, and every one of them is only as good as the spacing and the connector it was built with.

## Creepage is your certifier's number, not ours

The sense lines that run from a 1000 V stack down to a 5 V ADC need spacing that comes from the standard your pack is certified against — IEC 62619 for industrial storage, UL 1973 in North America — and from your certifier's reading of it. That number belongs on your drawing and in your stack-up.

We build to that drawing, and we will tell you when a spacing looks unbuildable on this floor — 0.30 mm is the finest IC pitch we place, and a coated high-voltage gap is a different constraint from a pitch. What we cannot do is certify the clearance. A certificate on a cabinet is issued against a design, by a body, and an assembler is not that body.

This is the single most common misunderstanding in storage enquiries: the buyer asks whether we can build a board to IEC 62619, and the honest answer is that we can build a board that your certifier will accept, if the drawing already carries their numbers. Asking an assembler to supply the numbers is how a design gets to type test and comes back.

## The connector is where these cabinets actually fail

A rack BMS with twenty BMU drops has a twenty-way harness landing on it. Three things matter more than the board itself:

- **Keyed and latched.** A sense connector that can be plugged in one position off, or that backs out under vibration, is a fault that appears in year three, not at first power-on.
- **Strain relief at the board edge.** The harness in a cabinet is heavy and it hangs. A connector held only by its solder joints is a cold joint waiting for a service visit.
- **Masking during coating.** Coating a connector body instead of masking it is worse than not coating at all: the contact resistance changes and nobody knows.

All three are process decisions that have to be written into the build, not discovered at final inspection.

## THT, contactors and thermal mass

The contactor driver and the pre-charge path are through-hole and heavy copper. Reflow alone does not do this well; it is selective solder or hand solder with the thermal mass managed, and the joints are inspected visually and by pull on the first article.

The reason it matters here rather than on a consumer board is that these joints carry the current that opens the cabinet under fault. A joint that is 80 % filled is a joint that heats. On this floor that work runs in-house — it is one of the reasons a storage board is a comfortable fit rather than a favour.

## Coating: what it does, and what it does not

Conformal coating is standard on storage boards, and it is done here with connectors and test points masked by hand. It buys you condensation and pollution tolerance on a board that sits in a cabinet with a thermal management system that is not perfect.

It does not buy you an IP rating. A coated board in a flooded cabinet is a wet board. If your enclosure design depends on the coating for water ingress, the coating is being asked to do a job it was never specified for.

Potting and encapsulation are the other half of this conversation, and they are not done here. A BMU that has to survive pack-level vibration in a potted module is a different process, and it belongs with the module builder.

## What records we keep, and what they are worth later

Per lot: first-article photographs, SPI results before reflow, AOI results after, X-ray images on the power and QFN joints, and the coating record with the masking set used. Those are filed against the lot and stay retrievable.

Their value is entirely in the year-three question. When a cabinet trips and the investigation reaches the boards, "we built it and here is the X-ray of that joint" is a different conversation from "we have no record".

## Where this floor stops

Say it before the enquiry, not after the type test:

- **No high-voltage functional test.** We do not have a test bench that takes a rack BMS to working voltage and exercises the contactor sequence. That belongs to the cabinet builder, whose firmware defines pass.
- **No pack-level thermal or vibration qualification.** The chamber here takes boards, not modules, and it soaks rather than cycles.
- **No BMS firmware validation.** Balancing behaviour and state-of-charge accuracy are software and cell chemistry questions.
- **No IEC 62619 or UL 1973 certification.** See above.

## What to send for a quote

The BOM with the DNP and alternate parts marked, the board drawings with your creepage and clearance values on them, the stack-up if you have controlled impedance, the connector list with the mating half named, the coating callout including the mask list, and the quantity.

The scope line on the quote says what is and is not done here. If you need the high-voltage test as part of the order, tell us at enquiry and we will say so plainly rather than at the tooling stage.

For the cabinet-level companion board, the sensing head and trigger driver on the suppression panel, see [storage safety boards](/applications/storage-safety.html). The general question of what inspection actually proves is in [what AOI and X-ray still cannot catch](/insights/what-aoi-xray-cannot-catch.html), and the test-step decision is in [what to do when your assembler has no in-circuit test](/insights/in-circuit-test-outsourcing.html).
`;export{e as default};
