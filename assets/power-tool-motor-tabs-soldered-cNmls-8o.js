const e=`---
title: "The motor tabs on a power tool controller are soldered, and that is the whole job"
seoTitle: "Brushless Power Tool Controller PCBA: The Motor Tabs"
description: "A heavy-copper bridge, through-hole tabs into a motor, and a handle with no airflow. Where a tool controller build actually fails, and what to specify."
date: 2026-11-19
tags: Sourcing, Power Tool, Decision
summary: "One or two boards, thousands of identical pieces, and a joint carrying twenty amps inside a sealed handle. Why the through-hole tabs and the coating decide field life."
cover: "/assets/images/scene-power-tool.webp"
coverThumb: "/assets/images/scene-power-tool-700w.webp"
coverAlt: "Cordless drill driver standing on a scratched workbench with its battery pack fitted, chuck and bit in place, wood shavings around"
---

A brushless tool controller is a power board that lives inside a handle. No fan, no airflow, no service access, and a user who will run it until the battery is flat and then put it down hot. The circuit is a three-phase bridge, a gate driver, current sense and a microcontroller that reads a trigger. Simple.

What is not simple is that the board's two hardest joints are the ones carrying the motor current, and they are made by hand or by selective solder rather than by the placer. On a tool, the assembly's job is those joints, the coating, and the fact that there are five thousand of them.

## A power board, not a computing board

Two or three ounces of copper on the power side, a heavy-copper bridge under a heatsink or a potted block, and a control section that could fit on a fingernail. Everything about the build follows from that split:

- **The bridge needs a documented reflow profile.** Heavy copper on one side and fine traces on the other is a compromise, and a profile borrowed from another board is a latent void.
- **Voiding under the FETs is the yield number.** Not the placement count, not the AOI pass rate. A voided joint on a 20 A bridge is a device that runs hot and derates in the user's hand.
- **The heatsink interface is mechanical.** Pad or paste, flatness, and the torque on the mounting screws. All three belong on the drawing.

## The motor tabs are soldered, not placed

The motor connects to the board through tabs or a terminal block, and that joint carries the full phase current. It is through-hole, it is thermally massive, and it is done in-house here by selective or hand solder with the joint specified and inspected.

Three failure modes are worth naming because none of them shows up on an AOI screen:

- **Insufficient fill.** Looks soldered, measures cold, heats under load, fails in month four.
- **Cold joint on a plated tab.** No amount of flux fixes a surface that will not wet; it needs the plating and the paste to be compatible.
- **Mechanical load applied to the joint.** If the tab is also the mounting point, the solder is taking vibration, and the drawing should say what takes it instead.

This is the single reason a tool controller is not a commodity assembly: the joints that decide the warranty are the ones a placer never touches.

## Coating, and the housing that is not ours

Most tool controllers are coated, because a tool gets rained on and put down in wet grass. It is applied here with connectors and the battery contacts masked.

Two things coating is not: it is not potting, and it is not the housing seal. Potting is not done here, and closing the handle around the board is the tool brand's operation. A design that relies on the coating for water ingress is asking it to do a job it was not specified for — the same argument as on a storage board, at a much lower voltage.

## Batch size, and why the volume argument turns early

A tool programme is usually 1,000 to 5,000 sets, and above roughly 10,000 sets a month a dedicated high-volume line wins on unit price honestly. The reason is not mystery: at that volume the line is set once and run, and changeover stops being a share of the unit cost.

Between those two points, a high-mix floor is the right counterpart, and the thing that decides your price is not the placement count but how many variants you have. A single controller in three firmware variants is one build; three power levels with different bridges is three.

## Where this floor stops

- **Motor, gearbox and switch test under load.** A dynamometer or torque rig belongs at the tool brand's end-of-line station.
- **Potting, overmoulding and closing the housing** around the board.
- **Tool-level safety or regulatory testing** — the certification belongs to the finished tool.
- **Volumes above roughly 10,000 sets a month**, where a dedicated line wins.

## What to send for a quote

Gerber with copper weights per layer, the stack-up, the BOM with the FETs named by package, the motor tab and terminal drawing with the joint called out, the heatsink interface and torque, the coating and mask list, and the quantity per variant. At 1,000 to 5,000 sets a build is three working days from kitted parts.

The family page is [brushless power tool controllers](/applications/power-tool.html). For how the unit price is actually built up, see [what is inside a PCBA price](/insights/pcba-cost-per-board.html), and for the inspection argument, [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html).
`;export{e as default};
