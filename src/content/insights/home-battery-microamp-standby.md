---
title: "The number a home battery is judged on is measured in microamps, and there is no microamp bench here"
seoTitle: "Residential Battery PCBA: The Standby Current Problem"
description: "Four boards in a home stack, and the figure buyers argue about is self-consumption. What assembly decides, and the measurements and approvals it cannot supply."
date: 2026-11-19
tags: Sourcing, Residential Storage, Decision
summary: "A home stack is judged on the days it does nothing. Where the assembly affects standby current, and which parts of the approval file never touch this building."
cover: "/assets/images/scene-residential-storage.webp"
coverThumb: "/assets/images/scene-residential-storage-700w.webp"
coverAlt: "Wall-mounted home battery and hybrid inverter side by side in a clean garage, with cable trunking down to a small distribution board"
---

A residential battery spends most of its life doing nothing. It charges in the morning, discharges in the evening, and then sits — for eighteen hours a day, for a decade — drawing a standby current that decides how much of the installed capacity the owner actually gets to use. Buyers argue about that number in datasheets and reviews. It is measured in microamps, and there is no microamp bench in this building.

That is worth saying at the top, because the rest of the page is about the parts of a home stack that assembly genuinely decides.

## Four boards, and only one is a power board

A hybrid home system is typically a module BMU, an inverter control board, a stack master and a communication board.

- **The module BMU** measures cell voltages and pack temperature and balances. It is repeated per module, so a defect is multiplied.
- **The inverter control board** is the one that looks like a power board: gate drive, current sense, the isolated sensing chain that has to stay honest across a decade.
- **The stack master** coordinates modules and enforces the disconnect logic. It is the board that has to be right when something else is wrong.
- **The communication board** is the cheapest and the one most likely to be replaced mid-life, which is an argument for connectors that survive being unplugged ten times.

## Sensing that has to stay honest for years

The voltage and current sense chain is a low-drift analogue problem, and the assembly contribution is not glamorous:

- **Cleanliness.** Leakage across residue shows up as drift, not as a dead board.
- **Thermal symmetry.** Two sense paths in different thermal environments read differently, and the layout decides that.
- **Coating, with the sense area treated deliberately.** Coating protects; coating over a humidity-sensitive divider without thought changes its behaviour.

What assembly cannot do is calibrate. The trim and the accuracy statement belong to you or to a calibration lab, because both need references this floor does not hold.

## Where this floor stops, and it stops early here

This is the family where the list is longest, so it is worth being blunt:

- **No cells and no pack.** Balancing, state-of-charge accuracy and protection thresholds are proven by you; there is no BMS-against-a-real-pack test here.
- **No grid-code or interconnection approval.** UL 1741, VDE-AR-N 4105 or the local equivalent, plus anti-islanding: neither tested nor certified here.
- **No system-level storage safety certification.** UL 9540 / 9540A or its local equivalent is not held, not tested, and the fire test runs on a pack this floor never sees.
- **No standby or sleep-current measurement.** There is no microamp-level bench and no long-duration logging, so a self-consumption figure has to come from your own measurement.
- **No pack-level or system-level end-of-line test**, no ingress testing, no drop testing.

None of that makes the build worthless. It defines what you are buying: boards assembled and recorded to a drawing, not a storage system validated.

## Two hundred to two thousand, and a grid-code file that is not ours

The band is 200 to 2,000 pcs, which is high-mix territory: several boards, several variants, revision pressure from firmware and from certification. The practical advice is to keep the board count stable and put variant change in the BOM rather than in the layout, because a layout revision mid-certification restarts work you have already paid for.

For the cabinet-scale version of the same argument, including the high-voltage spacing question, see [the rack BMS note](/insights/rack-bms-high-voltage-build-risk.html).

## What to send for a quote

Gerber with the stack-up and the isolation drawing, the BOM with the sense chain parts named, the centroid, the connector list with mating halves, the coating and mask list, and the quantity per board and per system. At 200 to 2,000 pcs a build is three working days from kitted parts.

The family page is [residential and stackable storage boards](/applications/residential-storage.html). For the three-board question in a portable unit, [should one assembler build all three power station boards](/insights/power-station-three-board-supplier.html).
