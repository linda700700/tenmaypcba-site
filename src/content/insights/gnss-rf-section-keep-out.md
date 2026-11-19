---
title: "On a GNSS board the RF section is a keep-out, and assembly is what quietly breaks it"
seoTitle: "GNSS Receiver Board PCBA: The RF Section Is a Keep-Out"
description: "Shielded RF, coax pigtails and a coating callout that must respect the antenna path. What assembly can ruin, and the accuracy it cannot measure."
date: 2026-11-19
tags: Sourcing, GNSS, Decision
summary: "Fifty to five hundred boards a year, an RF front end nobody here can measure, and a coating decision that can detune it. Where the build risk actually sits."
cover: "/assets/images/scene-gnss.webp"
coverThumb: "/assets/images/scene-gnss-700w.webp"
coverAlt: "GNSS RTK base station on a survey tripod in a harvested field, helical antenna, radio and a rugged data collector hanging from the legs"
---

A GNSS receiver or telemetry board has an RF front end, a baseband or module, and an interface section, often with a shield can over the front end and a coax pigtail to the antenna connector on the enclosure. Volume is fifty to five hundred a year. The boards are not hard to place.

What makes this family worth its own note is that the things assembly can do to an RF front end are invisible to every test on this floor, and that the buyer usually learns about them from a position accuracy complaint rather than from incoming inspection.

## The RF section is a keep-out, not a component list

Three areas need to be treated as protected rather than merely populated:

- **Under and around the shield can.** Ground pads have to be fully formed before the can goes on; a void there is an RF ground that is not a ground. That is an X-ray check, done before the can is fitted, not after.
- **The antenna feed and matching network.** Solder mask, coating and flux residue around the feed change impedance. The mask drawing should say what stays bare, and the process should respect it.
- **The keep-out around the antenna itself.** Any metal added near the radiating element — a stray solder ball, a shield fence in the wrong place — detunes it, and the tuning was done by somebody else, at design time.

The general rule for this family: everything near the RF section is either specified or it is a variable.

## Coax pigtails, connectors and heat

A board with a coax pigtail has a joint that is both electrical and mechanical, and it usually takes a small amount of heat in a small area:

- **Connector-to-board joints** need the right amount of solder and the right amount of heat. Too little is intermittent; too much damages the dielectric inside the connector, which shows up as loss rather than as an open.
- **The pigtail is a handle.** Whoever assembles the unit will lift the board by it at least once. Strain relief is a drawing item.
- **Sealing at the enclosure.** The connector bulkhead seal belongs to the enclosure, not to the board, and the two need to be designed together.

## What is not measured, and what that costs the buyer

Nothing on this floor measures the RF chain. Specifically:

- **No RF alignment, antenna characterisation, or position accuracy and time-to-first-fix measurement.**
- **No EMC pre-compliance, no environmental qualification** such as MIL-STD-810 or IP ratings, and no certified test report.
- **No ITAR-registered handling, classified work, or cryptography approval / Type-1 requirements.**
- **No functional test of any kind**, including a simple "does it acquire satellites" check.

For a buyer, the practical consequence is that the acceptance plan has to run somewhere else. Fifty boards a year is an awkward volume for a test house, which is exactly why the fixture question is worth settling at the quotation stage rather than after the first batch — the same economics that make a small-run fixture a fixed cost.

## Fifty to five hundred a year, and that is the point

This band is not a stepping stone for most GNSS programmes; it is the steady state, because the products are specialised instruments with long lives and few variants. The right supplier is one set up for a reorder that looks exactly like the previous one, with the records to prove it.

At that cadence, the most valuable thing an assembler provides is continuity: the same stencil, the same profile, the same coating mask set, documented, so board nineteen matches board one.

## Where this floor stops

- **RF characterisation in all its forms** — alignment, antenna, accuracy, TTFF.
- **EMC, environmental and certified testing.**
- **ITAR, classified and export-controlled programme handling.**
- **Volumes above a few thousand a year** where the assembler is expected to run functional test.

## What to send for a quote

Gerber with the stack-up and the RF region marked, the BOM with the front end and module named, the centroid, the can and ground-pad drawing, the coax pigtail and connector list, the coating and mask drawing with the keep-out areas explicit, and the quantity. At 50 to 500 sets a build is three working days from kitted parts.

The family page is [GNSS, telemetry and ground station boards](/applications/gnss.html). For the shield-can rework path in a rugged device, [where the coating is the product](/insights/rugged-radio-coating-is-the-product.html); for the inspection order of operations, [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html).
