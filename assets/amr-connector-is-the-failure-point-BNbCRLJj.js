const e=`---
title: "On an AMR the connector fails before the solder joint does"
seoTitle: "AMR and AGV Board Assembly: Where Robots Fail First"
description: "Two to four boards per robot, a battery interface at 48 V and connectors that are unplugged during service. What an assembly floor decides on an AMR programme."
date: 2026-11-19
tags: Sourcing, AMR, Decision
summary: "Drive, battery and sensor boards in a vehicle that gets serviced. The failure that matters is mechanical, and it is decided by connector choice and coating, not by placement."
cover: "/assets/images/scene-amr-agv.webp"
coverThumb: "/assets/images/scene-amr-agv-700w.webp"
coverAlt: "Low-profile AMR carrying a pallet of cartons along a warehouse aisle, lidar on top and a blue light strip across the front"
---

An AMR or AGV carries two to four boards: a drive board per wheel pair or per motor, a battery interface board, and something that talks to the sensors. A fleet is a hundred robots; a hundred robots is four hundred boards, then another four hundred when the fleet doubles.

The boards are not the hard part. The hard part is that every one of them is inside a vehicle that gets opened, serviced, unplugged and pushed by a technician in a warehouse at eleven at night. The joint that fails in that story is almost never a solder joint.

## Two or four drives, one battery interface

The drive boards are power boards with isolation between the control side and the motor side, current sense and a brake or enable path. The battery board is the interesting one: 48 V nominal, contactor or MOSFET disconnect, pre-charge if the design has it, and a sense chain that has to be accurate at both ends of the state of charge.

That mix means one build carries three different risks at once:

| Board | Dominant risk | Where it is decided |
|---|---|---|
| Drive | Thermal path under the bridge, isolation spacing | Stack-up, paste volume, reflow profile |
| Battery interface | Creepage at 48–58 V, contactor joint quality | Drawing, through-hole fill, torque spec |
| Sensor / comms | Connector integrity, EMI | Connector choice, shielding, coating |

A quote that prices all three as "boards" without separating them hides exactly the part you need to manage.

## The connector is the failure point, not the placement

A robot board gets unplugged far more often than a consumer board. Three consequences, all decided before the order:

- **Latched, keyed, and rated for cycles.** A connector that is not rated for the number of mating cycles the service procedure implies is a warranty cost with a part number.
- **Strain relief at the board edge.** A harness in a robot hangs and moves. A connector held only by its solder joints is a cold joint waiting for its third service visit.
- **Field-replaceable without a soldering iron.** If a technician has to rework the board in the field, the design has already lost.

Coating enters the same argument: it buys tolerance to dust and condensation, and it does nothing for a housing that takes water. On a warehouse floor with a wash-down next door, that distinction is the whole reliability question.

## Prototype to fleet: what changes with volume

At 100 to 1,000 sets, small-volume habits carry a programme a long way. What changes as the fleet grows is not the placement difficulty but the amount of information you need per unit — and that is where an assembler without in-circuit test becomes a problem you have to plan around rather than discover.

There is no in-circuit test and no functional test on this floor. If the fleet needs per-serial electrical proof, the fixture and the programme are yours to specify, and the arrangement has to be in writing before the first build. That is a workable arrangement; an unstated one is not.

## Where this floor stops

- **Vehicle-level safety certification and the standards file.** That sits with the robot builder and a test house.
- **Motor-load test on a running chassis, and any in-house in-circuit or functional test.**
- **Potting, encapsulation, or bonding the board to a thermal chassis.**
- **Underfill or staking as a standard step.** It is agreed per design at DFM, never assumed.

## What to send for a quote

Gerber with the stack-up and the isolation drawing, the BOM, the centroid, the connector list with mating halves and cycle ratings, the through-hole joint callouts with torque where relevant, the coating and mask list, and the quantity per board type. At 100 to 1,000 sets the build is three working days from kitted parts.

The family page is [AMR and AGV drive and battery boards](/applications/amr-agv.html). If per-serial electrical proof matters to your fleet, [what to do when your assembler has no in-circuit test](/insights/in-circuit-test-outsourcing.html) is the note to read before the order, and [what a PCBA quote should contain](/insights/pcba-quote-what-it-should-contain.html) covers the scope lines.
`;export{e as default};
