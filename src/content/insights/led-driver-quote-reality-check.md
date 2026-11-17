---
title: "How to tell whether an LED driver PCBA quote is real"
seoTitle: "LED Driver PCBA Quotes: How to Tell If They Are Real"
description: "This is the most price-compressed family there is. Five line items separate a quote that holds for a year from one that gets re-priced at the second batch."
date: 2026-11-17
tags: Sourcing, LED Driver, Costing, Decision
summary: "On a simple board everyone can quote, the price is the only visible variable — which is exactly why the invisible process steps decide who is cheaper in year two."
cover: "/assets/images/case-led-driver.webp"
coverThumb: "/assets/images/case-led-driver-700w.webp"
coverAlt: "LED driver board beside its aluminium housing, showing the through-hole transformer, electrolytic capacitors and mains terminal block"
---

An LED driver and a USB-C fast charger are the same board in different clothes: an AC-DC front end, a power-factor stage and a regulated output, inside a sealed enclosure nobody opens. The board is simple enough that a dozen shops can quote it, the volume is enormous, and buyers switch over fractions of a cent. That makes it the family where quote quality matters most and is checked least.

## Why the cheapest quote is usually comparing different products

On a dense fine-pitch board, a low quote is suspicious because the capability is visible. On a driver board, capability is not the differentiator — anyone can place it. What differs is what is included around the placement, and that is where the cheap quote and the expensive quote stop describing the same thing.

Five items account for most of the gap:

| Line item | What "not included" looks like | How it shows up later |
| --- | --- | --- |
| Through-hole magnetics | Quoted as a placement job; transformer pins flow-soldered on one side | Pin wetted on one side passes continuity, heats in service |
| Cleaning before coating | Coating applied over unwashed flux | Isolation degrades; failures appear in humid installations only |
| Coating mask and thickness | "Fully coated" with no keep-clear drawing | Barrier bridged at the optocoupler or the isolation slot |
| Potting fill and voiding | Potting quoted by weight, not by fill depth | Case temperature marginal; units fail in a sealed enclosure |
| Isolation test at first article | Optical inspection only | The creepage the layout specified was never verified |

None of these are exotic. They are simply the steps a supplier removes to reach a number, and they are exactly the steps that decide whether a driver survives five years in a streetlight.

## The through-hole problem is the honest one

Transformers, inductors and the input fuse are through-hole parts with real mass. A transformer pin carries current and mechanical load at the same time. Selective or wave soldering handles most of it; hand work fills in where a nozzle cannot reach.

Ask which soldering process is used, not what the price is. A quote that assumes wave soldering on the whole board and a quote that assumes hand soldering of the magnetics are different products. On a driver at 1,000 sets to 10,000 sets, the difference is visible in the second batch, when a few percent come back for a hot transformer.

## Thermal is a potting decision, not a layout decision

A driver runs inside a sealed enclosure with no fan. The switching devices and the transformer dissipate into the board and into the potting compound. Fill depth and voiding are therefore functional parameters.

The trap is that a unit which was fine on a bench in still air can be marginal once potted, if the compound was chosen for cost rather than conductivity. That choice belongs to the buyer, but it has to be raised before the batch rather than after — because once a unit is potted, the board inside it is not inspectable and not reworkable.

## Where this family stops being a good idea

Be clear about the commercial shape. A thousand to ten thousand pieces, enormous volume, thin margin, a board a dozen shops can build. Buyers switch on fractions of a cent. This is capacity filler for a high-mix floor, not a route to a durable relationship.

If the decision is purely unit price at high monthly volume, a dedicated high-volume plant beats a mixed-production floor, and it is fairer to say so than to win the order and lose it at the next re-quote. The reason to build it on a high-mix floor is different: small batches of several SKUs, long-tail variants, or a driver that ships inside a bigger product and has to match its change cadence.

## What to put in the enquiry

1. **Gerber, BOM and centroid**, plus the isolation slot geometry marked on the drawing.
2. **The soldering method expected for the magnetics** — this one question separates most of the field.
3. **Coating material, thickness, and the keep-clear zones.** A named material is better than "conformal coating".
4. **Whether the unit is potted, and to what fill depth.**
5. **The workload shape**, not just the annual volume: how many SKUs, how often they change. That is what a high-mix floor prices well and a volume plant prices badly.

The [LED driver and PD charger page](/applications/led-driver.html) states the batch band and says outright that a dedicated high-volume plant wins above ten thousand pieces a month. The [parking sensor board](/applications/parking-sensor.html) is the other family here where potting happens before the board can be tested, and the [power station inverter](/applications/power-station.html) shares the sealed-enclosure thermal argument. [Consigned versus turnkey PCBA](/insights/consigned-vs-turnkey-pcba.html) matters on this family more than most, because magnetics and electrolytics are where material price moves.

A driver quote is a process statement with a number attached. Read the process first.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Ask for a driver quote with the process shown: [WhatsApp](https://wa.me/8617361058693)*
