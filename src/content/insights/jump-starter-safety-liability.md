---
title: "Where liability sits on a jump starter with an air compressor"
seoTitle: "Jump Starter PCBA: Safety, Liability and the Quote"
description: "Two boards, a high-current switch, a compressor motor. The assembly is simple; what needs agreeing is who certifies what before a battery is connected."
date: 2026-11-17
tags: Sourcing, Jump Starter, Safety, Decision
summary: "A jump starter can destroy a vehicle's electronics if one switch fails. That risk has to be allocated in the paperwork, not assumed from a good build."
cover: "/assets/images/case-jump-starter.webp"
coverThumb: "/assets/images/case-jump-starter-700w.webp"
coverAlt: "Portable jump starter and air compressor unit with clamps, showing the internal high-current board and battery pack"
---

A jump starter with an integrated air compressor is two boards: a main board carrying the high-current MOSFET switch and the battery management, and a compressor drive board. Assembly is not the hard part. The hard part is that this product connects a lithium pack to somebody's vehicle electronics through a switch you built.

## The failure that matters is not a solder joint

If the high-current switch fails closed, the vehicle sees the jump pack's voltage at full current with no control. That is not a warranty event on a small appliance; it is damage to an ECU. Every other risk in this product is smaller than that one.

Which means the sourcing conversation is not primarily about placement capability. It is about the specification the board was built to, the evidence that the build matched it, and the written allocation of what happens if it does not.

## The two boards are not equally risky

| Board | What it carries | Process risk | Commercial risk |
| --- | --- | --- | --- |
| Main | MOSFET switch, BMS front end, protection comparators, reverse-polarity path | High-current joints, heat, through-hole terminals | The liability board |
| Compressor drive | Motor drive, pressure sensing input | Moderate current, simpler layout | Lower — a failure stops the compressor |

Both are built in the 100 sets to 1,000 sets band, and both are usually conformally coated because the unit lives in a car boot and gets damp. The main board is where the through-hole terminals and the high-current path live, and those joints carry current and mechanical load at once.

## What an assembler can and cannot certify

This boundary needs to be explicit, because buyers frequently assume more than an assembly house can offer.

| Item | Who owns it |
| --- | --- |
| Placement, reflow, coating, through-hole joints | Assembler |
| Conformance to an assembly standard (IPC-A-610 class as specified) | Assembler |
| X-ray of the MOSFET and high-current joints | Assembler, if specified |
| Cell-level safety of the battery pack | Cell supplier and pack assembler |
| Reverse-polarity and over-current behaviour of the product | Brand's design, verified by the brand's test |
| Product certification and market access | Brand owner |
| Field liability | Whoever the contract says — so write it |

None of that is evasive. It is simply that an assembly house builds a board to a drawing; it does not certify a product's safety behaviour. A supplier who implies otherwise is the one to be careful with.

## The high-current joints are the assembly-side control

The switch and its terminals are where a build defect becomes a safety event. Two things are worth specifying:

1. **X-ray on the MOSFET and the high-current terminals**, not just AOI. A void under a power device is invisible from the surface, and it is what turns a marginal joint into a hot spot.
2. **Through-hole fill criteria stated on the drawing.** A terminal pin wetted on one side passes continuity and heats under load. Say what fill percentage and what hole fill is acceptable, and say whether it is inspected by cross-section or by X-ray.

Coating comes after that, and the coating mask has to leave the terminals and the clamp contact area clear. On a damp-boot product, a coated terminal is a bad connection waiting to happen.

## What the reverse-polarity path changes

Most jump starters include protection against connecting the clamps backwards. That path involves either a relay, a MOSFET arrangement, or a fuse-and-diode scheme, and every version of it has a component that must fail safely.

Ask for the DFM note on that specific path. Not because the assembler designed it, but because if the protection depends on a part that is hard to solder or a thermal pad that needs voiding control, that has to be known before the stencil is cut rather than after a batch is built.

## What to put in the enquiry

1. **Gerber, BOM and centroid** for both boards, plus the stack-up for the main board.
2. **The current rating and duration** of the jump path, since that sets the copper and the joint criteria.
3. **The X-ray requirement**, named per component rather than as "standard inspection".
4. **Through-hole fill criteria** and the inspection method.
5. **Coating mask zones** — terminals and clamp contacts stay clear.
6. **Whether the unit is shipped with the battery installed**, because that changes packing, transport classification and the final inspection step.

The [jump starter page](/applications/jump-starter.html) states the two-board split, the high-current switch and terminal arrangement and the batch band. The [e-bike controller](/applications/ebike.html) carries the same heavy-current-beside-logic problem with a potting mask on top, and the [LED driver](/applications/led-driver.html) is the other family where a through-hole joint is the classic field failure. [What AOI and X-ray cannot catch](/insights/what-aoi-xray-cannot-catch.html) explains why the high-current joints need the X-ray rather than the camera.

The build is ordinary. The allocation of risk is not — write it down before the first batch, not after the first claim.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Discuss a high-current board build: [WhatsApp](https://wa.me/8617361058693)*
