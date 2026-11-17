---
title: "Buy a certified HMI module, or assemble the board yourself?"
seoTitle: "HMI and PLC I/O: Buy the Module or Assemble the Board?"
description: "A module arrives with its isolation certified; a bare board leaves the barrier to you. The choice decides who answers for a field fault."
date: 2026-11-17
tags: Sourcing, HMI, Isolation, Decision
summary: "The board is cheaper and the liability moves to you. On a product whose selling point is isolation, that transfer is the whole decision."
cover: "/assets/images/case-hmi.webp"
coverAlt: "Industrial HMI panel with its rear cover off, showing the carrier board, display connector and isolated I/O terminals"
---

An industrial HMI, a protocol gateway and a PLC I/O module are all the same commercial question in different packaging: do you buy a module that arrives with its isolation already certified, or a board that arrives with the isolation designed and built but not certified? The answer decides who answers for a field fault.

## The module and the board do not sell the same thing

A module is a product. It comes with a datasheet, an isolation rating, a stated withstand voltage, a CE or UL file and a warranty. When a customer's cabinet fails a dielectric test, the module vendor answers.

A board is a component. It comes with an inspection report and a conformance statement to an assembly standard. When the customer's cabinet fails a dielectric test, the answer depends on whether the failure was the design, the assembly or the customer's own wiring — and establishing which one is your problem, not your assembler's.

That difference is worth more than the price gap on most of these products, which is why the module market exists at all. It is also why buyers who assemble their own boards generally do so for one of three reasons: the I/O count is unusual, the form factor must fit an existing enclosure, or the volume justifies the certification work.

## Where the risk actually concentrates

| Sub-assembly | What can go wrong in assembly | Who owns it if you buy a module |
| --- | --- | --- |
| Isolated I/O channels | Coating bridges the barrier; flux never washed out of the gap | The module vendor |
| Communications | Transformer or opto placement, magnetics orientation | The module vendor |
| Display and touch | Connector lift, flex damage, pressure on the glass | The module vendor |
| Carrier to I/O board joint | Castellated or board-to-board joint with a hidden fillet | The module vendor |
| Everything on this list | — | **You**, if you assembled the board |

The first row is the one that matters most on this family. The design constraint for an HMI or PLC I/O board is isolation spacing, not density — the board looks sparse because the distances are the design. Assembly can quietly compromise all of it: a solder ball in an isolation slot, flux residue that was never washed, a coating sprayed across the barrier. Each reduces a distance that was calculated for a stated pollution degree.

This is a process-control family, not a placement family. A dense board fails visibly; an isolation failure shows up as a dielectric test result or, worse, a field event.

## The one place the board wins clearly

If your product must fit an existing enclosure or carry a non-standard channel count, the module does not exist and the question is moot. Custom I/O is where assembling your own board is the only route, and where the certification work is a deliberate cost rather than an accident.

The same is true when the board is a sub-assembly inside your own certified product. If your name is on the cabinet certificate anyway, the module's certificate does not save you a certification cycle — it only saves you the assembly.

## What to demand from the assembler

On a board where isolation is the selling point, process evidence is the product:

1. **The keep-clear drawing.** Which slots, which barrier zones, which connectors. A verbal "we coat everything except the connectors" is not a specification.
2. **The cleaning process before coating.** Coating over flux residue seals the residue in. Ask whether the board is washed before coating, and with what.
3. **First-article isolation check.** Whether the assembler measures creepage on the first article or only inspects it optically.
4. **The castellated or board-to-board joint method**, if the carrier and the I/O board are separate. Hidden fillets on a castellation are the classic failure on this family.
5. **Coating material and thickness**, and whether thickness is measured or assumed.

Note that none of this is a certification. The assembler builds and inspects to an assembly standard; the isolation certificate on the finished product is issued against the product, by whoever's name is on it. Any supplier who implies otherwise is worth a second look.

## What to put in the enquiry

- **Gerber, BOM and centroid**, plus a marked-up drawing showing the barrier.
- **The isolation requirement stated as a number** — working voltage and the pollution degree it must hold at.
- **Whether the boards ship as a carrier-plus-I/O pair or as one board.**
- **The batch band.** This family normally runs 100 sets to 1,000 sets; below that the first-article work dominates and the coating mask is a fixed cost.
- **Whether you intend to certify the end product yourself.** It changes what evidence you need from the build.

The [HMI, gateway and PLC I/O page](/applications/hmi.html) states this floor's 01005 capability alongside the point that isolation spacing, not density, is the design constraint. The [EVSE control board](/applications/evse.html) is the same decision at mains voltage with a harder audit, and the [servo drive](/applications/servo.html) shares the isolation-through-assembly problem. [Consigned versus turnkey PCBA](/insights/consigned-vs-turnkey-pcba.html) covers the material side, which on this family is usually a small share of the total.

Buy the module when the certificate is what you are selling. Assemble the board when the form factor or the channel count leaves no choice — and then buy process evidence, not placement capability.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Discuss an isolated I/O board: [WhatsApp](https://wa.me/8617361058693)*
