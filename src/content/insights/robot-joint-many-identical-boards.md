---
title: "A robot joint board is a circular board built twelve to forty times per machine"
seoTitle: "Robot Joint Actuator PCBA: Ten Boards Per Robot"
description: "One drive board per joint, twelve to forty per robot, each in a 30 mm circle with a GaN or MOSFET bridge. What repeatability means at this shape and count."
date: 2026-11-19
tags: Sourcing, Humanoid, Decision
summary: "The requirement on a joint board is not difficulty, it is sameness across dozens of units. Where panelisation, test coverage and heat decide whether a robot walks smoothly."
cover: "/assets/images/scene-humanoid.webp"
coverThumb: "/assets/images/scene-humanoid-700w.webp"
coverAlt: "Robot joint housing with the bearing and a drive board visible behind a clear cover, harness looping to a blurred gripper"
---

A humanoid or service robot does not have one controller. It has a dozen to forty of the same small board, one per joint, each driving a motor through a gearbox and reading an encoder. The buyer's instinct is to ask whether the board is hard to build. It is not. The real requirement is that board number thirty-seven behaves like board number one, because a robot that walks slightly differently on its left side is a calibration problem that the software team will spend a month on before anyone admits it is a build problem.

That is a different kind of question, and it is one an assembly floor can actually answer.

## Identical is the requirement, not a nice-to-have

Repeatability on this family is produced by four things, none of which is exotic:

- **One panel, many boards.** Circular joint boards are usually panelised with breakaway tabs or routed with v-cuts. How they are depanelised — and how much stress that puts on the parts nearest the edge — varies by operator unless the method is written down.
- **Same paste, same print.** A single stencil revision, printed with the same parameters, lot to lot. A print that drifts changes the fillet on the bridge devices and the thermal path under them.
- **Same reflow, measured.** The profile is developed per board and recorded, so that a reorder six months later starts from a number rather than from memory.
- **Same inspection criteria.** A board that passes on a Tuesday and would fail on a Friday is not a board; it is an opinion.

At 100 to 1,000 sets, that is 1,200 to 40,000 joint boards. Small enough that the whole run can be one or two panels' worth per build, which makes consistency easier than it sounds — provided nobody re-panels mid-run.

## Density and heat inside a 30 mm circle

A GaN or MOSFET bridge, a gate driver, current sense and an encoder interface in a 30 mm circle with a motor connector on one edge. Three consequences:

- **Thermal mass is uneven.** The bridge sits on heavy copper and the driver on thin traces. Reflow has to serve both in one pass, and the profile is a compromise that has to be documented.
- **Voids under the bridge matter twice over.** The joint is the electrical path and the thermal path in a board that has nowhere to put a heatsink.
- **Connector landing takes the load.** The motor and encoder connectors are the only mechanical interface, and they are what gets yanked during assembly of the joint.

X-ray on the bridge joints is the inspection that matters on this family, and it is worth asking for the images rather than the pass rate.

## What is not done here, and why it matters at prototype speed

A humanoid programme moves quickly, and the temptation is to treat the assembler as a source of everything. It is not:

- **Joint calibration, torque-constant measurement and encoder alignment** need the actuator and the gearbox. They belong to you.
- **Robot-level functional and safety testing** and certification of the finished machine are outside this building.
- **Volumes above roughly 5,000 joint boards a month** are where a dedicated line beats a high-mix floor on unit price. Below that, changeover is a smaller cost than a dedicated line's idle time.

One practical note for a prototype programme: at these volumes, the cost of a revision is close to the cost of the boards. Getting the DFM review right before the stencil is cut is worth more here than on almost any other family, for the simple reason that a mistake is multiplied by the joint count.

## What to send for a quote

Gerber with the panelisation, the stack-up, the BOM with the bridge devices named by package, the centroid, the motor and encoder connector drawing, the inspection callout for the bridge joints, and the quantity in boards and in sets. Also say how the boards will be depanelised if you have a preference, because otherwise it will be decided here.

The family page is [robot joint and actuator boards](/applications/humanoid.html). For why a first run and a reorder price differently, see [why the second run costs less](/insights/why-the-second-run-costs-less.html), and for the shape of a small-run quote, [why fifty pieces cost more per board](/insights/fifty-piece-run-cost.html).
