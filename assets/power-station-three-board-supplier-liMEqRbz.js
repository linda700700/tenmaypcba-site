const e=`---
title: "Should one assembler build all three portable power station boards?"
seoTitle: "Power Station PCBA: One Assembler for All Three Boards"
description: "The BMS, the inverter and the display fail for different reasons but share one battery and one certificate file. What to keep together, what to split."
date: 2026-11-17
tags: Sourcing, Power Station, Decision
summary: "The inverter is the board that decides the product. Keeping it with the BMS removes an arbitration argument; splitting the display costs almost nothing."
cover: "/assets/images/case-power-station.webp"
coverThumb: "/assets/images/case-power-station-700w.webp"
coverAlt: "Portable power station with its case opened showing the battery pack, inverter board and display panel assembly"
---

A portable power station is three boards: the battery management board, the inverter board that produces the AC output, and the display board that reports state of charge. They share one battery, one enclosure and one certification file. That shared context is what makes the sourcing decision different from the e-bike controller and display, where the two boards answer to different masters.

## The inverter is the board that decides the product

Everything a buyer notices about a power station comes from the inverter. Whether a resistive load starts, whether a motor load trips, whether the output is a clean sine or a modified square, whether the unit hums under a light load — all of it is the inverter control board.

That makes the inverter the board where a build defect is diagnosed as a design problem. A cold joint on a switching device, a bus capacitor fitted with the wrong lead length, a gate resistor that drifted — each one presents to the end user as a product that is not very good, not as a board that was assembled badly. If you split the inverter away from the rest, understand that you have also split the diagnosis.

## What the three boards need from an assembler

| Board | What actually decides its build | Cost of splitting it |
| --- | --- | --- |
| BMS | Cell sense channels, balancing resistors, protection thresholds; high layer count and fine pitch | Low — a self-contained board with a clear specification |
| Inverter | Bus capacitance, heavy copper, thermal vias, and the timing of the pure-sine control stage | High — every field complaint about output quality lands here |
| Display | Low density, a segment or dot-matrix driver, one harness connector | Low — cosmetic, versioned independently |

The BMS and the display are both reasonable to source elsewhere. The inverter is the one worth keeping where the rest of the power path is, because the questions you will ask about it are system questions.

## The battery is the reason to couple the first two

The BMS and the inverter meet at one place: the DC bus. Protection thresholds on the BMS decide when the inverter stops being fed; the inverter's inrush decides whether the BMS sees a fault or a load. Tuning that pair is a conversation between two boards.

When both boards come from one assembler, that conversation happens inside one supplier and the buyer receives a tested set. When they do not, the buyer arbitrates, and the arbitration usually consists of forwarding emails between two suppliers who each have a correct explanation.

## What the certification file changes

There is a second coupling that has nothing to do with function: the product certificate. The certificate is issued to the brand owner for the finished unit, and the evidence behind it is generated at build. Which means the record set — reflow profiles, lot traceability, coating records, serial-to-lot mapping — matters here in a way it does not for a simple accessory.

If the boards come from three shops, you need three record sets that agree with each other and a way to tie them to one serial number. That is doable, and some brands do it deliberately. It is simply one more thing the buyer owns, and it should be a decision rather than an accident.

## When one assembler is the better answer

- **The batch is small.** At 100 sets to 500 sets, three separate setups with three separate first-article approvals is a large share of the total. One set of files, one changeover, one approval is materially cheaper.
- **You are still tuning the product.** A first or second revision moves between BMS limits and inverter behaviour. One supplier shortens that loop.
- **Nobody on your side owns the DC-bus interface.** If the interface document only exists in two suppliers' heads, you are one resignation away from losing it.

Split when the display is the only thing changing, when your volumes have outgrown one shop's capacity, or when you have an engineering team that already maintains the interface documentation.

## What to put in the enquiry

1. **Gerber, BOM and centroid** for all three boards, as three sets.
2. **The output specification**: continuous and peak rating, and whether the output must be pure sine. The control stage is not the same board for both.
3. **Battery chemistry and configuration**, because cell count sets the BMS sense channel count and the connector.
4. **Whether the set is potted or conformally coated**, and which connectors stay clear.
5. **Whether the three boards are one purchase order.** A supplier who knows they ship as a set will test them as a set; one quoting three independent lines will not.

The [portable power station page](/applications/power-station.html) carries this floor's batch band and the three-board split. The [EVSE control board](/applications/evse.html) is the other family on this site where the certification record, not the unit price, is the deciding factor, and the [servo drive](/applications/servo.html) shares the same heavy-copper-beside-fine-pitch problem as the inverter. If you are comparing quotes that differ mainly on setup charges, [why a fifty-piece run costs more per board](/insights/fifty-piece-run-cost.html) separates the fixed side from the variable side.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Send a board stack for review: [WhatsApp](https://wa.me/8617361058693)*
`;export{e as default};
