---
title: "An off-highway controller is judged in a field six months after it left the line"
seoTitle: "Off-Highway Controller PCBA: Coating in a Casting"
description: "A coated heavy-copper board in a sealed casting, on a machine that runs in dust. What assembly decides, and the sealing, EMC and safety files it cannot supply."
date: 2026-11-19
tags: Sourcing, Off-Highway, Decision
summary: "One or two boards per machine, coated, with valve drivers on the logic side and load dump on the power side. Where the build risk sits before the machine is ever driven."
cover: "/assets/images/scene-off-highway.webp"
coverThumb: "/assets/images/scene-off-highway-700w.webp"
coverAlt: "Front axle of a tractor with chevron tyres in a stubble field, a sealed cast aluminium controller and heavy connector bolted to the frame"
---

A tractor or excavator controller is one or two boards inside a sealed cast aluminium housing bolted to a frame. It drives hydraulic valve solenoids, reads sensors, talks over CAN, and lives in dust, vibration, and a temperature range that a sealed casting makes worse rather than better.

It is also the family where the gap between what assembly can prove and what the machine will experience is widest. That gap is not a defect; it is a boundary, and buyers who know where it sits make better decisions about price.

## Coating is not a finish on this family, it is the product

Every board here is conformal coated, and the coating is doing real work: condensation, dust, oil mist and the occasional pressure wash nearby.

What that requires is a specification rather than a bottle:

- **Mask list.** Sealed connector pins, test points, pressure-sensitive sensors, and any surface that must stay conductive. A coated connector pin is a fault that appears as a communication error on a cold morning.
- **Material and thickness.** Polyurethane and silicone behave differently on thermal cycling; the callout should name one and say how the film is checked.
- **Cure before handling.** Coated boards that are handled wet lose the coating exactly where the harness lands.
- **Rework sequence.** Cut back, repair, re-coat, and record it. A reworked board without re-coating is a board with a hole in its protection.

The rest of the family follows from this: a coated board forces you to think about what is masked, and what is masked forces you to think about what the housing has to seal.

## Valve current, load dump, and the joints that carry both

The power side is heavy copper driving inductive loads, and the failure modes are the classic ones:

| Risk | Where it is decided | What inspection proves |
|---|---|---|
| Voiding under the FETs | Paste volume, reflow profile | X-ray on the power joints, per lot |
| Solder fill on valve driver tabs | Through-hole method, thermal mass | First-article pull and cross-section |
| Coating bridging the isolation gap | Mask drawing, coating method | Visual under magnification, photographed |
| Connector strain | Connector choice, board edge design | Nothing — it is a design decision |

That last row is the honest one. Some of the most important decisions on this family cannot be inspected at all, because they were made on the drawing.

## What is not proven here: sealing, EMC, vibration, functional safety

The list is long and it is worth stating without softening:

- **No ingress (IP) testing, no burst or leak-down test of the sealed casting**, and therefore no IP rating for the finished controller.
- **No EMC, load-dump, vibration, thermal-shock or salt-spray qualification**, and no certified test report.
- **No functional safety certification** — ISO 13849, IEC 61508, any PL or SIL claim — and no IATF 16949 work as a Tier supplier.
- **No hydraulic valve calibration or end-of-line actuator test.**
- **No potting or encapsulation** of the board. Coating is what this floor does.

A machine programme that needs any of those is not being badly served by this floor; it is being served by the wrong party for those steps, which is a different and more fixable problem.

## A hundred machines is a normal order, and it stays a hundred

At 100 to 1,000 sets, this is a long-life, low-volume, revision-light family — the opposite of a consumer product. The right supplier is one whose process does not drift between orders two years apart, and whose record lets you prove it did not.

That is why the useful question at quotation is not "what is your price at 500" but "what does your record look like, and can I have the first-article pack from the last time you built this".

## What to send for a quote

Gerber with copper weights and the stack-up, the BOM including the load-dump and protection parts, the centroid, the sealed connector list with the mating half and pin assignment, the coating and mask drawing with the isolation gap marked, the valve driver joint callout, and the quantity. At 100 to 1,000 sets a build is three working days from kitted parts.

The family page is [off-highway and agricultural controllers](/applications/off-highway.html). For the similar coating argument in a handheld, [where the coating is the product](/insights/rugged-radio-coating-is-the-product.html); for the certification question in automotive work, [do you need IATF 16949](/insights/no-iatf-16949.html).
