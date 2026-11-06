---
title: "The BOM substitution checklist that avoids a re-quote"
seoTitle: "BOM Substitution Checklist for PCBA Re-Quotes"
description: "Most re-quotes are caused by a BOM that cannot be bought as written. This checklist catches the eight things that force a substitution, before assembly starts."
date: 2026-11-06
tags: BOM, Procurement, DFM
summary: "A BOM that reads correctly can still be unbuyable. These eight checks decide whether the parts arrive as listed or the job stops for approval."
---

A BOM can be complete, internally consistent and still unbuildable. The part number exists, the quantity is right, the reference designators all match — and then procurement finds that the exact part is on a fourteen-week lead, or only sold in reels of five thousand, or marked obsolete by the manufacturer.

At that point the job stops. Someone has to propose an alternative, someone else has to approve it, and the price may move. That is the re-quote, and almost all of it is avoidable with a pass through the BOM before the enquiry is sent.

## 1. Is the part still active?

Manufacturer lifecycle status is the first check and the cheapest. A part marked end-of-life or not-recommended-for-new-designs will eventually stop being available, and the version you get on the next build may not be the one you qualified.

Most distributor sites show lifecycle status on the product page. Checking the twenty highest-value lines usually catches the whole problem.

## 2. Is there a second source in the BOM?

Two different things get called a second source and only one of them helps:

- **An alternate manufacturer's part number, listed with its own MPN.** Useful. It can be bought directly.
- **The phrase "or equivalent".** Not useful on its own. It moves the decision to whoever is buying, which is the wrong place for it.

If a line must not be substituted — a specific regulator, a matched pair, an MCU with calibrated internals — say so explicitly. Silence reads as permission.

## 3. Do the electrical parameters actually match?

The common failure is a substitution that looks right on the headline spec and is wrong two lines down. Before approving an alternate, check:

- Tolerance and temperature coefficient, not just nominal value.
- Voltage rating, including derating margin.
- Package and pinout — same footprint does not always mean same pin function.
- Timing or frequency characteristics for anything involving a crystal or oscillator.
- Operating temperature range. An industrial part swapped for a commercial one is a field failure waiting to be shipped.

## 4. Package, footprint and polarity

A 0402 part is not always the same 0402 land. Check the manufacturer's recommended land pattern for the alternate rather than assuming the footprint carries over. For anything with polarity — diodes, tantalum capacitors, electrolytics, LEDs — check that the marking orientation matches what the assembly drawing expects.

This is where a substitution turns into a silent defect: the board builds, passes basic inspection, and fails in the field because the part went on the wrong way round.

## 5. Moisture sensitivity level

An alternate with a higher moisture sensitivity level changes the handling requirement. It may need baking before use, and it has a floor-life limit once the seal is broken.

If the original was MSL 1 and the alternate is MSL 3, the process has changed even though the part number swap looked trivial. Tell the assembler, or they will find out at reflow.

## 6. Packaging: reel, cut tape, tray, tube

Quantity is not the same as packaging. A part quoted as "cut tape" may arrive as loose pieces that cannot be fed automatically, which turns a machine placement into a hand placement and moves the price.

For small runs, check whether the part is available in a partial reel or a feedable cut length. This single item causes more small-batch price movement than any other line in the BOM.

## 7. Minimum order quantity and multiple

A line needing twenty pieces of a part sold in reels of four thousand is not a pricing detail — it is a purchasing decision. Decide in advance how the balance is handled: bought and stocked, consigned by you, or avoided by choosing a part with a smaller multiple.

## 8. Date code and provenance

For anything going into a product with a warranty, the age of the material matters. Ask what date-code policy applies, and whether the parts come from authorised distribution or the open market.

Open-market sourcing is legitimate and sometimes the only option for an obsolete part. It is not the same as authorised stock, and the difference should be on the record rather than discovered later.

## Writing the BOM so it survives procurement

Four columns, added to a normal BOM, remove most of the back-and-forth:

- **Approved alternates**, each with a real manufacturer part number.
- **Substitution rule** per line: `exact` where nothing may change, `equivalent` where a matching spec is acceptable.
- **Critical parameters** for lines marked equivalent — the two or three numbers that must match.
- **Notes** for anything with a handling constraint, a polarity quirk, or a matched pair.

That is a small amount of work at design time and it removes an entire class of delay at build time.

## What we ask for

For a first enquiry we need the Gerber, the BOM and the centroid file. If the BOM carries alternates and substitution rules, the DFM note comes back faster because there is less to ask about.

Where a line cannot be bought as written, we say which line and what the options are, with the price effect of each. What we do not do is substitute quietly and let the difference surface in inspection.
