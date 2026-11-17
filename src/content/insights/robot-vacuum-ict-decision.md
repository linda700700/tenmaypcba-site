---
title: "Do you actually need in-circuit test on a robot vacuum mainboard?"
seoTitle: "Robot Vacuum PCBA: Do You Really Need In-Circuit Test?"
description: "ICT quietly decides which assemblers can quote a robot vacuum at all. Here is what it proves, what it misses, and how to specify it honestly."
date: 2026-11-17
tags: Sourcing, Robot Vacuum, Testing, Decision
summary: "Specify ICT and most high-mix floors are out. That is a legitimate choice — but know what you are buying, because ICT proves connectivity, not that the robot works."
cover: "/assets/images/case-robot-vacuum.webp"
coverThumb: "/assets/images/case-robot-vacuum-700w.webp"
coverAlt: "Robot vacuum cleaner with its underside cover removed showing the mainboard, drive wheels and sensor module"
---

Robot vacuum is the densest family on this site: 01005 passives, 0.3 mm IC pitch, double-sided assembly, three to four boards per unit. It is also the family where buyers most often arrive with a test requirement already written into their specification — in-circuit test, on every board. That single line decides which assemblers can quote at all.

## What ICT actually measures

An in-circuit test fixture lands probes on every net through a bed-of-nails interface. It measures connectivity, component presence, component value within tolerance, and orientation for polarised parts. It catches an open joint, a missing part, a wrong value, a reversed diode.

What ICT does not do is prove the product works. It cannot see a firmware fault, a marginal sensor alignment, a motor driver that only fails under load, or a thermal problem. Those belong to functional test, which is a different fixture and a different specification.

So the question is not "do we need ICT". It is "which of these failure modes is our real risk, and which test finds it".

## Where a high-mix floor fits, and where it does not

| Test type | What it proves | Where the fixture belongs |
| --- | --- | --- |
| SPI | Paste print before reflow | At the assembler — in line |
| AOI | Placement and visible fillet after reflow | At the assembler — in line |
| X-ray | Hidden joints: SoC, BGA, thermal pads | At the assembler — in line or sampled |
| ICT | Net connectivity and component values | Product-specific fixture; not universal to an assembly house |
| FCT | The board behaves as intended | Product-specific fixture and firmware |

The first three are process controls and belong to whoever runs the line. The last two are product-specific: a fixture has to be designed, built and maintained for one design, and it stops being useful when the design changes. That is why many assembly houses — this one included — run SPI, AOI and X-ray in line and quote ICT and FCT per project rather than claiming them as standard.

If your specification says ICT on every board, it is not a criticism of the assembler who declines. It is a statement that the fixture belongs in the build. Say so early and the right suppliers will answer.

## The density problem is separate from the test problem

It is worth keeping these two apart, because buyers often conflate them. A board can be at the limit of what the placement floor handles and still be perfectly testable, and a board can be easy to place and impossible to test without a fixture.

On this family the density is real: 01005 passives and 0.3 mm pitch on both sides means the paste print and the reflow profile carry the yield, and hand rework on a 01005 is usually a scrap decision rather than a repair. That is a process argument for using an assembler who does fine pitch routinely, not an argument about test.

The test argument is different. On a dense double-sided board, the risk you cannot see is under the packages: the SoC, the memory, the thermal pads on the driver side. X-ray covers those. Everything above the board is covered by AOI. What remains uncovered is the electrical behaviour of the assembled unit, and no amount of AOI substitutes for a powered test.

## How to decide, in practice

Ask these four questions in this order:

1. **What are the field failures we have actually seen?** If they are connector and mechanical, ICT will not help. If they are missing or wrong components on a dense board, it will.
2. **Does the design have test points, and are they accessible on both sides?** ICT on a double-sided 01005 board needs probe access designed in, not added later.
3. **Who owns the fixture?** If the assembler owns it, the fixture leaves when you leave. If you own it, you can move the build.
4. **What is the sample plan?** Full ICT on every board and ICT on a first-article plus sample basis are different costs and different assurances. Most buyers who say "ICT on everything" have not priced the fixture maintenance.

A useful middle path on this family: X-ray on every SoC and memory joint, AOI on both sides, and a functional test at the brand's own end-of-line where the firmware already lives. That covers the joints optically and electrically where the pass criteria actually exist.

## What to put in the enquiry

- **Gerber, BOM and centroid**, plus the layer stack, because double-sided 01005 with a dense SoC is a different profile from a single-sided board.
- **Your test specification, verbatim.** Not "standard testing" — the actual list. A supplier who receives it can tell you what they run and what they do not, which is the answer you need.
- **Annual volume and batch band.** This family is normally built in 500 sets to 5,000 sets; below that, fixture cost per board dominates.
- **Which board in the stack carries the SoC**, because that is where the X-ray and the ICT both concentrate.

The [robot vacuum mainboard page](/applications/robot-vacuum.html) states plainly that in-circuit test is not run in-house, which makes it the honest test of whether this floor fits your requirement. The [dashcam board](/applications/dashcam.html) carries the same density and the same SoC-under-package risk. [What AOI and X-ray cannot catch](/insights/what-aoi-xray-cannot-catch.html) goes through the inspection gap in more detail, and [01005 placement limits](/insights/01005-placement-what-limits-yield.html) covers the yield side.

Ask for the test matrix in writing before the quote. A supplier who answers it precisely has told you where your risk is; one who says "we test everything" has told you nothing.

*Last reviewed: 2026-11-17 · Send a test specification for review: [WhatsApp](https://wa.me/8617361058693)*
