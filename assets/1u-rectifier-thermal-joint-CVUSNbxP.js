const e=`---
title: "A 1U rectifier board is a thermal part with a circuit attached"
seoTitle: "48 V Rectifier and PSU Board Assembly: The Thermal Problem"
description: "On a server power shelf the joint under the power device decides the life of the unit, and AOI cannot see it. What to specify, and what cannot be measured."
date: 2026-11-19
tags: Sourcing, AI Power, Decision
summary: "A rack rectifier is a PFC stage and a DC-DC stage on one heatsink, and the failure that matters is invisible from above. Where the build risk sits on a 1U power board."
cover: "/assets/images/xray-inspection.webp"
coverThumb: "/assets/images/xray-inspection-thumb.webp"
coverAlt: "X-ray image of BGA and power device solder joints on a screen at the inspection station"
---

A 1U rectifier module is usually described by its output — 3 kW, 48 V, 97 % efficient. Almost none of that is decided on the assembly floor. What is decided on the assembly floor is whether the joint under the switching devices and the thermal pad between the board and the heatsink is continuous, because that joint is what the efficiency figure quietly depends on.

This is the one board family where the inspection step, not the placement step, is the interesting part of the quotation.

## What is on the board

Two power stages and a control section, usually on one board:

- **PFC front end.** Boost stage, bridge or bridgeless, with the inductor and the current sense. This is the part that decides input current shape and therefore whether the unit passes harmonic limits.
- **DC-DC stage.** Isolated converter producing the 48 V or 12 V bus, with synchronous rectification on the secondary.
- **Auxiliary supply.** The small converter that keeps the control alive when the main stage is off. Cheap, hot, and the usual cause of a unit that will not start.
- **Control and telemetry.** The MCU, the PMBus or CAN interface, and the fan and hot-swap logic that makes a shelf of these behave.

Dense, double-sided, heavy copper on the power side, and fine-pitch on the control side. Both extremes on one panel is what makes the stencil and the reflow profile a compromise rather than an optimisation.

## The void you cannot see

Under a power MOSFET or a rectifier in a QFN or LFPAK, the thermal pad is the only path to the copper. If the paste coverage under that pad is 60 % instead of 90 %, the board passes every electrical test at room temperature and runs twenty degrees hotter in a shelf. Nothing on the top side shows it. AOI sees the fillet, not the void.

X-ray is how that joint is judged, and on this product it is read by an operator against a limit rather than accepted on a green light. That is the one inspection step on this family that a buyer should ask about by name, because a line that has X-ray and a line that reads X-ray are not the same supplier.

The same reasoning applies to the interface between the board and the heatsink: the pad or the paste, the flatness of the board, and the torque on the mounting screws. A warped board with a good pad still leaves an air gap in the middle.

## Thick copper changes the reflow profile, not the placement

Power boards carry 2 to 4 oz copper on the power side and 1 oz on the control side. The thermal mass difference across one panel means the profile has to be developed for that board, not reused from the previous job. That is one honest reason a first run is more expensive than the second: the profile work happens once, and it happens properly or it happens again.

On this floor the profile is developed per board and the first article is X-rayed and photographed before the lot proceeds.

## Where the high-current path lands

The 48 V output leaves the board through busbar tabs, press-fit pins, or screw terminals. All three are mechanical joints with an electrical job:

- Press-fit needs the right hole tolerance and the right insertion tool; a reamed hole gives you a joint that passes and later opens.
- Screw terminals need a specified torque and a washer that does not cold-flow.
- Solder tabs on thick copper need enough heat and enough time, and both are limited by what the parts nearby will survive.

These are specified on your drawing and executed here. If the drawing does not specify the torque or the press-fit force, the build will use a house default, and a house default is not a design decision.

## Coating on a rack power board

Most 1U rectifiers are not coated. The airflow through the shelf is the environmental control, and coating the power side adds thermal resistance exactly where the design cannot afford it. Where coating does appear is on the control and telemetry side, or on units sold into humid or coastal sites.

That is a callout to make deliberately: what is coated, what is masked, and why the power side is excluded. A blanket "conformal coat, whole board" on a 3 kW module is a thermal decision made by accident.

Potting is not done here, and on this family that is rarely a loss — the enclosure and the airflow are doing the work.

## What an assembler cannot measure for you

The number on the datasheet is efficiency at a defined load, and it is measured on a load bank with power analysers, at temperature, over time. That measurement happens at the module designer, not here.

So the honest scope line on a rectifier enquiry is: placed, reflowed, X-rayed on the thermal joints, inspected, recorded. Not characterised. If your qualification plan needs the efficiency curve from the build lot rather than the design, that is a test house or your own bench, and it is worth saying so before the order rather than after.

The same applies to hold-up time, inrush, conducted emissions and transient response. All of them are properties of the design, exercised on equipment this floor does not have.

## What records matter here

- X-ray images of the thermal-pad joints, per device type, filed against the lot
- The reflow profile used, with the board revision it was developed for
- First-article photographs of the busbar or press-fit joints before and after insertion
- SPI results on the fine-pitch side, since a thin print there is a separate failure from a void

## What to send for a quote

The BOM with the power devices named by package and not just by part number, the copper weights per layer, the stack-up, the drawing showing the thermal interface and the mounting torque, the connector and busbar list, and the quantity per variant.

The family page for this product is [AI and data centre power boards](/applications/ai-power.html). For the inspection question in general, [what AOI and X-ray still cannot catch](/insights/what-aoi-xray-cannot-catch.html) is the companion note, and [what a PCBA quote should contain](/insights/pcba-quote-what-it-should-contain.html) covers the scope lines that keep this kind of order honest.
`;export{e as default};
