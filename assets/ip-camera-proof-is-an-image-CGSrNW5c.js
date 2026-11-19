const e=`---
title: "An IP camera board is easy to assemble and hard to prove, because the proof is an image"
seoTitle: "IP Camera Board PCBA: The Proof Is an Image"
description: "A BGA SoC, PoE magnetics and a sealed gland, on a product judged by a picture nobody here can take. What assembly decides and what it deliberately does not."
date: 2026-11-19
tags: Sourcing, IP Camera, Decision
summary: "Five hundred to five thousand boards, a thermal SoC and an image-based acceptance criterion. Why the assembler's job is narrow and why the testing has to live somewhere else."
cover: "/assets/images/scene-ip-camera.webp"
coverThumb: "/assets/images/scene-ip-camera-700w.webp"
coverAlt: "Security camera mounted under a roof eave at night, infrared ring around the lens and an Ethernet cable entering through a sealed gland"
---

A security camera is a BGA SoC, a sensor connector, PoE magnetics, an IR cut filter driver and a lens — plus, on the access-control side, a small reader board with a keypad and a relay. The main board is a dense mixed-signal board with a thermally significant processor, and at 500 to 5,000 pieces it is squarely in the range a high-mix floor builds well.

The awkwardness is entirely in the acceptance criterion. A camera is judged by an image, and no image is produced in this building.

## The SoC is a thermal and a reflow problem at once

A camera SoC in a sealed dome is thermally constrained and electrically dense. Two consequences for the build:

- **Voiding under the thermal pad.** The SoC's ground pad is its heatsink. A void there raises the junction temperature in a housing with almost no airflow, and the symptom is a camera that drops frames in the afternoon rather than one that fails on the bench.
- **Warpage and standoff.** A large BGA on a board that also has a big sensor cutout and a gland hole is a board that wants to warp. Reflow profile and support during handling are the controls.

X-ray on the SoC is the inspection that matters, and it is worth receiving the images rather than a pass rate.

## PoE, connectors and the parts that get pulled

An Ethernet camera gets its power over the same pair it communicates on, and the port is the part most likely to be abused — by installers, by weather, by a cable that gets yanked.

- **PoE magnetics and the isolation barrier** need the creepage the drawing specifies, and assembly has to respect it through coating and mask decisions.
- **The RJ45 or the gland** is the mechanical interface. The board side of it takes strain, and a connector held only by solder joints is a repair waiting to happen.
- **The IR LED ring and the light sensor** are on the board but belong to the optics budget; position tolerance is set by the housing.

There is one part of the sealing story that is easy to misread: the gland seals the housing, not the board. Coating protects the board from condensation; it does not make the camera waterproof.

## What is not done here: the image, the protocol, the rating

Stated plainly, because this is the part buyers most often assume is included:

- **No image tuning, lens focusing, IR-cut alignment, or any low-light, resolution or colour measurement.**
- **No functional test of any kind** — no in-circuit test, no functional test, and no ONVIF or RTSP conformance work.
- **No IP or IK testing, no salt-fog testing, no EMC pre-compliance or compliance testing.**
- **No potting of the camera module.**

What is on offer is assembly, SPI, AOI, X-ray on the SoC and the power joints, coating with masking, and a lot record. If your acceptance plan assumes a picture is taken before shipping, that step is yours or your ODM's.

## Five hundred to five thousand, and the variants multiply

Cameras multiply variants faster than almost any family: lens options, IR or white light, PoE or 12 V, dome or bullet, reader or no reader. Each variant that changes the board is a new stencil-and-profile cycle; each variant that changes only the BOM is a changeover.

The discipline that keeps this affordable is deciding early which variants live in the BOM and which live in the layout — and then keeping the latter to as few as the market will allow. That is also the argument for keeping the reader board separate from the camera board rather than integrating them.

## What to send for a quote

Gerber with the stack-up, the BOM with the SoC and PoE magnetics named, the centroid, the sensor connector and gland drawing, the coating and mask drawing, the variant matrix, and the quantity. At 500 to 5,000 pcs a build is three working days from kitted parts.

The family page is [IP cameras, NVR and access control boards](/applications/ip-camera.html). For the test-strategy question, [what to do when your assembler has no in-circuit test](/insights/in-circuit-test-outsourcing.html); for how the record set is assembled on a safety-related board, [the EVSE audit record set](/insights/evse-audit-record-set.html).
`;export{e as default};
