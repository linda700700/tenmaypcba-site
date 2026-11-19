const e=`---
title: "A wearable board has almost nothing on it and almost no room for a second attempt"
seoTitle: "Wearable and Hearable PCBA: Where Yield Actually Goes"
description: "01005 parts, a 0.30 mm pitch and a rigid-flex in a case smaller than a watch. What assembly decides on a wearable, and the test coverage it cannot provide."
date: 2026-11-19
tags: Sourcing, Wearables, Decision
summary: "The board is tiny, the parts are tiny, and the rework is nearly impossible. What has to be decided before the build, and why volume changes who does the job."
cover: "/assets/images/scene-wearables.webp"
coverThumb: "/assets/images/scene-wearables-700w.webp"
coverAlt: "Smart watch worn on a wrist with the screen lit, notebook and a cup of coffee on a wooden desk behind"
---

A smart watch or a pair of earbuds carries two or three boards: a main board, a case or charging board, and a sensor carrier. On them: 01005 passives, a 0.30 mm pitch device, a rigid-flex to the display or the button, and an antenna structure that is part of the mechanical design.

Assembling one is not difficult in the way a 400-part server board is difficult. It is difficult because there is no recovery path. A board this small with a part this small is often not reworkable, so the process has to be right the first time rather than inspected and corrected.

## What is actually on the board

Three things set the yield ceiling, and none of them is the placement head:

1. **Stencil aperture for 01005.** A paste deposit that is a little large bridges; a little small leaves an open. The window is narrow and it is a stencil decision, not a machine setting.
2. **Paste type and reflow.** Fine-powder paste and a profile developed for that board. Reusing a profile from a 0402 product is the most common cause of a batch that "should have worked".
3. **Support and depanelisation.** Thin boards, often 0.6 mm or less, with a rigid-flex attached. Flexing during depanel is a cracked joint that passes inspection.

That is why the sensible question to ask an assembler is not "what is your placement accuracy" but "what is your 01005 process, and show me the last board you ran with it".

## Underfill is a design decision, never an assumption

Wearables often need underfill at the rigid-flex joint and around a flip-chip or a fine-pitch package that will see drop energy. Underfill is not a standard step on this floor: it is agreed per design at DFM, because it changes the rework story completely — a board that is underfilled is a board that cannot be repaired, only replaced.

The corollary is worth stating: if your design needs underfill, say so at the enquiry, because that decision affects stencil, handling and inspection, not just one extra operation at the end.

## The tests this family usually needs and will not find here

A wearable has an unusually test-hungry design and an unusually thin test story here. Not available on this floor:

- **In-circuit and functional test at volume.** There is no ICT and no FCT.
- **Bluetooth, antenna or RF validation** of the finished device.
- **Potting, overmoulding, IP-rating, drop and tumble testing.**
- **Skin-contact biocompatibility, and battery-pack certification such as UN 38.3 or IEC 62133.**

What is available: assembly, SPI, AOI, X-ray where the design calls for it, coating with masking, and a lot record. For a programme whose acceptance criteria lean on functional test, that gap has to be closed with a fixture you own — the arrangement in [what to do when your assembler has no in-circuit test](/insights/in-circuit-test-outsourcing.html).

## Where volume turns this family into somebody else's job

At 500 to 5,000 sets, a high-mix floor is the right counterpart and the price is mostly process and inspection. In the tens of thousands, the equation flips: the cost is no longer placement, it is test coverage and handling automation, and a consumer-electronics EMS with a dedicated line will beat a high-mix floor honestly rather than by cutting corners.

Knowing that crossover in advance is what stops a programme from being moved mid-qualification, which is the most expensive way to learn it.

## What to send for a quote

Gerber with the stack-up and the rigid-flex construction, the BOM with the 01005 parts and the fine-pitch device named, the centroid, the underfill and coating callouts with the mask list, the depanelisation method if you have one, and the quantity. At 500 to 5,000 sets a build is three working days from kitted parts.

The family page is [wearables and hearables boards](/applications/wearables.html). For the package decision, [01005 vs 0201](/insights/01005-vs-0201.html); for the process ceilings, [what limits 01005 placement yield](/insights/01005-placement-what-limits-yield.html); and for the hinge-and-flex version of the same problem, [AI glasses and the hinge](/insights/smart-glasses-hinge-yield.html).
`;export{e as default};
