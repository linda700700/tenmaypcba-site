---
title: "What actually limits 01005 placement yield?"
seoTitle: "What Limits 01005 Placement Yield? Four Hard Ceilings"
description: "01005 passives fail for reasons that have nothing to do with the placement head. Stencil aperture, paste type, pad geometry and inspection each set a ceiling."
date: 2026-11-06
tags: SMT, Yield, Fine-pitch
summary: "The placer is rarely the constraint. Stencil, paste, pad geometry and inspection each cap what a 01005 design can do on a real line."
cover: "/assets/images/aoi-inspection.webp"
coverThumb: "/assets/images/aoi-inspection-thumb.webp"
coverAlt: "Operator in a blue gown and hair net seated at an AOI machine, a green PCB with highlighted placements on the monitor, board magazine at the right"
---

The placement head is almost never the limit. A 01005 part is about 0.4 × 0.2 mm, and every current placer can position it. What caps yield is how much solder the stencil releases, which paste carries it, whether the pads hold it centred, and whether inspection can see the joint at all.

## Is the placement machine the limit?

No, and treating it as the limit leads to the wrong fixes. A board that places cleanly and still fails at reflow or at AOI is showing a paste-volume problem, not a positioning problem. Turning up placement accuracy cannot deposit more solder.

At this size the process stops being about positioning and starts being about deposit — how much solder lands on the pad, and how much of it stays where it was put.

## What does the stencil set?

Paste release is the first ceiling. For a 01005 land the aperture is small enough that the area ratio — aperture opening area against the area of its walls — decides whether paste leaves the stencil at all.

When that ratio falls too low, paste stays in the aperture and releases unevenly. It looks like a placement defect: parts tombstone, pull to one pad, or end up with too little solder on one side. Changing placer settings will not fix any of those.

| Lever | What it buys | What it costs |
| --- | --- | --- |
| Thinner stencil foil | Better area ratio at the same aperture | Less paste volume for the larger parts sharing the panel |
| Laser-cut or electroformed apertures | Cleaner wall finish, more consistent release | Higher stencil cost per revision |
| Aperture geometry adjusted to the land, not copied from it | A centred deposit | Time at the DFM stage |
| Nano-coating on the foil | Release when a thin foil is not an option | Consumable cost per stencil |

## Which paste type does 01005 need?

Type 3 paste in a 01005 aperture is a volume problem before it is a printing problem. Type 4 is the usual answer, and Type 5 appears where apertures are smaller still.

| Paste type | Where it fits | Trade-off |
| --- | --- | --- |
| Type 3 | 0402 and larger | Will not reliably fill a 01005 aperture |
| Type 4 | 01005 alongside 0402 and above | The normal compromise on mixed panels |
| Type 5 | Apertures below the 01005 window | Finer powder oxidises faster and shortens stencil life |

The compromise is worth stating plainly: a Type 5 paste left on the stencil across a long run behaves worse than a Type 4 paste refreshed on schedule. On a mixed panel the paste choice is made for the whole board, not for the smallest part alone.

## Which pad and mask choices cause 01005 defects?

Two layout decisions cause most of the avoidable defects, and a third is quieter:

| Layout choice | What happens at 01005 | What to do instead |
| --- | --- | --- |
| Solder-mask-defined land | Effective copper area shrinks and the deposit becomes unpredictable | Copper-defined land with a mask dam |
| Via-in-pad without fill | Paste wicks into the via; the part sits low or drifts | Fill and cap the via at fabrication, or move it out of the land |
| Asymmetric copper around the two pads | Uneven thermal mass pulls the part toward the hotter side | Balance copper on both pads |

The third one is survivable at 0402 and a tombstone at 01005. It is a layout fix, and it is decided before the files ever reach an assembly floor.

## Where does the placer still matter?

Placement force and nozzle choice are where the machine earns its place. Too much force embeds the part in the paste and squeezes it sideways; too little leaves it sitting on top, and reflow pulls it off-centre. Vacuum nozzles sized to the part, with force set low, are the normal configuration.

Vision also needs clean contrast between part and background. Black parts on dark tape, or parts with a mirror finish, occasionally need a different lighting recipe. That is a per-part setup item, not a per-board one — which is exactly why high-mix work carries setup cost a single-product line never sees.

## What can inspection actually verify at 01005?

This is the part most capability tables skip. A line can place 01005 and still not be able to verify it.

Optical inspection at this scale depends on resolution and on how much shadow the neighbouring components cast. A board with tall electrolytics beside 01005 passives has blind angles. X-ray helps with joints under area-array parts, but it is not a substitute for optical inspection of passives — the solder volume is small and the contrast is poor.

So the accurate claim is narrower than "we place 01005". It is: we place 01005, we inspect it optically where the neighbouring geometry allows, and we tell you which areas of your board fall outside that.

## What we will not claim

- No pass-yield percentage for 01005 on your design before the stencil and pad geometry have been reviewed.
- No blanket "100% inspected" statement: optical coverage depends on component height around the part.
- No quoting a 01005 build from a BOM alone. The stencil drawing and the land pattern decide whether the job is routine or engineering-reviewed.

## What to send with a 01005 enquiry

Three things decide whether the quote is realistic:

1. The paste type the design assumes, or the smallest aperture on the stencil drawing.
2. Whether any 01005 land has via-in-pad beneath it.
3. How many 01005 parts sit next to tall components, since that decides inspectability.

Send the Gerber, the BOM and the centroid, and ask for a DFM note specifically on the 01005 areas. The [capabilities page](/capabilities.html) lists the placement window we hold today — 01005 passives, 0.3 mm minimum IC pitch, boards up to 800 × 480 mm — and the [assembly page](/assembly.html) shows where in-line SPI, AOI and X-ray sit in the flow. A supplier who answers a DFM note in writing tells you more than any capability table.

If the package choice is still open, [01005 vs 0201](/insights/01005-vs-0201.html) sets out when the smaller part is actually necessary, and [what AOI and X-ray can and cannot catch](/insights/what-aoi-xray-cannot-catch.html) explains the inspection gap in more detail.
