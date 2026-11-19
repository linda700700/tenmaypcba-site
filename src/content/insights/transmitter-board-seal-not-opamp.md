---
title: "On a pressure transmitter the op-amp is the easy part and the seal is not"
seoTitle: "Pressure Transmitter PCBA: Where the Build Stops"
description: "One small board, a low-drift analogue chain and a housing this floor never closes. What assembly decides on a transmitter, and what belongs to the sensor maker."
date: 2026-11-19
tags: Sourcing, Sensors, Decision
summary: "A round board in an aluminium housing, two wires out, and a drift figure that decides whether the product is believed. Where potting and calibration sit relative to the build."
cover: "/assets/images/scene-sensors.webp"
coverThumb: "/assets/images/scene-sensors-700w.webp"
coverAlt: "Pressure transmitter mounted on a stainless process pipe in a plant, round aluminium housing, two-wire cable running away in a tray"
---

A pressure transmitter is a small round board inside a sealed aluminium housing on a process pipe, with two wires leaving it. Inside: a ceramic or piezoresistive cell, a low-drift instrumentation amplifier, a 4–20 mA loop stage and a microcontroller. The board is small, the volume is modest, and the product is judged by a number it prints on a certificate.

Assembly's share of that judgement is narrower than buyers expect and more decisive than they assume. Which is why the two failures to sort out before an order are the seal and the drift.

## A small board with an unusually expensive defect

The defect cost on this family is not the board. It is the labour to open a housing on a plant, the downtime of the line it was monitoring, and the credibility of the next shipment. That inverts the usual instinct to optimise unit price:

- **Board yield matters less than consistency.** A 99 % yield with a drift distribution that moves between lots is worse than 97 % that does not move.
- **The analogue chain has to be built the same way every time.** Same paste, same profile, same wash, same coat. A single board in a batch that skipped the wash is a service call in a year.
- **The housing interface is a drawing item.** Board outline, mounting holes and the connector/terminal position determine whether the assembly seals. A board that is 0.2 mm off-centre in a potted cavity is a board that leaks.

## Where the work stops: potting, sealing and calibration

Three steps sit outside this building, and each of them is a place where a programme can quietly fail:

- **Potting, encapsulation and any overmoulding of the assembled board.** Not done here. A transmitter that depends on a potted cavity is a design that depends on a process this floor does not run, and the partner who does it needs to be in the plan from the first prototype.
- **Pressure calibration, the 4–20 mA trim and any accuracy or drift statement.** These need a pressure standard; they belong to the sensor maker or a calibration lab.
- **Ingress, burst and leak testing of the assembled housing**, and the IP rating that comes out of it. Also **hazardous-area certification** such as ATEX or IECEx, and the documentation behind it.

None of those three is a small omission, and all three are commonly assumed to be included in "PCB assembly".

## What the process controls, and what it only records

It is worth separating two things a supplier will describe in the same sentence:

**Controlled here:** paste volume, placement, reflow profile, wash or no-wash chemistry, conformal coating with masking, through-hole joint quality on the terminal block, first-article inspection and per-lot records.

**Only recorded here:** the component date codes and the lot they went into. Which is useful — a drift investigation starts with "which lot" — but is not the same as a measurement.

If a buyer asks "can you guarantee drift under X", the honest answer is no: drift is a design, cell and calibration question. What can be guaranteed is that every board in the lot was built to the same written process, and that the record shows it.

## Two hundred a year is a normal order, and it stays that way

At 100 to 1,000 sets, this is high-mix work, and it stays that way because transmitters are a long-life product with slow model turnover. The practical consequence is that the relationship matters more than the price list: the same boards, built the same way, twice a year, for five years, with a record each time.

## What to send for a quote

Gerber with the board outline and mounting datum, the BOM with the cell and the amp named, the centroid, the terminal block and its torque, the coating and mask drawing, and the quantity with the expected reorder cadence. At 100 to 1,000 sets a build is three working days from kitted parts.

The family page is [industrial sensor and transmitter boards](/applications/sensors.html). The potting question in more detail is in [potting before test turns a defect into scrap](/insights/parking-sensor-potting-before-test.html), and the record side is in [what a PCBA quote should contain](/insights/pcba-quote-what-it-should-contain.html).
