---
title: "01005 placement: what actually limits your yield"
seoTitle: "01005 Placement: What Actually Limits Your Yield"
description: "01005 passives fail for reasons that have nothing to do with the placement machine. Stencil aperture, paste type, pad design and inspection each set a ceiling."
date: 2026-11-06
tags: SMT, Yield, Fine-pitch
summary: "The placer is rarely the constraint. Stencil, paste, pad geometry and inspection each cap what 01005 can do on a real line."
---

Most conversations about 01005 start with the wrong question: which machine can place it. Almost every current placer can. The interesting question is why a board that places cleanly still fails at reflow or at AOI, and that answer usually has nothing to do with the head.

A 01005 part is roughly 0.4 mm by 0.2 mm. At that size the process stops being about positioning accuracy and starts being about how much solder you can reliably deposit and how much of it stays where you put it.

## Start with the stencil, not the machine

Paste release is the first ceiling. For a 01005 land, the aperture is small enough that the area ratio — aperture opening area divided by the area of the aperture walls — decides whether paste leaves the stencil at all.

When that ratio gets low, paste tends to stay in the aperture and release unevenly. The result looks like a placement problem: parts tombstone or pull to one pad, or the joint has too little solder on one side. It is not a placement problem. Changing the placer settings will not fix it.

Practical levers, in the order worth trying:

- Thinner stencil foil. Reducing thickness improves the area ratio for the same aperture, at the cost of paste volume on the larger parts sharing the board.
- Laser-cut or electroformed apertures rather than anything with a rougher wall finish.
- Aperture geometry adjusted to the land rather than copied from it, so the deposit is centred.
- Nano-coating on the stencil, which helps release when a thin foil is not an option.

## Paste type follows the aperture

Type 3 paste in a 01005 aperture is a volume problem before it is a printing problem. Type 4 is the usual answer, and Type 5 is used where apertures are smaller still.

The trade-off is real and worth stating plainly: finer powder oxidises faster and has a shorter stencil life. A Type 5 paste left on the stencil across a long run behaves worse than a Type 4 paste that is refreshed on schedule. If a line is running 01005 alongside 0402 and larger parts on one board, the paste choice is a compromise across the whole panel, not a decision made for the smallest part alone.

## Pad design and solder mask

Two layout choices cause most of the avoidable 01005 defects:

**Solder mask defined versus copper defined lands.** Mask-defined pads reduce the effective copper area and make the deposit less predictable at this scale. Copper-defined with a mask dam is the more forgiving arrangement.

**Via-in-pad without fill and planarisation.** Paste wicks into the via and the part sits low or drifts. If the design needs via-in-pad under a 01005 land, the via needs filling and capping, which is a fabrication decision made long before assembly.

A third, quieter one: asymmetric copper around the two pads. Uneven thermal mass during reflow pulls the part toward the hotter side. At 0402 it is survivable. At 01005 it is a tombstone.

## The machine still matters, just less

Placement force and nozzle selection are where the placer earns its place. Too much force embeds the part in the paste and squeezes it out to the sides; too little leaves it sitting on top, and reflow pulls it off-centre. Vacuum nozzles sized for the part, with force set low, are the normal configuration.

Vision recognition needs a clean contrast between part and background. Black parts on dark tape, or parts with a mirror finish, occasionally need a different lighting recipe. This is a per-part setup item, not a per-board one, which is why high-mix work carries setup cost that a single-product line never sees.

## Inspection is the real limit on what you can claim

Here is the part most quotes skip. You can place 01005 and still not be able to verify it.

Optical inspection at this scale depends on resolution and on how much shadow the surrounding components cast. A board with tall electrolytic capacitors next to 01005 passives will have blind angles. X-ray helps with joints under area-array parts, but it is not a substitute for optical inspection of passives — the solder volume is small and the contrast is poor.

So the honest statement is narrower than "we can place 01005". It is: we can place 01005, and we can inspect it optically where the neighbouring geometry allows, and we will tell you which parts of your board fall outside that.

## What to send with the enquiry

If a design uses 01005, three things decide whether the quote is realistic:

1. The paste type the design assumes, or the smallest aperture on the stencil drawing.
2. Whether any 01005 land has via-in-pad beneath it.
3. How many 01005 parts sit next to tall components, since that determines inspectability.

Send the Gerber, the BOM and the centroid, and ask for a DFM note specifically on the 01005 areas. A supplier who answers that note in writing is telling you something more useful than a capability table.
