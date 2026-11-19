const e=`---
title: "On AI glasses the hinge is where the yield goes, and it is a board decision"
seoTitle: "AI Smart Glasses PCBA: Rigid-Flex Through a Hinge"
description: "A rigid-flex through a five millimetre temple, 01005 parts and keep-outs around the optics. Where an AI-glasses build loses yield, and what stays outside."
date: 2026-11-19
tags: Sourcing, Smart Glasses, Decision
summary: "The electronics are unremarkable; the mechanical path through the hinge is not. What to decide at design time so the flex survives being folded every day for two years."
cover: "/assets/images/scene-smart-glasses.webp"
coverThumb: "/assets/images/scene-smart-glasses-700w.webp"
coverAlt: "Black AR smart glasses on a concrete surface, electronics in the temples, front camera and a waveguide lens"
---

AI glasses are a small electronics problem inside a hard mechanical one. A main board in the temple, a flex that crosses the hinge to the front, a camera board behind the lens, a 01005-populated layout in a space measured in millimetres. Every one of those is buildable. What kills the product programme is the flex at the hinge, and that is decided on a drawing long before it reaches a line.

## The hinge is a fatigue part with traces in it

The flex crosses a joint that opens and closes every time the glasses are put on. The trace routing there is doing mechanical work: it is being bent, and it will eventually crack. Three design choices decide whether that happens in month three or year three:

- **Bend radius, stated and respected.** A dynamic bend needs a larger radius than a fold-once flex, and the number belongs on the drawing so that the mechanical and electrical tolerances get resolved before tooling.
- **Stiffener placement, and where it stops.** A stiffener that ends too close to the bend concentrates stress exactly where you do not want it.
- **Trace direction across the bend.** Traces perpendicular to the bend line crack; the routing rule exists and gets ignored under space pressure.

On the assembly side, the parts that matter are the connector-to-flex joints at both ends, the underfill decision at those joints, and handling after test — because a flex that is fine at pack-out can be creased by whoever folds it to fit the box.

## Small parts and unforgiving keep-outs

01005 passives, 0.30 mm pitch, and an optical keep-out that must stay flat, clean and uncoated. That combination makes three process steps decisive:

| Requirement | What it changes on the line | What it does not |
|---|---|---|
| 01005 population | Stencil aperture, paste type, placement accuracy, inspection method | Whether the design needed 01005 at all |
| Optical keep-out | Masking before coating, handling discipline, no-wash chemistry | Lens alignment, which is the optics partner's step |
| Rigid-flex | Panel support, depanelisation method, connector handling | Hinge life, which is a design margin question |

The honest observation about 01005 is that it is a yield cost paid for a space problem. Where the layout allows 0201, 0201 is cheaper and yields better; where it does not, the process has to be built for 01005 rather than borrowed from a 0201 job.

## The commercial truth about this category

Two things are worth saying plainly to anyone building AI glasses:

- **Above roughly ten thousand sets a month, this becomes a dedicated-line job.** A high-mix floor at 500 to 5,000 sets is the right counterpart below that, and the crossover is real rather than a sales position.
- **The test you need is not the test on this floor.** Bluetooth, antenna and RF validation, camera tuning, display calibration, acoustic tuning, drop and IP testing — all of it belongs to the product team or a test house. What happens here is assembly and inspection, and being clear about that early is cheaper than discovering it at certification.

## Where this floor stops

- **Camera module alignment, image tuning and display calibration.** These need the optics and the tuning rig.
- **Acoustic tuning, drop testing and IP-rating qualification** for the finished frame.
- **Potting, overmoulding and final assembly** of the temple. Coating is applied here; the frame is not assembled here.
- **Any Bluetooth, antenna or RF measurement.**

## What to send for a quote

The rigid-flex construction with stiffener and bend callouts, the stack-up, the BOM with the 01005 passives named, the centroid, the connector list, the coating and masking drawing with the optical keep-out marked, and the quantity. At 500 to 5,000 sets the build is three working days from kitted parts; the flex tooling is the long pole.

The family page is [AI and AR smart glasses boards](/applications/smart-glasses.html). The package-size trade-off is set out in [01005 vs 0201](/insights/01005-vs-0201.html), and the process ceilings in [what limits 01005 placement yield](/insights/01005-placement-what-limits-yield.html).
`;export{e as default};
