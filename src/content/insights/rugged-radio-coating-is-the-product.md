---
title: "On a rugged handheld the coating is not a finish, it is the specification"
seoTitle: "Rugged Handheld and Radio PCBA: Coating as the Spec"
description: "Shield cans, press-fit pins and a coating that has to survive a field. What an assembly floor decides on a rugged radio, and the RF work that stays outside."
date: 2026-11-19
tags: Sourcing, Rugged Radio, Decision
summary: "A rugged device survives because of the box and the conformal coat, not the schematic. Where the assembly decision actually lives, and why the shield can dictates the rework path."
cover: "/assets/images/scene-rugged-radio.webp"
coverThumb: "/assets/images/scene-rugged-radio-700w.webp"
coverAlt: "Gloved hand holding a rugged two-way radio on a construction site, antenna, channel knob and push-to-talk, water droplets on the housing"
---

A rugged handheld is sold on the environment it survives. Almost none of that survival is electrical. It is the housing, the gasket, the keypad and — on the board — the coating, the shield cans and the connectors that take the abuse. That makes this one of the few families where the assembly step is the product, and where a buyer who treats coating as a cosmetic line item will get a device that passes the drop test once and corrodes on a dock in year two.

Two or three boards typically: a main board, a keypad and display board, and an RF power amplifier board if the design separates it.

## Coating here is a specification, not a finish

Conformal coating is applied here by spray with hand masking. What makes it a specification rather than a finish is that four things have to be written down and then checked:

- **What is masked.** Connectors, test points, press-fit pins, the antenna contact pads and any pressure-sensitive component. A masked pad that gets a film of acrylic is a contact resistance that drifts in the field, and nobody finds it on the bench.
- **What type and thickness.** Acrylic, polyurethane and silicone behave differently on thermal cycling and on rework. The callout has to name one and say how it is verified.
- **The cure, before the next operation.** Coating that is handled before it cures is coating that is scraped off at the next station.
- **What happens at rework.** A coated board that needs a joint redone gets the coating cut back, the repair made, and the area re-coated — a sequence that has to be agreed or it gets skipped.

The failure this prevents is not dramatic. It is a radio that works for two years in a wet climate and then develops an intermittent that nobody can reproduce in a workshop.

## Shield cans decide the rework path

A rugged device usually carries at least one shield can or a set of fences. The can is either clipped, soldered or a combination, and that choice decides what happens when a board fails at functional test three days into the build.

A soldered can over a section that fails is a board that has to be desoldered, repaired and re-canned, with the shield land taking the thermal cycle twice. A clip-on lid is faster but adds a contact resistance question of its own. Neither is wrong; the mistake is choosing the can for RF reasons at design time and discovering the rework cost at first failure.

This floor solders cans and fences as a standard operation. What it does not do is tell you which can style will cost you less over a product life — that is a decision to make with the RF engineer who knows how often that section is expected to change.

## Press-fit, threads and the parts that get pulled

Rugged devices use press-fit pins and threaded inserts because the buyer expects to open the device. Both are mechanical joints with an electrical job:

- A press-fit pin needs the hole tolerance and the insertion tool specified; a reamed hole gives a joint that passes and later opens.
- A threaded insert in a thin board needs a specified torque, or the insert spins on the second service.

These are drawing decisions. They get executed here, and if the drawing is silent the build uses a house default, which is not the same as a design decision.

## Where this floor stops

- **RF alignment, power calibration and waveform conformance.** These need a shielded room and the OEM's service software.
- **Drop, vibration, IP-rating and salt-fog qualification.** These run at an environmental test house against the finished device.
- **AS9100, NADCAP processing and ITAR-registered handling** for defence programmes. ISO 9001 is what is held, and a programme that requires more should know that before the enquiry, not after.
- **Potting, overmoulding and closing the housing.** Coating is applied here; the box is not assembled here.

## What to send for a quote

Gerber and stack-up, the BOM, the centroid, the full coating callout including the mask list, the shield-can and press-fit drawing, the connector list with mating halves, and the quantity split across boards. At 100 to 1,000 sets a build is three working days from kitted parts.

The family page is [rugged handheld and radio boards](/applications/rugged-radio.html). If you are auditing a new supplier for this kind of work, [the five documents that settle an audit](/insights/pcba-supplier-audit-checklist.html) is the companion note, and the coating callout is covered again in [what a quote should contain](/insights/pcba-quote-what-it-should-contain.html).
