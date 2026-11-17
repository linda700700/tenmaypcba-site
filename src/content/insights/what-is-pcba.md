---
title: "What is PCBA? PCB vs PCBA, and what the extra letter buys you"
seoTitle: "What Is PCBA? The Difference Between PCB and PCBA"
description: "PCB is the bare board. PCBA is that board with the parts soldered on, inspected and ready to install. What the assembly step includes — and what it does not."
date: 2026-11-17
tags: Basics, Assembly, Buying
summary: "PCB is copper, mask and silkscreen with no parts. PCBA is the board plus components, soldered and inspected. The distinction decides who can quote you and which half of the job you are buying."
cover: "/assets/images/macro-joints.webp"
coverThumb: "/assets/images/macro-joints-thumb.webp"
coverAlt: "Macro photograph of solder joints on an assembled board"
---

PCBA means printed circuit board assembly: a bare PCB with the components soldered onto it, inspected, and ready to install. PCB is the bare board on its own — copper, mask and silkscreen with no parts. A PCBA supplier therefore buys or is given bare boards and adds the assembly step, which is exactly the split we work in: bare boards from partner fabs, everything after that in our Shenzhen plant.

## The three-letter difference, stated plainly

| Term | What it is | Who makes it |
|---|---|---|
| **PCB** | The bare board: substrate, copper traces, solder mask, surface finish. No components. | A PCB fabricator (a "board house") |
| **PCBA** | That board plus components, soldered and inspected. A functional assembly. | A PCBA contract manufacturer (an "assembly house", an EMS provider) |
| **SMT** | One of the processes used to make a PCBA — surface-mount technology, parts placed and reflowed on the surface. | The same assembly house |

The confusion is not cosmetic. It decides who can quote you: a board house cannot assemble, and an assembly house that does not fabricate must buy the bare board from someone. When a supplier says "we do PCB and PCBA", ask which of the two happens in their building.

## What an actual PCBA order contains

Assembly starts from three files. Everything else is a refinement:

| File | What it tells the factory |
|---|---|
| **Gerber** (RS-274X or ODB++) | The physical board — copper, mask, paste layers, panelisation |
| **BOM** with manufacturer part numbers | What to buy, in what package, per reference designator |
| **Centroid / pick-and-place** | Where each part goes, at what rotation, on which side |

Useful additions: stackup drawing for controlled impedance, test-point list, firmware binary, and any approved alternates. A quote built without a BOM is a guess about material cost, and material is usually the largest line on it.

## Which processes count as part of PCBA

A full-scope assembly house covers all of these in one building. Many cover only the first two:

1. Solder paste printing and **3D SPI** (paste volume, height, area, offset)
2. **SMT placement** and reflow
3. **AOI** after reflow, and **X-ray** on BGA/QFN joints that optics cannot see
4. **Through-hole insertion** and wave or selective soldering
5. **Hand and post soldering** for connectors, shields and heavy terminals
6. **Conformal coating**, potting and underfill
7. **Depanelling** and **device programming** with checksum binding
8. **Box build**, harness, kitting and retail packing

Ask which of the eight happen on site. "We do turnkey" is not an answer to that question.

## What PCBA does not include

Two things are routinely assumed and routinely wrong:

- **Bare-board fabrication.** Many assembly houses, including ours, do not fabricate. Boards are purchased from qualified partner fabs and inspected on arrival. That is a supply choice, not a quality shortcut — but you should know which model you are buying.
- **Electrical test.** SPI, AOI and X-ray prove that solder joints are formed correctly. They do not prove the board works. In-circuit test (ICT) and functional test (FCT) are a separate purchase, and a plant can legitimately be excellent at assembly and not own a tester.

If a supplier's answer to "do you test it?" is "we inspect 100%", they have answered a different question.

## How to tell an assembly house from a PCB house in one minute

Three questions, in this order:

1. **"Do you fabricate the bare board, or buy it?"** Either answer can be fine. An unclear answer is not.
2. **"What is your finest placement pitch, on which machine, on which line?"** A capability claim without a machine and a line assignment is marketing.
3. **"Which operations in your process are subcontracted?"** Every plant subcontracts something. A plant that says "nothing" is not answering.

## Where we sit in this split

We are an assembly house, not a PCB fabricator, and we say so first. Eight Yamaha YSM20/YSM10 lines, 01005 to 0.30 mm pitch, boards to 800 × 480 mm double-sided, in-line 3D SPI, AOI and X-ray on every shift, with through-hole, selective solder, conformal coating, programming and box build in the same building. Minimum order 50 pieces, three working days from kitted parts.

Bare boards come from qualified partner fabs. In-circuit and functional test are not in the building — they run through a qualified partner and are quoted as their own line. Both facts are on [capabilities.html](/capabilities.html), because a buyer who finds out at tooling stage has been misled by omission.

The step-by-step version of the process is on [assembly.html](/assembly.html). If your next question is what the assembly step costs, [what is inside a PCBA price](/insights/pcba-cost-per-board.html) breaks it into five lines.
