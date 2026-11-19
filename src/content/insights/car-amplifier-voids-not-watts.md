---
title: "A car amplifier is a power supply with an audio problem, and the yield number is voiding"
seoTitle: "Car Audio and Class-D Amplifier PCBA: Voids, Not Watts"
description: "Heavy copper, snap-in capacitors and a thermal path that is half mechanical. What assembly decides on a car amplifier board, and the watts nobody here measures."
date: 2026-11-19
tags: Sourcing, Car Audio, Decision
summary: "A Class-D amplifier board is judged on heat before it is judged on sound. Where the build risk sits, why variants are the trap, and what the bench here cannot tell you."
cover: "/assets/images/scene-car-audio.webp"
coverThumb: "/assets/images/scene-car-audio-700w.webp"
coverAlt: "Car boot with an aftermarket class-D amplifier under its finned top cover, power and speaker terminals in a row, subwoofer beside it"
---

An aftermarket car amplifier is a switching power supply feeding a Class-D output stage, in a box that lives in a boot, under a parcel shelf, in a car that gets to 60 °C in summer. The board is heavy copper, snap-in electrolytics, clamped power devices and a thermal path into a finned aluminium case.

Buyers describe it in watts and distortion. The board does not know about either. What it knows about is heat, and the part of the heat path that assembly controls is the part nobody can inspect afterwards.

## Voiding under the power devices is the whole yield number

A Class-D output stage and the supply's switching devices are packaged to conduct their heat into the board, and then into the case. If the thermal pad under a device has 60 % coverage instead of 90 %, three things follow, in this order:

1. The device runs hotter than designed, in a box that is already hot.
2. It derates, or the protection trips earlier than the specification says.
3. In the worst case it fails, and the failure is attributed to the design rather than to a joint.

None of that is visible. AOI sees the fillet, not the void. X-ray sees the void, which is why X-ray on the power joints is the inspection that decides shipment on this family — and why "we have X-ray" and "we read X-ray against a limit" are different claims.

## The thermal path is half mechanical, and half of it is not measured here

The board-to-case interface is a pad or a paste, a flatness requirement, and a torque specification on the mounting screws. All three are drawing items that get executed here. None of them can be verified here, because verification is a temperature measurement under load, and there is no chamber, no thermocouple instrumentation and no load measurement on this floor.

That leaves the buyer with a practical choice: either the thermal design has margin that does not depend on measuring every unit, or the measurement happens at your end-of-line. Assuming the assembler measured it is the one option that does not exist.

## What is not measured: watts, distortion, noise, efficiency

The whole audio and power claim is outside this building:

- **Audio measurement of any kind** — output power, distortion, noise, efficiency, DSP tuning, acoustic verification.
- **Thermal verification of the assembled amplifier.**
- **EMC pre-compliance or compliance testing** for a switching amplifier, and any certified report.
- **Potting or encapsulation**, and ingress testing of the finished chassis.

For a brand whose selling point is a number on a box, that means the acceptance plan is yours, and it is worth being explicit about which units get measured and what happens to the ones that are not.

## Five hundred to five thousand pieces, and the variants are the trap

At 500 to 5,000 pcs this family is comfortable for a high-mix floor. The trap is not volume, it is variety: one platform shipping as four power levels, two channel counts and three cosmetic variants, each with a different BOM and sometimes a different board.

Two habits keep that manageable:

- **Keep the board revision count low and push variants into the BOM** where the design allows it. Every board revision re-opens stencil, profile and first article.
- **Batch the variants rather than interleaving them.** Changeover is the cost that gets hidden in a blended unit price and then discovered when the schedule compresses.

## Where this floor stops

- **Any audio or thermal measurement.**
- **EMC testing and certification.**
- **Potting, encapsulation and chassis assembly.**
- **Volumes far above five thousand a month**, where a dedicated line wins on unit price.

## What to send for a quote

Gerber with copper weights and the stack-up, the BOM with the power devices named by package, the centroid, the thermal interface and mounting torque callout, the terminal and connector list, the coating callout if used, and the quantity per variant with the variant matrix. At 500 to 5,000 pcs a build is three working days from kitted parts.

The family page is [car audio, DSP and Class-D amplifier boards](/applications/car-audio.html). The same voiding argument on a denser power board is in [the 1U rectifier thermal joint](/insights/1u-rectifier-thermal-joint.html), and the inspection limits are in [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html).
