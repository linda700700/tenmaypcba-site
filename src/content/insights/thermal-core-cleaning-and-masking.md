---
title: "A thermal camera core board is a cleaning and masking problem before it is a placement problem"
seoTitle: "Thermal Camera Core PCBA: Cleaning, Masking, Limits"
description: "Two boards, a fine-pitch BGA and a detector interface where residue shows up as noise. What assembly decides, and the calibration it cannot do."
date: 2026-11-19
tags: Sourcing, Thermal Imaging, Decision
summary: "The detector interface is a low-noise analogue board in a small space, and the things that ruin it are flux, dust and a window that should have been masked. Where the build risk sits."
cover: "/assets/images/scene-thermal-imaging.webp"
coverThumb: "/assets/images/scene-thermal-imaging-700w.webp"
coverAlt: "Handheld thermal imaging monocular on a tripod head, germanium objective pointed at an electrical substation at dusk"
---

A thermal camera core is two boards — a detector interface and a processing board — plus an optical path that costs more than both. The assembly is not the expensive part. What makes this family awkward is that the failure mode that hurts is invisible on a bench: leakage current and noise from flux residue, contamination on a detector contact, or an unmasked window that got a film of coating on it during a step that was supposed to protect everything else.

Buyers tend to arrive at this page asking about BGA reflow. The BGA is the easy half.

## Why cleanliness outranks placement

The detector interface carries a very small signal from a very expensive sensor. Microamp leakage across a poorly cleaned flux residue, or an ionic contamination path between two fine-pitch pads, shows up not as a dead board but as noise — a slightly worse NETD, a slightly worse image that gets blamed on the detector.

Three process decisions matter more than the placer here:

- **Wash or no-wash, and consistently.** A no-clean process is fine if the whole build, including rework, is no-clean. The failure is a mixed process where one repair is done with an activated flux and never cleaned.
- **Handling between assembly and optics.** A board that sits open on a bench collects what the room has in it. This is a small-volume family, 50 to 500 sets, so boards sit around longer than they would in a high-volume line.
- **Masking, before coating.** The detector contact area, the optical window in a rigid-flex build, and any connector that will be mated in the field.

## Rigid-flex and the mechanical interface

A core that folds into a monocular or a weapon sight usually has a rigid-flex between the detector side and the processing side. That flex is a mechanical part as much as an electrical one: it has to survive being folded once, correctly, and then never again.

What that means for the build:

- The stiffener and the flex bend radius are drawing items. If they are not on the drawing, they get interpreted.
- Connector-to-flex joints take repeated stress in service; the pad design and the soldering method are worth agreeing explicitly rather than leaving to habit.
- The flex is also the thing most likely to be damaged in handling after test, which is why the final pack matters on this family more than most.

## What a build record proves here

Per lot: SPI, AOI, X-ray on the BGA and the detector-side joints, first-article photographs of the masked areas before and after coating, and the wash record if the process is aqueous. Those are the items an optics partner will ask about when an image is soft, because they are the only parts of the chain the board supplier can be held to.

They do not prove the image. Nothing on this floor produces an image.

## Where this floor stops

- **Non-uniformity correction, radiometric calibration and NETD measurement.** These need a black-body source and the detector vendor's software.
- **Image tuning, lens focusing, optical alignment of the core.** Optics partner work.
- **Airborne, space or defence qualification and export-controlled programme handling.** Commercial workmanship only here.
- **Potting or full encapsulation.** Coating is the only protection applied on this floor.

## What to send for a quote

Gerber with the rigid-flex construction and stiffener callouts, the stack-up including any controlled impedance on the detector side, the BOM with the detector part named and its handling notes, the centroid, the coating and masking drawing, and the quantity. At 50 to 500 sets this is a small-batch build and it is priced as one; the honest reason is in [why a fifty-piece run costs more per board](/insights/fifty-piece-run-cost.html).

The family page is [thermal and night-vision cores](/applications/thermal-imaging.html). For the inspection argument in general, [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html).
