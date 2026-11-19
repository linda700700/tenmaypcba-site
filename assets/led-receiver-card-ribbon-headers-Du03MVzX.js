const e=`---
title: "On a receiver card the joint that fails is a ribbon header, three years later, on a wall nobody can reach"
seoTitle: "LED Display Receiver Card PCBA: The Connector Failure"
description: "Long thin cards, eight ribbon headers, and thousands of pieces priced in cents. Where an LED display build loses money, and the calibration that is not ours."
date: 2026-11-19
tags: Sourcing, LED Display, Decision
summary: "A cabinet card is cheap, long, and covered in headers that get cycled during install. Why the connector and the through-hole fill decide the field failure, not the placement."
cover: "/assets/images/scene-led-display.webp"
coverThumb: "/assets/images/scene-led-display-700w.webp"
coverAlt: "Indoor LED video wall filling a mall atrium, cabinet grid visible across a blue and amber gradient, shoppers in silhouette below"
---

An LED display is a wall of identical cabinets, each with one or more receiver cards and a sender card upstream. The receiver card is long and narrow, usually with eight or more ribbon headers along its edge feeding hub boards, and it is ordered in thousands because the wall is measured in square metres.

The card is simple and cheap. That is exactly the problem: on a part this cheap, the only visible variable is price, and the only invisible variable is the process — which is why the failure this family produces is almost always the same one.

## Eight headers, and every one of them is a lever

A ribbon header is a mechanical interface that gets mated during installation, possibly re-mated during service, and then left for years. Three things about it are decided at build:

- **Through-hole fill.** These are through-hole parts on a thin board. Insufficient fill gives a joint that survives the factory and cracks on the third installation.
- **Header seating and coplanarity.** A header that is a fraction off-square puts the ribbon under tension, and the tension lands on the solder joints at both ends.
- **Handing during packing.** Long thin boards flex. A card that is packed with the headers taking the load arrives pre-stressed.

An AOI pass rate says nothing about any of those three. A pull test on the first article and a written seating method do.

## This family is priced in cents and ordered in thousands

At 1,000 to 10,000 pcs, the economics are dominated by material and yield, not by setup. Which changes the honest advice: the lever here is not negotiation, it is the panel design and the process stability.

- **Panelisation matters more than on any other family.** Long boards with a high header count want a panel that carries them flat through reflow and depanelisation.
- **One stencil revision, held.** A card that is re-tooled between batches at this price point is a batch that will differ.
- **Coating, if specified, is a cost you should interrogate.** Outdoor cabinets usually want it; indoor rental walls often do not. Coating eight headers correctly means masking eight headers, and that labour is real.

The cent-per-board argument is worth reading before you buy on price: [how to tell whether an LED driver quote is real](/insights/led-driver-quote-reality-check.html) makes the same case one step upstream in the same industry.

## What is not measured here: the colour, the wall, the EMC

Nothing on this floor produces a picture. Specifically not available:

- **Colour, brightness, gamma or refresh calibration at cabinet level**, and any pixel-level or wall-level test.
- **EMC pre-compliance or compliance testing**, ingress (IP) testing, salt-fog and UV ageing of the cabinet.
- **Cabinet mechanical assembly, power-supply integration, front-face lamination.**
- **Any end-to-end proof that the finished screen works** before it ships.

So the acceptance plan is yours: a test jig on the hub interface, a burn-in rack, and a cabinet-level visual check at the integrator. That is normal for this industry — but it means the assembler is being bought for consistency, not for proof.

## Where the board stops and somebody else starts

A clean split looks like this: the card is assembled, inspected, and recorded here; the cabinet is built, powered, sealed and calibrated by the cabinet maker; the wall is commissioned on site with the control system. Almost every dispute in this product category comes from one of those three steps being assumed by the wrong party.

## What to send for a quote

Gerber with the panelisation, the stack-up, the BOM, the centroid, the header list with the seating and pull requirements, the coating and mask drawing if any, and the quantity with the variant count. At 1,000 to 10,000 pcs the build is three working days from kitted parts, and the through-hole operation is the rate limiter.

The family page is [LED display control and receiver cards](/applications/led-display.html). For the coating-versus-cost argument in this industry, [the LED driver quote reality check](/insights/led-driver-quote-reality-check.html); for where a cheap board stops being cheap, [what is inside a PCBA price](/insights/pcba-cost-per-board.html).
`;export{e as default};
