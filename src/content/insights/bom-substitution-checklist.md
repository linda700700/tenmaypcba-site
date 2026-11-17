---
title: "Which BOM problems force a re-quote — and how do you catch them first?"
seoTitle: "BOM Substitution Checklist: Stop the PCBA Re-Quote"
description: "A BOM can be complete and still unbuyable. Eight checks on lifecycle, alternates, ratings, MSL, packaging and MOQ decide whether parts arrive as listed."
date: 2026-11-06
tags: BOM, Procurement, DFM
summary: "A BOM that reads correctly can still be unbuyable. These eight checks decide whether the parts arrive as listed or the job stops for approval."
cover: "/assets/images/final-check-packing.webp"
coverThumb: "/assets/images/final-check-packing-thumb.webp"
coverAlt: "Operator in gloves checking a PCB under a magnifier lamp at a packing bench, a checklist on a clipboard beside an open carton of packed boards"
---

Eight checks cover almost every substitution that stops a job: lifecycle status, a real second source, electrical margins, package and polarity, moisture sensitivity, packaging format, order multiple, and date-code provenance. A BOM that passes all eight can be bought as written, which means no approval loop and no price movement before assembly starts.

## What is a re-quote, and why does it cost time?

A re-quote is what happens when procurement cannot buy the BOM as written. The part number exists, the quantity is right, the reference designators all match — and then the exact part turns out to be on a lead that runs to 90 days, sold only in reels of 5,000 pcs, or marked obsolete.

At that point the job stops. Someone proposes an alternative, someone else approves it, and the price may move. Nearly all of it is avoidable with a pass through the BOM before the enquiry is sent.

## The eight checks, on one page

| # | Check | What goes wrong when it fails |
| --- | --- | --- |
| 1 | Lifecycle status | An end-of-life part is available this build and gone the next; the replacement was never qualified |
| 2 | Real second source | "Or equivalent" moves the decision to whoever is buying, which is the wrong place for it |
| 3 | Electrical margins | The substitute matches the headline value and fails two lines down on tolerance, rating or thermal drift |
| 4 | Package, land and polarity | Same footprint, different pin function — or a part placed the wrong way round |
| 5 | Moisture sensitivity level | A higher MSL adds baking and a floor-life clock nobody planned for |
| 6 | Packaging format | Cut tape that cannot be fed turns machine placement into hand placement |
| 7 | Order multiple | A part sold in reels of 5,000 pcs for a build that consumes 50 pcs |
| 8 | Date code and provenance | Old material or open-market stock goes into a product with a warranty |

## 1. Is the part still active?

Lifecycle status is the first check and the cheapest. A part marked end-of-life or not-recommended-for-new-designs will stop being available eventually, and the version on the next build may not be the one you qualified.

Distributor product pages usually carry status. Checking the twenty highest-value lines catches most of the problem, because that is where the cost and the risk sit.

## 2. Is there a real second source?

Two different things get called a second source, and only one helps:

- **An alternate manufacturer's part number, listed with its own MPN.** Useful — it can be bought directly.
- **The phrase "or equivalent".** Not useful on its own. It hands the decision to the buyer at the factory, who has no visibility of why the part was chosen.

If a line must not be substituted — a specific regulator, a matched pair, an MCU with calibrated internals — say so explicitly. Silence reads as permission.

## 3. Do the electrical parameters actually match?

The common failure is a substitution that is right on the headline spec and wrong in the detail. Before approving an alternate, check:

| Parameter | What to compare, not just copy |
| --- | --- |
| Tolerance and temperature coefficient | Nominal value, then drift over the operating range |
| Voltage rating | Include the derating margin the design assumes |
| Package and pinout | Same footprint does not always mean same pin function |
| Timing or frequency | Anything with a crystal or oscillator |
| Operating temperature range | An industrial part swapped for a commercial one is a field failure waiting to ship |

## 4. Does the land pattern and polarity carry over?

A 0402 part is not always the same 0402 land. Check the alternate manufacturer's recommended land pattern instead of assuming the footprint transfers. For anything with polarity — diodes, tantalum capacitors, electrolytics, LEDs — check that the marking orientation matches the assembly drawing.

This is where a substitution becomes a silent defect: the board builds, passes basic inspection, and fails in the field because the part went on the wrong way round.

## 5. Did the moisture sensitivity level change?

An alternate with a higher MSL changes the handling requirement. It may need baking before use, and it has a floor-life limit once the seal is broken.

If the original was MSL 1 and the alternate is MSL 3, the process has changed even though the part-number swap looked trivial. Tell the assembler, or they find out at reflow.

## 6. Is the packaging feedable?

Quantity is not packaging. A part quoted as cut tape may arrive as loose pieces that cannot be fed automatically, which turns machine placement into hand placement and moves the price.

| Packaging | Effect on a small build |
| --- | --- |
| Full reel | Feedable, but may carry an order multiple far above usage |
| Partial reel or feedable cut length | The practical option for small runs; ask for it explicitly |
| Loose cut tape | Usually hand placement, and a price change |
| Tray or tube | Fine for the parts designed for it; not interchangeable with reel |

For small runs, this single item causes more price movement than any other line in the BOM.

## 7. What is the order multiple?

A line needing 50 pcs of a part sold in reels of 5,000 pcs is a purchasing decision, not a pricing detail. Decide in advance how the balance is handled: bought and stocked, consigned by you, or avoided by choosing a part with a smaller multiple. The material-policy section of [why a 50-piece run costs more per board](/insights/fifty-piece-run-cost.html) sets out the three options.

## 8. Is the date code and provenance on record?

For anything going into a product with a warranty, the age of the material matters. Ask what date-code policy applies and whether parts come from authorised distribution or the open market.

Open-market sourcing is legitimate, and sometimes the only option for an obsolete part. It is not the same as authorised stock, and the difference belongs on the record rather than discovered later.

## What four columns make a BOM survive procurement?

Add these to a normal BOM and most of the back-and-forth disappears:

- **Approved alternates**, each with a real manufacturer part number.
- **Substitution rule** per line: `exact` where nothing may change, `equivalent` where a matching spec is acceptable.
- **Critical parameters** for lines marked equivalent — the two or three numbers that must match.
- **Notes** for anything with a handling constraint, a polarity quirk or a matched pair.

Small work at design time, and it removes an entire class of delay at build time.

## What we will not do

- No silent substitution. Where a line cannot be bought as written, we say which line, what the options are, and the price effect of each.
- No approval after the fact. If a substitution needs sign-off, the run waits for it rather than shipping and explaining.
- No claim that an alternate is fully equivalent without the two or three critical parameters being named.

For a first enquiry we need the Gerber, the BOM and the centroid. If the BOM carries alternates and substitution rules, the DFM note comes back faster because there is less to ask about. The [capabilities page](/capabilities.html) covers the component sourcing and CoC side — what we buy, what we verify on incoming material, and what we do not hold in-house.

*Last reviewed: 2026-11-17 · Send the BOM and Gerber for a DFM read: [WhatsApp](https://wa.me/8617361058693)*
