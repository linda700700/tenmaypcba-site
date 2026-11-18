const e=`---
title: "Sharing a build stack between servo drives and VFDs"
seoTitle: "Servo and VFD Boards: One Build Stack or Two?"
description: "Servo drives and VFDs share a power stage, not a market. Consolidating them at one assembler is leverage until it becomes a single point of failure."
date: 2026-11-17
tags: Sourcing, Servo, VFD, Decision
summary: "One stack, two products, smaller batches. The saving is real; the risk is that a design nobody else can build becomes a supplier with pricing power."
cover: "/assets/images/case-servo.webp"
coverThumb: "/assets/images/case-servo-700w.webp"
coverAlt: "Servo drive unit with its enclosure open showing the power board, heatsink and encoder interface connectors"
---

A servo drive and a variable frequency drive are not the same product sold twice. A VFD holds a motor at a speed; a servo holds a motor at a position, and does it thousands of times a second. What they share is a power stage, a gate drive, an isolation barrier and a set of through-hole terminals carrying real current. In sourcing terms, they share a build stack.

## What is genuinely shared

| Element | VFD | Servo | Shared? |
| --- | --- | --- | --- |
| Power stage | IGBT bridge, DC bus, electrolytics | Often IGBT or MOSFET bridge, DC bus | Yes — same solder and thermal problem |
| Gate drive | Isolated, one per phase | Isolated, faster switching | Yes in structure, not in tuning |
| Encoder interface | Usually none, or a simple pulse input | Differential pairs, high-rate, noise-critical | No — servo only |
| Control | Speed loop | Position and velocity loop | Same silicon, different firmware |
| Terminals | Mains, motor, braking | Mains, motor, encoder, STO | Yes, and both are through-hole |

Two of the four boards in a typical servo — the power board and the control board with the encoder front end — land in the same process window as a VFD. That is why the families are usually built by the same kind of shop: heavy copper, thermal mass, through-hole terminals, conformal coating, batches measured in tens to hundreds of sets rather than thousands.

## The saving from one stack

Consolidating at one assembler buys three concrete things:

1. **One reflow profile development.** A power board with a thick copper pour and a row of electrolytics heats unevenly; the profile is developed per board, not inherited. If the servo power board is a variant of the VFD power board, part of that work carries over.
2. **One coating specification and one mask drawing.** Both families are usually conformally coated. One supplier, one coating material, one set of keep-clear zones.
3. **One conformance conversation.** If both product lines sit under the same quality system and the same documentation, an audit covers both.

At 50 sets to 500 sets per build, those three items are not a rounding error. They are frequently the difference between a quote that works and one that does not.

## Where the consolidation turns against you

The risk is not commercial, it is structural. If one assembler holds the stencil, the programme, the profile, the coating mask and the first-article history for both product lines, then moving the build means re-creating all of it somewhere else. That is a real barrier, and a supplier who understands it may price accordingly.

Three symptoms worth watching for:

- **The quote stops moving.** When a re-quote on a mature design comes back flat for two years while material moves, the setup has probably become rent.
- **The second source cannot be qualified in time.** Qualify a second assembler on the simpler of the two boards while volumes are low. It is much easier than doing it during a capacity crisis.
- **Documentation lives only at the supplier.** The stencil files, the profile and the mask drawing are your product's manufacturing definition. Ask for copies at every revision.

## The encoder front end is the servo-specific decision

Everything else in a servo drive is a VFD problem with tighter timing. The encoder interface is not. Differential pairs at high rate, a shield that has to be terminated at one end and not the other, and a connector that must survive a cable being pulled — that is a four-layer fine-pitch board with a specific routing requirement, and it is where a servo build fails first.

Practical consequences for the enquiry: ask for the encoder board's differential pair routing rules and the stack-up, not just the Gerber. If an assembler treats it as a digital board and routes it like one, the drive will run and then lose position under noise. That failure appears in the field, not on the bench, and it is expensive to attribute.

## When to split

- **Different batch bands.** If the servo runs at tens of sets and the VFD at hundreds, the changeover economics diverge and the split becomes natural.
- **Different customer segments with different audit needs.** A machine-tool buyer and a pump buyer do not ask for the same records.
- **You need a second source for supply security**, and it will only take one of the two products.

## What to put in the enquiry

- **Gerber, BOM, centroid and the stack-up** for each board.
- **Whether the servo power board is a variant of an existing design** — if it is, say what changed, because the profile development may be partially reusable.
- **Coating type and keep-clear zones**, and whether the encoder connector is coated.
- **The differential pair specification** for the encoder interface.
- **Both batch bands, stated separately.** This family normally runs 50 to 500 sets; a quote that assumes 500 will look wrong at 50.

The [servo drive page](/applications/servo.html) states the shared stack with the VFD family and the 50 to 500 set band. The [VFD page](/applications/vfd.html) covers the three-board set and the through-hole work, and the [HMI and PLC I/O family](/applications/hmi.html) has the same isolation-discipline problem in a colder thermal environment. For the commercial side of small batches, [why a fifty-piece run costs more per board](/insights/fifty-piece-run-cost.html) is the arithmetic.

Two products on one stack is a good position. The mistake is discovering, three years in, that it is a good position for one party only.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Review a drive board stack: [WhatsApp](https://wa.me/8617361058693)*
`;export{e as default};
