---
title: "An induction board is judged at the pan, and the pan is the one thing this floor never connects"
seoTitle: "Induction Cooker Board PCBA: The Tank Never Gets Loaded"
description: "An IGBT half-bridge, resonant capacitors and heavy copper, priced in thousands and fought over in cents. What cannot be proven without a coil on the bench."
date: 2026-11-19
tags: Sourcing, Induction Drive, Decision
summary: "The resonant tank decides both the money and the failure, and it lives outside this building. Where an appliance drive build can be controlled, and where it cannot."
cover: "/assets/images/scene-induction-drive.webp"
coverThumb: "/assets/images/scene-induction-drive-700w.webp"
coverAlt: "Induction hob built into a kitchen worktop with a steaming pot on the left cooking zone, daylight from a window above"
---

An induction hob board is a resonant inverter: a rectifier, an IGBT half-bridge, a resonant tank of capacitors and the coil, a control board and a display. One to three boards per appliance, a thousand to ten thousand pieces per order, and a market where a cent per board is a negotiation.

The reason this family deserves its own note is that its performance and its failure both live in the tank — and the tank is a coil of wire that is never connected on this floor.

## The resonant tank is where the money and the failure both are

The board's job is to switch an IGBT into a resonant circuit at the right moment, with the right dead time, and survive the commutation boundary. Everything hard about it is at that boundary:

- **Commutation.** If the switch is not soft at turn-on, losses and EMI spike together. That is a firmware and tank design problem, exercised at the pan.
- **Resonant capacitors.** They carry high ripple current and they are the parts that age. Where they sit, how their joints are formed, and how hot they run are all assembly-relevant.
- **The IGBT's thermal path.** Heavy copper, a heatsink or an aluminium substrate, and a joint whose voiding decides whether the device reaches its rated life.

So the honest position is: assembly controls the joints and the thermal path, the design controls the boundary, and only the appliance with a coil verifies the result. Which is why "we can build it, we cannot prove the tank" is the sentence to keep in mind at quotation time.

## Coating is not potting, and a kitchen is a wet room

Hobs get steamed, wiped, occasionally flooded. Conformal coating is applied here, with masking, and it does real work on the control side and the low-voltage areas.

It is not potting, and potting is not done here. The mains-side region usually relies on creepage, potting or a sealed enclosure, and the split has to be decided by whoever owns the appliance safety case. A board whose design assumes encapsulation is a board that needs a different supplier for the final step.

The other half of the wet argument is the glass panel and the seal, and neither is ours. Every leak complaint in this category is an enclosure discussion.

## What cannot be proven without a coil on the bench

Nothing below happens here, and each of them is a number a buyer needs:

- **Output power, efficiency, temperature rise under load, and the commutation boundary** — all need a resonant load and a coil plate.
- **EMC pre-compliance and compliance testing** — the hard gate for this family. Not something this floor can clear for you, and the reason designs get re-spun after first certification.
- **Safety certification** — CCC, CE, UL are granted to the appliance, not to the board.
- **Potting and full encapsulation.**
- **Glass panel, coil plate, fan shroud and enclosure work.**

If the acceptance plan needs any of those before a batch ships, they belong at the appliance maker or a test house, and the shipment plan should reflect that.

## One thousand to ten thousand, and a price fight

At 1,000 to 10,000 pcs the family is in a genuine price fight, and it is worth understanding what is actually being negotiated. On a board this simple, the visible variable is price and the invisible one is process stability — the argument made in [the LED driver quote reality check](/insights/led-driver-quote-reality-check.html), which is the same market with the same dynamic.

Two levers that are real at this volume:

- **Panel design and depanelisation.** Long thin boards and heavy copper want a panel that carries them flat.
- **One stencil, one profile, held across the year.** The cheapest way to lose the cent you saved is a re-tooled batch that fails at the appliance line.

## Where this floor stops

- **No resonant load, no coil plate** — power, efficiency and commutation are unmeasured.
- **No EMC testing** of any kind.
- **No appliance safety certification.**
- **No potting or encapsulation**; coating is the only protection applied.
- **No glass, coil, fan or enclosure assembly.**

## What to send for a quote

Gerber with copper weights and the stack-up, the BOM with the IGBT and resonant capacitors named, the centroid, the heatsink or substrate interface, the coating and mask drawing, the connector and terminal list, and the quantity per variant. At 1,000 to 10,000 pcs a build is three working days from kitted parts.

The family page is [induction and appliance inverter drives](/applications/induction-drive.html). For the same half-bridge at industrial margins, [a VFD quoted as three boards or one set](/insights/vfd-three-boards-one-quote.html); for the quote that survives a second batch, [the LED driver reality check](/insights/led-driver-quote-reality-check.html).
