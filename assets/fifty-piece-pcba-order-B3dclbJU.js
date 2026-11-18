const e=`---
title: "Ordering 50 pieces of PCBA — what is normal, what is not, and how to keep it cheap"
seoTitle: "Ordering 50 Pieces of PCBA: Minimums and Cost"
description: "Fifty pieces is a normal order, not a favour. The same minimum applies to turnkey, partial turnkey and consigned kit. What makes 50 expensive is setup."
date: 2026-11-17
tags: Buying, HMLV, Costing
summary: "Below 50 the setup work dominates; above a few thousand a volume plant wins on rate. Inside that band a small-batch specialist makes sense — and the three order models all carry the same minimum."
cover: "/assets/images/conformal-coating.webp"
coverThumb: "/assets/images/conformal-coating-thumb.webp"
coverAlt: "Conformal coating booth with a board being masked before spraying"
---

Fifty pieces is a normal order here, not a favour: the same 50-piece minimum applies to full turnkey, partial turnkey and consigned kit, and there is no tooling charge when the Gerber and BOM revision are unchanged. What makes 50 expensive is not the assembly — it is the stencil, the first article and the reel minimums behind the parts.

## Why 50 is the number

Below 50, setup work dominates: stencil, machine program, feeder kitting, first-article inspection. Each is charged once, so at 20 pieces the setup cost per board is more than double what it is at 50, and no supplier can absorb that.

Above a few thousand, the arithmetic flips the other way: a larger plant with cheaper hourly rates and longer runs starts to win on unit price.

Fifty to a few thousand is the band where a small-batch specialist makes sense. That is why our minimum is 50 and not 5 — and also why we do not pretend to be cheapest at 20,000.

## Three order models, one minimum

| | Full turnkey | Partial turnkey | Consigned kit |
|---|---|---|---|
| **You send** | Gerber, BOM, centroid | Gerber, BOM, plus the long-lead parts | Gerber, BOM, and the entire kit |
| **We buy** | Bare board, all components | Everything except what you consign | Nothing — assembly only |
| **Minimum** | 50 pcs | 50 pcs | 50 pcs |
| **Lead time** | 3 working days, parts in stock | 3 working days once the kit is complete | 3 working days once the kit is complete |
| **Best for** | A first build, or a team without a purchasing desk | Buyers already holding allocation | Teams with their own component contract |

Most factories push you into full turnkey because it is simpler for them. The choice matters because **which model is cheaper changes with what you already hold** — if you already hold 300 of a long-lead IC on the shelf, consigning it is obviously cheaper; if you have nothing, turnkey is.

If you are unsure, send the BOM. The reply should state which model is cheaper for that specific build, rather than quoting all three and leaving the comparison to you.

## Five things that keep a 50-piece order cheap

1. **Freeze the revision.** No repeat NRE on an unchanged Gerber and BOM revision. A mid-run change re-opens the stencil, the program and the first article.
2. **Let the BOM be reviewed before it is priced.** Missing manufacturer part numbers, obsolete parts without an approved alternate, and package ambiguity (imperial vs metric "0603") are the three most common causes of a re-quote.
3. **Consolidate part numbers where an approved equivalent exists.** Every extra part number is another distributor line, and many distributors price a line as well as a part.
4. **Ask what the reel minimums are.** A part sold only in reels of 3,000 when you need 47 is a real cost, and it is better to see it on the quote than to discover it in the total.
5. **Accept the standard lead time if you can.** Expediting a 50-piece run usually means paying for someone else's job to be moved, and it is rarely worth it for a pilot build.

## What to send, and in what order

Send in this order — it gets you a faster, more accurate answer:

1. **BOM** with manufacturer part numbers (xlsx or csv) — this is where the delay lives
2. **Gerber** (RS-274X or ODB++) — or the centroid first if you want panelisation feedback early
3. **Centroid / pick-and-place** (csv)
4. Quantity, target date, and which order model you are leaning toward
5. Anything unusual: controlled impedance, press-fit, potting, retail packaging, serialisation

A DFM answer and an itemised price should come back within one working day. If it does not, that is information about how the programme will run.

## What a 50-piece order does not get you

Be clear with yourself about the trade:

- **Not the lowest unit price.** A volume plant will quote lower per board. At 50 pieces you are buying setup attention, not rate.
- **Not full in-house electrical test.** We do not run ICT or FCT in the building; fixtures go through a qualified partner and are quoted separately. If your product needs same-day electrical feedback, choose a plant that owns a tester.
- **Not automotive or medical certification.** No IATF 16949, no ISO 13485, no third-party IPC Class 3. Workmanship follows IPC-A-610 at the class agreed on the order.

Saying this before you send files costs us enquiries. It saves the ones where 50 pieces, three days and no ICT is exactly right.

The cost mechanics behind these five points are set out in [what is inside a PCBA price](/insights/pcba-cost-per-board.html). If your worry is the parts rather than the assembly, [the BOM substitution checklist](/insights/bom-substitution-checklist.html) covers what an approved alternate has to record.
`;export{e as default};
