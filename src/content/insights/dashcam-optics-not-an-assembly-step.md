---
title: "Who owns the optics on a dashcam build?"
seoTitle: "Dashcam PCBA: Who Owns the Optics and the Alignment"
description: "The sensor board is assembled and the lens focused by different suppliers. Get the boundary wrong and the camera is sharp on the bench only."
date: 2026-11-17
tags: Sourcing, Dashcam, Optics, Decision
summary: "Lens alignment is not an assembly step. A build that treats the sensor board as the product will pass inspection and still miss focus in the field."
cover: "/assets/images/case-dashcam.webp"
coverThumb: "/assets/images/case-dashcam-700w.webp"
coverAlt: "Dashcam with the housing open showing the sensor board, mainboard with SoC, and lens module connected by a flex cable"
---

A dashcam is three boards — a sensor carrier, a mainboard, and a display board — inside a housing that clips to a windscreen and gets hot in summer. Two of those boards are ordinary dense SMT work. The third carries an image sensor and a lens, and that is where the sourcing boundary usually gets drawn in the wrong place.

## The sensor board is the product

Everything the customer judges — sharpness, colour, low-light performance, whether the plate is readable at speed — comes from the sensor and the optics, not from the SoC. The mainboard processes what the sensor delivers. If the sensor module is compromised, no amount of processing recovers it.

That has a sourcing consequence: the sensor carrier is the one board where "we assembled it and it passed inspection" is not an answer. A board can be perfectly assembled and still produce a soft image, because the lens was focused against a target that does not match the real scene, or because the holder was seated with a tilt that only appears after the housing is clipped shut.

## What is and is not an assembly step

| Step | Whose process | Can an assembler do it? |
| --- | --- | --- |
| Place and reflow the sensor carrier | Assembler | Yes — fine pitch, 01005 passives, 0.3 mm pitch |
| X-ray the SoC and memory joints | Assembler | Yes — hidden joints under the package |
| Mount the lens holder | Depends on the design | Only if the drawing specifies the adhesive and cure |
| Active alignment and focus | Optics house | No — needs a target, a chart and a lens fixture |
| Final image validation | Brand or optics house | No — needs the firmware and the acceptance criteria |
| Environmental and thermal soak | Brand | No — that is a product-level test |

The middle two rows are the boundary. Active lens alignment is not an assembly step; it is a metrology step that requires a collimator, a test chart and a decision about what "in focus" means for the product. An assembly house that says it will "fit the lens" and does not have that equipment is doing passive placement and calling it alignment.

## The X-ray is the assembly-side control that matters

On the mainboard, the SoC and the memory are the risk. Both sit under packages where a void or an incomplete joint is invisible from the surface, and both are the components whose failure presents as an intermittent camera rather than a dead one.

X-ray on those joints is the control that an assembler genuinely owns. Ask for it explicitly, and ask whether it is every board or a sample — the answer changes the price and the assurance.

The sensor carrier has its own version of the same problem: the sensor's own pads are fine pitch and the flex attach is a mechanical joint that gets pulled when the housing is assembled. A lifted flex trace passes inspection and fails when the unit is clipped to a windscreen.

## The thermal decision belongs to the housing, not the board

A dashcam sits in direct sun behind glass. The housing design and the thermal path decide whether the SoC throttles; the board's job is to conduct heat out of the package through thermal vias and pad geometry.

Where this becomes a sourcing question is in the specification: if the thermal pad and via pattern were designed for a metal housing and you switch to plastic, the assembler cannot fix it. Worth raising at DFM rather than at the third batch.

## When to split the sensor from the rest

Split when you have an optics partner who already does alignment and validation, because they own the acceptance criteria and you want one party answering for image quality. Keep the boards together when the volumes are small and the sensor is a standard module with a factory-focused lens — no alignment step, no split needed.

The rule is simple: split where the acceptance criteria live, not where the boards are.

## What to put in the enquiry

1. **Gerber, BOM and centroid** for all three boards, plus the stack-up for the sensor carrier.
2. **Whether the lens is pre-focused or aligned in your process.** If it is aligned, say who does it and what target is used.
3. **The X-ray requirement**, stated per board: SoC, memory, or both, sample or full.
4. **The housing material and the thermal path**, at DFM stage rather than after the first batch.
5. **The batch band.** This family normally runs 500 sets to 5,000 sets; below that, the fixture and first-article work for a fine-pitch sensor carrier dominates.

The [dashcam board page](/applications/dashcam.html) says plainly that active lens alignment is not an assembly step here, which is the boundary worth testing any supplier against. The [robot vacuum mainboard](/applications/robot-vacuum.html) carries the same density and the same under-package risk, and the [parking sensor board](/applications/parking-sensor.html) is the other family where a small board is dominated by what happens after assembly. [What AOI and X-ray cannot catch](/insights/what-aoi-xray-cannot-catch.html) explains the inspection gap this family lives with.

A sharp image on the bench and a sharp image at 100 km/h are different tests. Decide who runs the second one before you place the order.

*Last reviewed: 2026-11-17 · Send a sensor board stack for review: [WhatsApp](https://wa.me/8617361058693)*
