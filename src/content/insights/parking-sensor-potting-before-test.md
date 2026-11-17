---
title: "Potting before test turns a defect into scrap"
seoTitle: "Parking Sensor PCBA: Test Before You Pot the Board"
description: "On a small potted board, the order of the last two steps decides the scrap rate. Once the compound cures, nothing inside is inspectable or reworkable."
date: 2026-11-17
tags: Sourcing, Parking Sensor, Potting, Decision
summary: "The board is cheap and the potting is irreversible. Sequence the test before the encapsulation and a defect costs one board; sequence it after and it costs the unit."
cover: "/assets/images/case-parking-sensor.webp"
coverThumb: "/assets/images/case-parking-sensor-700w.webp"
coverAlt: "Parking sensor kit laid out with the display unit, control board, four ultrasonic sensors and cable harness"
---

A parking sensor control board is small, heavily panelised, and almost always conformally coated or potted, because it lives behind a bumper and sees water, salt and stone chips. Nothing about the board is difficult. The decision that matters is the order of the last two operations.

## The irreversible step

Coating is reversible in principle — it can be stripped, with effort and some risk to the board. Potting is not. Once the compound cures, the board inside it is not inspectable, not reworkable and not repairable. A defect that would have been a two-minute rework becomes a scrapped unit with the compound, the housing and the labour already spent.

That means the test coverage question is not "how much testing do we want". It is "what must be proven before the point of no return".

| Stage | What it catches | Before or after potting |
| --- | --- | --- |
| SPI | Paste print, before reflow | Before — in line |
| AOI | Placement and visible fillet | Before — in line |
| X-ray | Hidden joints under packages | Before — in line or sampled |
| Electrical test | Continuity, shorts, values | **Must be before** |
| Functional test | The board responds to a simulated sensor | **Must be before** |
| Dielectric or insulation check | Isolation, if the design has a barrier | **Must be before** |
| Visual after potting | Voids, incomplete fill, contamination | After — and it is a cosmetic check only |

Read that table as a deadline. Everything above the potting line has to be settled before the compound goes in, because after it you are not inspecting a board, you are inspecting a surface.

## Where the small board creates the test problem

The physical difficulty on this family is access. A board small enough to be heavily panelised has little room for test points, and if the design put the test pads under where the housing sits, they may be unreachable once assembled.

Two practical consequences:

- **Test points are a DFM item, not a test item.** If they are not on the Gerber in accessible locations, the fixture discussion is over before it starts. Raise it with the layout, not with the assembler after the first batch.
- **Panellisation decides whether test is cheap or expensive.** Testing in panel form is generally faster; testing after depanelisation means handling a small board with a connector on it. Ask which one the fixture assumes.

## Coating and potting are not the same decision

Buyers often use the two words interchangeably, and they should not.

| Method | Protects against | Cost | Reversible | Where it fits |
| --- | --- | --- | --- | --- |
| Conformal coating | Humidity, condensation, some contamination | Lower; a mask drawing and a spray or dip step | With effort | Boards that may need rework, larger boards |
| Full potting | Immersion, vibration, thermal cycling, mechanical shock | Higher; compound, mould or housing, cure time | No | Small boards in harsh locations — this family |

On a bumper-mounted board the case for potting is strong. The cost is that you have moved the entire quality burden earlier in the process, and you cannot inspect your way out of it afterwards.

## What to agree before the first batch

1. **The exact point of no return**, written into the process: which tests run before encapsulation, and what the pass criteria are.
2. **Who owns scrap after potting.** A board that fails electrical test before potting is a board. A potted unit that fails at the brand's end-of-line is a disagreement. Agree the attribution before it happens.
3. **Fill depth and voiding acceptance.** "Potted" is not a specification. Fill depth, allowed void size and the visual criteria should be on the drawing.
4. **Coating mask zones**, if coating is used instead — which connectors, which pads, which test points stay clear.
5. **Whether the compound is chosen for thermal conductivity or cost**, because on a sealed board that choice is a thermal decision.

## Where this floor's limits show

Small, heavily panelised boards are ordinary work here, and coating and potting both run in-house. What is not in-house is in-circuit and functional test — the fixture is product-specific and belongs with whoever owns the design. So the sequence question has a specific answer on this family: the electrical and functional proof needs to happen at your end or at a fixture you control, and it needs to happen before the board is encapsulated.

That is not a gap in the assembly. It is the natural consequence of a board that is cheap to build and expensive to scrap.

The [parking sensor and headlight driver page](/applications/parking-sensor.html) states the coating and potting capability and the 500 sets to 5,000 sets band. The [LED driver](/applications/led-driver.html) has the same potting-before-test problem with a mains barrier on top, and the [dashcam sensor carrier](/applications/dashcam.html) is another small board where a step after assembly decides the product. [What AOI and X-ray cannot catch](/insights/what-aoi-xray-cannot-catch.html) is the general version of the coverage question.

Decide the sequence before the compound. Afterwards, it is not a process decision, it is a scrap decision.

On an unchanged revision the standard build here is 3 days from kitted parts, which is the number to plan a reorder against rather than a promise about component lead time.

*Last reviewed: 2026-11-17 · Discuss a potted board build: [WhatsApp](https://wa.me/8617361058693)*
