const e=`---
title: "On a telecom line card the impedance comes from the stackup and the shielding from the assembly floor"
seoTitle: "Telecom and 5G Edge PCBA: Shield Cans and Impedance"
description: "Controlled impedance is fixed in the stackup; shield cans, coax and press-fit pins are fixed at assembly. Where a telecom build can still spoil a good design."
date: 2026-11-19
tags: Sourcing, Telecom, Decision
summary: "A line card is a controlled-impedance board with heavy ground copper, shield cans and coax launched at the edge. The two places the assembly step can undo the design."
cover: "/assets/images/scene-telecom.webp"
coverThumb: "/assets/images/scene-telecom-700w.webp"
coverAlt: "Open telecom equipment shelf with dense shielded line cards, coaxial pigtails, SFP cages and fibre jumpers"
---

A telecom line card arrives with the hard problems already solved. The impedance is designed, the stackup is specified, the ground is heavy, the shield fences are drawn. What is left at assembly is execution: build the stackup that was specified, put the cans on without cooking what is underneath, and get the coax and press-fit interfaces landed so they behave.

That is a narrower job than on a power board, and it is more easily spoiled.

## Where assembly can still spoil a controlled stackup

A controlled-impedance design depends on the fabricator holding the stackup, and the assembler cannot change that. What the assembler can change is everything on the surface of it:

- **Paste volume on fine-pitch parts near an impedance-critical net.** Excessive paste, a spread fillet, or a reflow profile that wicks solder toward a launch all shift local parasitics.
- **Rework near an RF launch.** A hand-repaired joint beside a coax launch or a filter changes the geometry that was simulated.
- **Coating over or under a shielded section**, where the callout said to mask it.
- **Press-fit insertion force.** Too much force bows the board and the launch geometry goes with it; too little gives a joint that passes and later opens.

None of these failures is detectable from the schematic; all of them are detectable from a build record and a first article.

## Shield cans, coax and the order of operations

The order of operations on this family is a genuine engineering decision, not a scheduling preference:

| Step | Why the order matters | What goes wrong if it slips |
|---|---|---|
| SMT, then X-ray/AOI | Ground pads under cans must be verified before they are covered | A void under a can land is unreachable after assembly |
| Coax and press-fit | Mechanical operations bend the board | Doing them before final inspection means inspecting a board that will move |
| Cans and fences | Thermal mass next to sensitive parts | Rework heat near filters shifts their value |
| Coating, last | Masking costs time and is skipped under pressure | Conductive or absorptive film where the design expects air |

A line that has built this family before asks about the can style and the press-fit tooling at quotation. A line that has not asks for the Gerber and nothing else.

## Volume: a few hundred boards is the honest band

Telecom programmes here run 100 to 1,000 sets, and that is deliberate rather than a limitation to apologise for. Carrier-grade volumes in the tens of thousands belong with a dedicated-line EMS, where the test strategy and the automation are built around one product.

What an assembly floor cannot do at this band is substitute for a test house. **There is no in-circuit test, no functional test, and no RF alignment or calibration here.** Carrier qualification, NEBS or operator approval testing is not performed here either. If your acceptance plan assumes the assembler proves a line card works, the plan is mis-assigned and the fix is cheaper before the purchase order than after.

## What a telecom buyer asks for, and what is on the shelf

The questions that come with this family are consistent: can you hold 0.30 mm pitch, do you X-ray ground pads, do you keep the can and press-fit operation in-house, and what does your first-article pack contain. All four have answers here, and the fourth is the one worth reading carefully — a first-article pack without X-ray images of the ground pads is a pack that skips the part this family cares about.

## Where this floor stops

- **Carrier qualification, NEBS or operator approval testing.**
- **In-house in-circuit or functional test of a line card**, including RF alignment and calibration.
- **Carrier-grade volumes in the tens of thousands**, where a dedicated-line EMS is the right counterpart.
- **Enclosure assembly and system-level integration.**

## What to send for a quote

Gerber with the stackup and the impedance table, the BOM, the centroid, the can and fence drawing with the ground-pad callout, the press-fit and coax list, the coating and mask drawing, and the quantity. At 100 to 1,000 sets a build is three working days from kitted parts, with the press-fit tooling as the long pole.

The family page is [telecom and 5G edge equipment boards](/applications/telecom.html). For the record set that makes this kind of build auditable, [what a PCBA quote should contain](/insights/pcba-quote-what-it-should-contain.html), and for what inspection covers, [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html).
`;export{e as default};
