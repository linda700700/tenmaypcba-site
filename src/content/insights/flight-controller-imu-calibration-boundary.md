---
title: "A flight controller is one IMU away from being scrap, and nobody here can tell you which one"
seoTitle: "Drone Flight Controller PCBA: Where the Build Risk Sits"
description: "Two or three boards per drone, one fine-pitch IMU, and a calibration step done after the board leaves. What assembly can and cannot decide for a UAV."
date: 2026-11-19
tags: Sourcing, UAV, Decision
summary: "The flight controller is a small board whose hardest requirement is a sensor alignment done somewhere else. What to specify here, and what belongs to the aircraft maker."
cover: "/assets/images/scene-uav.webp"
coverThumb: "/assets/images/scene-uav-700w.webp"
coverAlt: "Quadcopter drone in flight over farmland, carbon fibre arms, rotors and a gimbal camera, flight controller visible under the centre plate"
---

A drone programme usually arrives as three boards: a flight controller, an ESC or ESC-per-arm, and something for the payload. None of them is hard to place. What makes the flight controller different from every other fine-pitch board on this site is that its most important property — where the inertial sensor actually sits and which way it points — is fixed by a calibration step that happens in the airframe, long after the board was inspected and packed.

That has a consequence buyers should hear before the order rather than after: this floor can build a board that calibrates cleanly, and cannot tell you whether it did.

## What a flight controller is, physically

A small board, usually four to six layers, with a fine-pitch IMU at the centre, a barometer, a magnetometer if the design carries one, and a connector set that has to survive being plugged and unplugged by somebody with cold hands in a field.

Three things on it decide whether the build is repeatable:

- **The IMU's placement relative to the board datum.** Not the absolute position — the consistency of it, board to board, so that the airframe calibration offsets stay in a narrow window.
- **Strain around the IMU.** A board that flexes under a mounting screw transmits that flex into the sensor. Where the mounting holes sit relative to the part is a layout decision; how much paste and how much reflow stress land on the part is an assembly one.
- **The connector and pad finish.** A USB or SWD connector that lifts a pad on the third reflash is a bricked board, and it happens after your test, not during it.

## The ESC board is the opposite problem in the same airframe

The ESC is heavy copper, big FETs, high current, and thermal management into an arm that is often carbon fibre with poor conductivity in the direction you need. It is a power board with a narrow margin in a very small volume.

| Board | What decides it | What assembly controls | What it cannot |
|---|---|---|---|
| Flight controller | Sensor placement and firmware | Paste volume, reflow profile, strain around the IMU, connector integrity | Calibration, sensor fusion, flight behaviour |
| ESC | Thermal path and current density | Voiding under the FETs, heavy-copper joint quality, coating if specified | Thrust, timing, motor compatibility |
| Payload | Interface and power budget | The same as any mixed-signal board | Whatever the payload does |

The two boards fail for reasons that never overlap, which is why a single "drone PCBA" quote that does not separate them is a quote you cannot audit.

## What inspection proves here, and what it does not

SPI before reflow, AOI after, X-ray on the IMU and the ESC power joints, and first-article photographs. That set proves the board was assembled to the drawing and that the joints under the parts you cannot see are formed.

It does not prove the IMU is straight in the way that matters. Tilt of a fraction of a degree is invisible to X-ray and readable only by the airframe calibration routine. If your yield model assumes the board is "good" because it passed inspection, the model is missing the step that actually decides it.

This is also why a returned-board argument is worth settling in writing: if a drone flies badly, the board, the calibration and the airframe are three suspects, and only one of them was ever in this building.

## Where this floor stops

- **Inertial calibration, sensor-fusion tuning and flight test.** These belong to the aircraft maker, who owns the fixture and the firmware.
- **Radio, EMC, and any airworthiness or spectrum approval** for the finished aircraft.
- **AS9100 process control, NADCAP special processes, ITAR-registered and export-controlled programme handling.** None of these are held here, and a defence or restricted programme should not start with this floor.
- **Potting or encapsulation** of a board. Coating is what happens here.

## What to send for a quote

Gerber with the stack-up, the BOM with the IMU and any alternate named exactly, the centroid, the connector list with the mating half, the coating callout if the ESC is coated, and the quantity split across the two or three boards. At 100 to 1,000 sets the build is three working days from kitted parts, so the clock that actually matters is component lead time, not the line.

The family page is [UAV and flight controller boards](/applications/uav.html). For what inspection genuinely covers, see [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html); for the lead-time argument, [the four clocks inside a PCBA lead time](/insights/four-clocks-in-a-pcba-lead-time.html).
