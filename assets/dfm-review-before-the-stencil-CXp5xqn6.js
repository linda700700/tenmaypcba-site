const e=`---
title: "What a DFM review catches before the stencil is cut"
seoTitle: "PCBA DFM Review: What It Catches Before the Stencil"
description: "Ten checks a fabricator makes on your Gerber and BOM before quoting, which of them change the price, and which are cheaper to answer than to discover at setup."
date: 2026-11-15
tags: DFM, Engineering, Assembly
summary: "A DFM review is not a courtesy. It is the last point where a change costs a file edit rather than a stencil, a scrap batch or a hand-rework line."
cover: "/assets/images/macro-joints.webp"
coverThumb: "/assets/images/macro-joints-thumb.webp"
coverAlt: "Macro photograph of a reflowed QFP lead row showing solder fillets and pad alignment"
---

Design for manufacture is usually described as a set of rules. In practice it is a set of decisions with deadlines. Every check below is cheap while the design is a file, expensive once a stencil exists, and unrecoverable once a batch has been built.

## The ten checks, in the order they bite

**1. Aperture and pad geometry against the smallest part.** A 01005 chip and a 0.3 mm-pitch IC do not share a paste strategy. Apertures that suit one starve or bridge the other. This is the check that most often produces a design change, because it is a drawing edit rather than a component change.

**2. Panelisation and breakaway.** How the board is arrayed decides how many fit through the line per pass, whether the assembly can be depanelised without stressing joints, and where the fiducials go. A board can be perfectly designed and panel badly: mouse-bites in the wrong place, no rail to clamp, tooling holes absent.

**3. Fiducials and local references.** Global fiducials for the panel, local ones for fine-pitch parts. Missing references mean the machine places by board outline and the accuracy you paid for is not used.

**4. Component orientation and polarity.** Diode and electrolytic polarity marked unambiguously on the silkscreen, pin 1 marked on every multi-pin package. A board with ambiguous orientation will eventually be built wrong, and the rework is a hand operation.

**5. Courtyard and spacing.** Parts placed so the nozzle can reach them and the reflow air can move around them. Two tall components side by side shadow each other; a part against a tall connector cannot be placed after it.

**6. Thermal balance.** Large copper pours and thick ground planes pull heat out of a joint. A board with a heavy plane on one side and fine-pitch parts on the other needs a profile developed for it, not a default one. This shows up as a yield problem rather than a design error, which is why it is worth naming early.

**7. Through-hole and mixed technology.** Which side the through-hole parts sit on decides whether the process is pin-in-paste, selective solder or hand. Each is a different line and a different price, and the choice is usually fixable in the layout.

**8. Coating and masking.** If conformal coating is specified, connectors, test points, optical surfaces and any press-fit area need to be maskable. Masking is hand labour; a design that scatters unmaskable features across the board turns a cheap step into an expensive one.

**9. Test access.** Test points large enough and reachable, with the plane under them clear. If functional test happens at your end, the fixture needs access that the layout must provide.

**10. BOM reality.** Manufacturer part numbers that exist, packages that match the footprint, and alternatives named where a part is single-source. A BOM with a package mismatch is found at kitting, which is the most expensive possible moment.

## Which of these change the price

Three do, directly: panelisation (units per pass), through-hole method (line and labour), and coating masking (hand labour). The rest change the *risk* rather than the price, which is harder to see on a quote and easier to see on the third delivery.

## What a review cannot do

It cannot make a design good. It can make it buildable. A DFM review that returns "no issues" is not a statement that the product works — only that the file can be manufactured as drawn.

It also cannot replace the first article. The first board off the line is checked against the drawing, and that check is the point where a DFM assumption meets a real stencil and a real paste deposit.

## How to get a useful review

Send the Gerber with the drill file, the BOM with manufacturer part numbers, the centroid file, and the quantity. State the coating and the test plan. Then ask one question: **what in this design will cost me money at setup?** The answer is a shorter list than a full DFM report, and it is the list that decides the quote.

We review every file before quoting, in-house, and we return the findings as questions rather than as a verdict. Where the answer is that a process is not run here — full functional test with a load bank, for example — that is stated before the order rather than after the first batch.
`;export{e as default};
